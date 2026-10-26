import { InnerPage } from '@/components/site/inner-page'
import { Quote } from 'lucide-react'

export const metadata = {
  title: "Chairman's Message | BISESJ",
  description: "Message from the Chairman of the Board of Directors, Bangladesh International School, English Section, Jeddah.",
}

export default function ChairmansMessagePage() {
  return (
    <InnerPage
      title="Chairman's Message"
      subtitle="Guiding vision and strategic commitments from the Board of Directors of BISESJ."
      badge="Leadership"
    >
      <div className="space-y-8">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-forest/10 p-3 text-forest shrink-0">
              <Quote aria-hidden="true" className="size-8" />
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg font-medium text-foreground italic">
                &ldquo;Welcome to Bangladesh International School, English Section, Jeddah. Our mission has always been anchored in empowering students with world-class education while upholding our rich cultural heritage.&rdquo;
              </p>
              <p>
                As Chairman of the Board of Directors, I take immense pride in our school&apos;s journey over more than thirty years. We continually invest in modern educational facilities, professional educator development, and enriched student life to ensure every BISESJ graduate steps into the world confident, compassionate, and academically prepared for global challenges.
              </p>
              <p>
                We deeply appreciate the enduring trust of our parent community, the dedication of our faculty, and the guidance of the Saudi Ministry of Education and the Embassy of Bangladesh.
              </p>
              <div className="pt-4 border-t border-border">
                <p className="font-bold text-foreground">Chairman, Board of Directors</p>
                <p className="text-xs text-muted-foreground">Bangladesh International School, English Section, Jeddah</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InnerPage>
  )
}
