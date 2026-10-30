import { InnerPage } from '@/components/site/inner-page'

export const metadata = {
  title: 'About Us | BISESJ',
  description: 'Founding history, mission, accreditation, and facilities at Bangladesh International School English Section, Jeddah.',
}

export default function AboutUsPage() {
  return (
    <InnerPage
      slug="about-us"
      title="About Us"
      subtitle="Founding history, academic pillars, international certifications, and campus facilities since 1993."
      badge="School Profile"
    />
  )
}
