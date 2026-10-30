import { InnerPage } from '@/components/site/inner-page'

export const metadata = {
  title: "Chairman's Message | BISESJ",
  description: 'Official message from the Chairman of the School Management Council at BISESJ.',
}

export default function ChairmansMessagePage() {
  return (
    <InnerPage
      slug="chairmans-message"
      title="Chairman's Message"
      subtitle="Vision, divine inspiration, and guidance from the School Management Council (SMC)."
      badge="Leadership"
    />
  )
}
