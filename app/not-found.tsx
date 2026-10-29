import Link from 'next/link'
import { ArrowLeft, Compass, Home, Mail, UserPlus } from 'lucide-react'

export const metadata = {
  title: '404 - Page Not Found | BISESJ',
  description: 'The requested page could not be found.',
}

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FAF8F3] text-[#121614] flex flex-col items-center justify-center p-6">
        <main id="main" className="mx-auto max-w-md text-center">
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-[#0B3D2E]/10 text-[#0B3D2E]">
            <Compass aria-hidden="true" className="size-10 text-[#C9A24B]" />
          </div>
          <span className="mt-6 block font-serif text-6xl font-bold tracking-tight text-[#0B3D2E]">
            404
          </span>
          <h1 className="mt-2 text-3xl font-bold text-[#121614]">
            Page Not Found
          </h1>
          <p className="mt-4 text-sm text-[#55605A] leading-relaxed">
            The page you are looking for might have been moved, renamed, or is temporarily unavailable.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/en"
              className="inline-flex items-center gap-2 rounded-full bg-[#0B3D2E] px-6 py-3 text-xs font-semibold text-[#FAF8F3] hover:bg-[#072A20]"
            >
              <Home aria-hidden="true" className="size-3.5" />
              <span>Home</span>
            </Link>
            <Link
              href="/en/admission"
              className="inline-flex items-center gap-2 rounded-full bg-[#C9A24B] px-6 py-3 text-xs font-semibold text-[#0B3D2E] hover:bg-[#E8D6A8]"
            >
              <UserPlus aria-hidden="true" className="size-3.5" />
              <span>Admission</span>
            </Link>
            <Link
              href="/en/contact"
              className="inline-flex items-center gap-2 rounded-full border border-[#E5DFD1] bg-white px-6 py-3 text-xs font-semibold text-[#121614] hover:bg-[#F1EDE4]"
            >
              <Mail aria-hidden="true" className="size-3.5" />
              <span>Contact</span>
            </Link>
          </div>
        </main>
      </body>
    </html>
  )
}
