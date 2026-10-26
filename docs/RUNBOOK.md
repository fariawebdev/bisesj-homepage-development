# BISESJ Production Deployment Runbook for Eva

> **Audience**: Eva (Operations & Production Coordinator, Alwajeez Tech)  
> **Target Environment**: AlmaLinux VPS, cPanel & WHM, LiteSpeed Web Server (LSWS)  
> **Application**: Bangladesh International School, English Section, Jeddah (BISESJ)  
> **Stack**: Next.js 16 (Standalone Output), React 19, TypeScript, Tailwind v4, better-sqlite3  

---

## ⚠️ Verification Notice & Access Boundaries
**Notice from Software Engineer (agy)**:
As per project working rules, engineering has **zero direct SSH or cPanel access** to the production VPS. 
- Steps marked `[LOCALLY VERIFIED]` have been built, compiled, and verified in the CI/local test environment.
- Steps marked `[UNVERIFIED ON VPS]` are based on standard AlmaLinux, cPanel, and LiteSpeed administration protocols and must be executed and confirmed by Eva on the live server.

---

## 1. Architecture & Deployment Model

```
Internet (HTTPS 443)
       │
       ▼
LiteSpeed Web Server (LSWS) [cPanel managed]
       │  (Reverse Proxy / ProxyPass via .htaccess or LiteSpeed vhost)
       ▼
Next.js Standalone Node Server (127.0.0.1:3000)
       │
       ├── Reads static assets from .next/static and public/
       └── Reads/Writes SQLite DB outside web root:
           /home/{USER}/data/bisesj/bisesj.sqlite
```

### Standalone Output Advantage `[LOCALLY VERIFIED]`
Next.js `output: 'standalone'` bundles all production code and required node dependencies into `.next/standalone/server.js`. This eliminates heavy `node_modules` overhead in production and allows fast, lightweight restarts.

---

## 2. Server Prerequisites (One-Time Setup)

### 2.1. Node.js 22 LTS or 24 LTS on AlmaLinux `[UNVERIFIED ON VPS]`
As `root` via SSH:
```bash
# Verify current Node version
node -v

# If Node.js is missing or < 22, install Node.js 22 LTS via NodeSource
dnf module reset nodejs -y
curl -fsSL https://rpm.nodesource.com/setup_22.x | bash -
dnf install -y nodejs gcc-c++ make sqlite sqlite-devel

# Verify installation
node -v   # Should output v22.x or v24.x
npm -v
```

### 2.2. Install pnpm Globally `[UNVERIFIED ON VPS]`
```bash
npm install -g pnpm@12.15.0
pnpm --version
```

### 2.3. Directory Layout `[UNVERIFIED ON VPS]`
Under the cPanel user account (e.g., `/home/bisesjuser/`):
```bash
# Replace 'bisesjuser' with your actual cPanel username
export CP_USER="bisesjuser"

# Application releases directory
mkdir -p /home/${CP_USER}/apps/bisesj/releases
mkdir -p /home/${CP_USER}/apps/bisesj/shared

# Data directory OUTSIDE the web root (public_html)
mkdir -p /home/${CP_USER}/data/bisesj/db
mkdir -p /home/${CP_USER}/data/bisesj/uploads
mkdir -p /home/${CP_USER}/data/bisesj/backups

# Fix permissions
chown -R ${CP_USER}:${CP_USER} /home/${CP_USER}/apps
chown -R ${CP_USER}:${CP_USER} /home/${CP_USER}/data
chmod 750 /home/${CP_USER}/data/bisesj/db
```

---

## 3. Environment Variables Configuration

Create the persistent production environment file at `/home/${CP_USER}/data/bisesj/.env.production` `[UNVERIFIED ON VPS]`:

```bash
cat << 'EOF' > /home/bisesjuser/data/bisesj/.env.production
# Runtime Mode
NODE_ENV=production
PORT=3000
HOSTNAME=127.0.0.1

# Canonical Site URL
NEXT_PUBLIC_SITE_URL=https://bisesjsa.com

# Database Path (OUTSIDE REPOSITORY)
DATABASE_PATH=/home/bisesjuser/data/bisesj/db/bisesj.sqlite

# Secret for session and authentication (generate a 64-char random hex string)
# Command to generate: openssl rand -hex 32
SESSION_SECRET=e7b42fa916d8cf4b43952a5103a8f15891d4e083a216432b0f4ef937e28321aa

# Seed admin credentials (for initial db:seed only)
ADMIN_EMAIL=principal@bisesjsa.com
ADMIN_INITIAL_PASSWORD=ChangeThisStrongPasswordImmediately2026!

# Feature Flags
# Keep false in Sprint 1; language switcher shows English only until Sprint 7
NEXT_PUBLIC_ENABLE_MULTILINGUAL=false
EOF

chmod 600 /home/bisesjuser/data/bisesj/.env.production
chown bisesjuser:bisesjuser /home/bisesjuser/data/bisesj/.env.production
```

---

## 4. Building the Application for Production

Eva can build the package locally or directly on the server `[LOCALLY VERIFIED]`:

```bash
# 1. Clone repository into a new release directory
cd /home/bisesjuser/apps/bisesj/releases
git clone -b main https://github.com/fariawebdev/bisesj-homepage-development.git release-s1
cd release-s1

# 2. Install dependencies using pnpm
pnpm install --frozen-lockfile

# 3. Compile standalone build
pnpm build

# 4. Copy required static folders into standalone directory
# Next.js standalone requires static assets and public folder alongside server.js
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public

# 5. Copy environment file into standalone build folder
cp /home/bisesjuser/data/bisesj/.env.production .next/standalone/.env
```

---

## 5. Database Initial Migration & Seeding `[LOCALLY VERIFIED]`

Run the migration script and seed initial tables outside the web root:

```bash
cd /home/bisesjuser/apps/bisesj/releases/release-s1

# Load environment variables
export $(cat /home/bisesjuser/data/bisesj/.env.production | xargs)

# Run SQLite migrations
pnpm db:migrate

# Run initial seed (creates site_settings and admin_users)
pnpm db:seed

# Verify database file created
ls -lh /home/bisesjuser/data/bisesj/db/bisesj.sqlite
sqlite3 /home/bisesjuser/data/bisesj/db/bisesj.sqlite "SELECT key, value FROM site_settings LIMIT 5;"
```

---

## 6. Running the App as a System Service (systemd) `[UNVERIFIED ON VPS]`

Running Next.js via `systemd` ensures automatic recovery on server reboot or process crash.

Create the service file `/etc/systemd/system/bisesj.service` (as `root`):

```ini
[Unit]
Description=BISESJ Next.js Application
After=network.target

[Service]
Type=simple
User=bisesjuser
Group=bisesjuser
WorkingDirectory=/home/bisesjuser/apps/bisesj/current/.next/standalone
EnvironmentFile=/home/bisesjuser/data/bisesj/.env.production
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=bisesj-app

# Security sandboxing
NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

Link current release and start service:
```bash
# Link release-s1 as current
ln -sfn /home/bisesjuser/apps/bisesj/releases/release-s1 /home/bisesjuser/apps/bisesj/current

# Enable and start service
systemctl daemon-reload
systemctl enable bisesj
systemctl restart bisesj

# Check status
systemctl status bisesj
```

---

## 7. LiteSpeed Web Server Reverse Proxy Configuration `[UNVERIFIED ON VPS]`

In cPanel with LiteSpeed, traffic hitting `bisesjsa.com` (port 80/443) should be reverse-proxied to the local Node.js port (`127.0.0.1:3000`).

### Method A: Via `public_html/.htaccess` (Recommended for cPanel)
Create or edit `/home/bisesjuser/public_html/.htaccess`:

```apache
# --- LiteSpeed Reverse Proxy to Next.js ---
RewriteEngine On

# Allow static files directly from LiteSpeed if placed in public_html,
# or proxy all requests to Next.js standalone:
RewriteCond %{REQUEST_URI} !^/\.well-known/
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]

# Enforce secure HTTPS headers
Header always set X-Content-Type-Options "nosniff"
Header always set X-Frame-Options "SAMEORIGIN"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
```

### Method B: LiteSpeed WebAdmin Console (If WHM Access is Available)
1. Log in to LiteSpeed WebAdmin Console (`https://your-server-ip:7080`).
2. Navigate to **Virtual Hosts** > Select `bisesjsa.com`.
3. Go to **External App** > Add **Web Server**:
   - Name: `bisesj-node`
   - Address: `127.0.0.1:3000`
   - Max Connections: `100`
4. Go to **Context** > Add **Proxy Context**:
   - URI: `/`
   - Web Server: `bisesj-node`
5. Perform **Graceful Restart** of LiteSpeed.

---

## 8. Automated Database Backup Script `[LOCALLY VERIFIED]`

SQLite database files should never be backed up with a raw `cp` command while the app is actively writing. Instead, use SQLite's native online `.backup` command to produce atomic, uncorrupted snapshots.

Create `/home/bisesjuser/data/bisesj/backup-bisesj.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail

# Configuration
USER="bisesjuser"
DATA_DIR="/home/${USER}/data/bisesj"
DB_FILE="${DATA_DIR}/db/bisesj.sqlite"
UPLOADS_DIR="${DATA_DIR}/uploads"
BACKUP_DIR="${DATA_DIR}/backups"
DATE=$(date +"%Y%m%d_%H%M%S")
TARGET_DB_BACKUP="${BACKUP_DIR}/bisesj_db_${DATE}.sqlite"
TARGET_TAR="${BACKUP_DIR}/bisesj_full_${DATE}.tar.gz"

mkdir -p "${BACKUP_DIR}"

echo "[$(date)] Starting BISESJ database backup..."

# 1. Atomic SQLite Online Backup
if [ -f "${DB_FILE}" ]; then
  sqlite3 "${DB_FILE}" ".backup '${TARGET_DB_BACKUP}'"
  echo "[$(date)] DB snapshot created: ${TARGET_DB_BACKUP}"
  
  # Integrity check on backup
  INTEGRITY=$(sqlite3 "${TARGET_DB_BACKUP}" "PRAGMA integrity_check;")
  if [ "${INTEGRITY}" != "ok" ]; then
    echo "ERROR: Backup integrity check failed: ${INTEGRITY}" >&2
    exit 1
  fi
else
  echo "WARNING: Database file not found at ${DB_FILE}"
fi

# 2. Archive DB snapshot and uploads folder
tar -czf "${TARGET_TAR}" \
  -C "${BACKUP_DIR}" "bisesj_db_${DATE}.sqlite" \
  -C "${DATA_DIR}" uploads

# Remove uncompressed raw sqlite snapshot
rm -f "${TARGET_DB_BACKUP}"

echo "[$(date)] Archive created successfully: ${TARGET_TAR}"

# 3. Retention policy: Keep daily backups for 14 days, delete older
find "${BACKUP_DIR}" -type f -name "bisesj_full_*.tar.gz" -mtime +14 -delete
echo "[$(date)] Old backups purged according to 14-day retention policy."
```

Make executable and add to crontab:
```bash
chmod 700 /home/bisesjuser/data/bisesj/backup-bisesj.sh

# Add to crontab (runs nightly at 2:30 AM)
crontab -e
# Add line:
# 30 2 * * * /home/bisesjuser/data/bisesj/backup-bisesj.sh >> /home/bisesjuser/data/bisesj/backups/backup.log 2>&1
```

---

## 9. Backup Restore Check Procedure `[LOCALLY VERIFIED]`

To verify that backups are valid and can be safely restored:

```bash
# 1. Identify the backup archive to test
export BACKUP_ARCHIVE="/home/bisesjuser/data/bisesj/backups/bisesj_full_YYYYMMDD_HHMMSS.tar.gz"

# 2. Create temporary extraction directory
mkdir -p /tmp/bisesj_restore_test
tar -xzf "${BACKUP_ARCHIVE}" -C /tmp/bisesj_restore_test

# 3. Check SQLite database integrity
sqlite3 /tmp/bisesj_restore_test/bisesj_db_*.sqlite "PRAGMA integrity_check;"
# MUST OUTPUT: ok

# 4. Check schema and tables count
sqlite3 /tmp/bisesj_restore_test/bisesj_db_*.sqlite ".tables"
# MUST LIST: admin_users  schema_migrations  site_settings

# 5. Clean up temporary directory
rm -rf /tmp/bisesj_restore_test
echo "Restore verification passed successfully."
```

---

## 10. Update Procedure (For Future Sprints) `[UNVERIFIED ON VPS]`

When Claude and agy deliver subsequent sprint releases, Eva should execute:

```bash
export CP_USER="bisesjuser"
export NEW_TAG="sprint-2" # or commit hash
export NEW_RELEASE="/home/${CP_USER}/apps/bisesj/releases/release-${NEW_TAG}"

# 1. Run automated backup of database before deploying
/home/${CP_USER}/data/bisesj/backup-bisesj.sh

# 2. Clone fresh code into release folder
git clone https://github.com/fariawebdev/bisesj-homepage-development.git "${NEW_RELEASE}"
cd "${NEW_RELEASE}"

# 3. Install and build
pnpm install --frozen-lockfile
pnpm build
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
cp /home/${CP_USER}/data/bisesj/.env.production .next/standalone/.env

# 4. Run any pending database migrations
export $(cat /home/${CP_USER}/data/bisesj/.env.production | xargs)
pnpm db:migrate

# 5. Atomically switch symlink to new release
ln -sfn "${NEW_RELEASE}" /home/${CP_USER}/apps/bisesj/current

# 6. Restart systemd service
sudo systemctl restart bisesj

# 7. Smoke test site
curl -I http://127.0.0.1:3000/
curl -I https://bisesjsa.com/
```

---

## 11. Rollback Procedure `[UNVERIFIED ON VPS]`

If a deployment encounters critical issues or fails smoke tests:

```bash
export CP_USER="bisesjuser"
export PREVIOUS_RELEASE="/home/${CP_USER}/apps/bisesj/releases/release-s1"

# 1. Switch symlink back to previous stable release
ln -sfn "${PREVIOUS_RELEASE}" /home/${CP_USER}/apps/bisesj/current

# 2. Restart service immediately
sudo systemctl restart bisesj

# 3. Check service health
systemctl status bisesj
curl -I http://127.0.0.1:3000/

# 4. If database rollback is needed, restore pre-deploy backup:
# export LAST_BACKUP="/home/${CP_USER}/data/bisesj/backups/bisesj_full_pre_deploy.tar.gz"
# tar -xzf "${LAST_BACKUP}" -C /tmp/restore/
# cp /tmp/restore/bisesj_db_*.sqlite /home/${CP_USER}/data/bisesj/db/bisesj.sqlite
# sudo systemctl restart bisesj
```

---

## 12. Troubleshooting & Log Inspection `[UNVERIFIED ON VPS]`

- **Next.js Service Logs**:
  ```bash
  journalctl -u bisesj.service -n 100 -f
  ```
- **LiteSpeed Error Logs**:
  ```bash
  tail -f /usr/local/lsws/logs/error.log
  tail -f /home/bisesjuser/logs/bisesjsa.com.log
  ```
- **Port Conflict (Port 3000 in use)**:
  ```bash
  ss -tulpn | grep :3000
  ```
- **Database Permissions**:
  Ensure `/home/bisesjuser/data/bisesj/db` is writable by `bisesjuser`. SQLite requires write permissions to the directory for its journal/WAL files.
