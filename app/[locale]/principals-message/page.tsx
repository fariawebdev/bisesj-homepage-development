import { InnerPage } from '@/components/site/inner-page'

export const metadata = {
  title: "Principal's Message | BISESJ",
  description: 'Academic leadership, whole-child education philosophy, and vision from the Acting Principal of BISESJ.',
}

export default function PrincipalsMessagePage() {
  return (
    <InnerPage
      slug="principals-message"
      title="Principal's Message"
      subtitle="Educating the whole child: physical vitality, mental agility, and spiritual depth."
      badge="Academic Leadership"
    />
  )
}
