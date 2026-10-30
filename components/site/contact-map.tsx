'use client'

import { useState } from 'react'
import { MapPin, Navigation, ExternalLink } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'

export function ContactMap() {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft md:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Interactive Campus Map</h2>
          <p className="mt-1 text-sm text-muted-foreground">{SITE_CONFIG.contact.address}</p>
        </div>
        <a
          href={SITE_CONFIG.contact.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-muted"
        >
          <ExternalLink aria-hidden="true" className="size-3.5" />
          <span>Open in Google Maps</span>
        </a>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-border">
        {loaded ? (
          <iframe
            title="BISESJ Campus Location on Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3711.234!2d39.1866!3d21.5168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3cf3a60a4f5b5%3A0xb1y9wDWiEVpdr21BA!2sBangladesh%20International%20School%20English%20Section!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa"
            width="100%"
            height="380"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        ) : (
          <div className="relative flex min-h-[320px] flex-col items-center justify-center bg-secondary/50 p-8 text-center">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-40 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:24px_24px]"
            />
            <div className="relative z-10 flex flex-col items-center gap-4 max-w-md">
              <span className="flex size-14 items-center justify-center rounded-full bg-primary text-gold shadow-lift">
                <MapPin className="size-7" />
              </span>
              <div>
                <h3 className="font-serif text-lg font-bold text-foreground">Interactive Map Placeholder</h3>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  To protect your privacy and ensure fast initial page loads, Google Maps is not loaded automatically.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setLoaded(true)}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-forest-deep"
              >
                <Navigation aria-hidden="true" className="size-4" />
                <span>Show interactive map</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
