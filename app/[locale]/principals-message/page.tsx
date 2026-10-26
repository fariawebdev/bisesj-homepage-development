import { InnerPage } from '@/components/site/inner-page'
import { Quote } from 'lucide-react'

export const metadata = {
  title: "Principal's Message | BISESJ",
  description: "Message from the Principal, Bangladesh International School, English Section, Jeddah.",
}

export default function PrincipalsMessagePage() {
  return (
    <InnerPage
      title="Principal's Message"
      subtitle="Welcoming students, parents, and community members to a vibrant academic journey."
      badge="Academic Leadership"
    >
      <div className="space-y-8">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-soft">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-forest/10 p-3 text-forest shrink-0">
              <Quote aria-hidden="true" className="size-8" />
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg font-medium text-foreground italic">
                &ldquo;Every student possesses unique talents waiting to be nurtured into lifelong strengths. At BISESJ, our commitment is to inspire intellectual curiosity, moral integrity, and resilience.&rdquo;
              </p>
              <p>
                Our Cambridge International curriculum is taught by committed educators who bring passion and deep subject mastery into every classroom. From foundational early years through the exacting rigors of Cambridge IGCSE and A Levels, we challenge our students to question, innovate, and lead.
              </p>
              <p>
                Together with our parents and alumni, we celebrate consistent academic triumphs and personal breakthroughs every single day.
              </p>
              <div className="pt-4 border-t border-border">
                <p className="font-bold text-foreground">Principal</p>
                <p className="text-xs text-muted-foreground">Bangladesh International School, English Section, Jeddah</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InnerPage>
  )
}
