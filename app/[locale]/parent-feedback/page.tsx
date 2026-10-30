import { InnerPage } from '@/components/site/inner-page'
import { SITE_CONFIG } from '@/lib/site-config'
import { MessageSquareHeart, Mail, Phone, MessageCircle } from 'lucide-react'

export const metadata = {
  title: 'Parent Feedback & Complaints | BISESJ',
  description: 'Direct communication channel for parent feedback, inquiries, and complaints at BISESJ.',
}

export default function ParentFeedbackPage() {
  return (
    <InnerPage
      title="Parent Feedback & Complaints"
      subtitle="We value our parent partnership. Please reach out to our dedicated feedback channel with your comments, suggestions, or concerns."
      badge="Parent Engagement"
    >
      <div className="space-y-8">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-forest/10 p-3 text-forest shrink-0">
              <MessageSquareHeart aria-hidden="true" className="size-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Parent Complaints & Suggestions</h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Bangladesh International School, English Section, Jeddah maintains an active listening policy for all parents and legal guardians. Every piece of constructive feedback helps us strengthen the educational and welfare standards for your children.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div>
              <div className="rounded-xl bg-forest/10 p-3 text-forest w-fit">
                <Mail aria-hidden="true" className="size-6" />
              </div>
              <h3 className="mt-4 font-bold text-foreground">Direct Email Channel</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Send your detailed feedback, grievance, or academic inquiry directly to our feedback and complaints coordinator.
              </p>
            </div>
            <div className="mt-6">
              <a
                href={SITE_CONFIG.contact.feedbackEmail.href}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-forest-deep"
              >
                <Mail aria-hidden="true" className="size-3.5" />
                <span>{SITE_CONFIG.feedbackEmail}</span>
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div>
              <div className="rounded-xl bg-forest/10 p-3 text-forest w-fit">
                <MessageCircle aria-hidden="true" className="size-6" />
              </div>
              <h3 className="mt-4 font-bold text-foreground">Instant WhatsApp Messaging</h3>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Connect directly with our school reception desk on WhatsApp for general queries and assistance.
              </p>
            </div>
            <div className="mt-6">
              <a
                href={SITE_CONFIG.contact.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-xs font-semibold text-primary transition-colors hover:bg-gold-soft"
              >
                <MessageCircle aria-hidden="true" className="size-3.5" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-muted/30 p-6">
          <h3 className="font-serif text-lg font-bold text-foreground">Escalation & Confidentiality</h3>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            All parent communications received via <span className="font-semibold text-foreground">{SITE_CONFIG.feedbackEmail}</span> are treated with strict confidentiality. Urgent matters are escalated directly to the Academic Section Coordinators and the Acting Principal.
          </p>
        </div>
      </div>
    </InnerPage>
  )
}
