'use client'

import { useId, useRef, useState } from 'react'
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CONTACT } from '@/src/links'
import { ENQUIRY, SCHOOL } from '@/src/content'
import { SITE_CONFIG } from '@/lib/site-config'
import { Reveal } from './motion'
import { SectionHeading } from './section-heading'
import { SmartLink } from './smart-link'

type Values = { name: string; phone: string; grade: string; message: string }
type Errors = Partial<Record<keyof Values, string>>

const EMPTY: Values = { name: '', phone: '', grade: '', message: '' }
const PHONE_PATTERN = /^\+?[\d\s()-]+$/

function validate(v: Values): Errors {
  const errors: Errors = {}
  if (!v.name.trim()) errors.name = 'Please enter the parent name.'
  else if (v.name.trim().length < 2) errors.name = 'Name must be at least 2 characters.'

  const digits = v.phone.replace(/\D/g, '')
  if (!v.phone.trim()) errors.phone = 'Please enter a phone or WhatsApp number.'
  else if (!PHONE_PATTERN.test(v.phone.trim()) || digits.length < 8 || digits.length > 15)
    errors.phone = 'Enter a valid phone number, e.g. +966 5X XXX XXXX.'

  if (!v.grade) errors.grade = "Please select your child's grade."
  if (!v.message.trim()) errors.message = 'Please enter a short message.'
  return errors
}

export function EnquirySection() {
  const [values, setValues] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'notice'>('idle')
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const update = (key: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...values, [key]: e.target.value }
    setValues(next)
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: validate(next)[key] }))
    if (status === 'notice') setStatus('idle')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    // Sprint 5: Real submission handler will connect to backend API and database.
    setStatus('notice')
  }

  return (
    <section id="enquiry" aria-labelledby="enquiry-title" className="scroll-mt-28 bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <SectionHeading id="enquiry-title" eyebrow={ENQUIRY.eyebrow} title={ENQUIRY.heading} sub={ENQUIRY.sub} />

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          {/* Form */}
          <Reveal className="lg:col-span-7">
            <form
              ref={formRef}
              noValidate
              onSubmit={handleSubmit}
              aria-labelledby="enquiry-title"
              className="flex flex-col gap-5 rounded-[24px] border border-border bg-card p-6 shadow-soft md:p-10"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={ENQUIRY.fields.name} error={errors.name}>
                  {(props) => (
                    <input {...props} name="name" type="text" autoComplete="name" value={values.name} onChange={update('name')} />
                  )}
                </Field>
                <Field label={ENQUIRY.fields.phone} error={errors.phone}>
                  {(props) => (
                    <input
                      {...props}
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      dir="ltr"
                      placeholder="+966 5X XXX XXXX"
                      value={values.phone}
                      onChange={update('phone')}
                    />
                  )}
                </Field>
              </div>
              <Field label={ENQUIRY.fields.grade} error={errors.grade}>
                {(props) => (
                  <select {...props} name="grade" value={values.grade} onChange={update('grade')}>
                    <option value="">Select a grade</option>
                    {ENQUIRY.grades.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                )}
              </Field>
              <Field label={ENQUIRY.fields.message} error={errors.message}>
                {(props) => (
                  <textarea {...props} ref={messageRef} name="message" rows={4} value={values.message} onChange={update('message')} />
                )}
              </Field>

              <div className="flex flex-col gap-4">
                <div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-forest-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                  >
                    {ENQUIRY.submit}
                  </button>
                </div>
                {status === 'notice' && (
                  <div
                    id="enquiry-status-notice"
                    role="status"
                    aria-live="polite"
                    className="flex flex-col gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-5 text-sm text-foreground"
                  >
                    <p className="font-medium leading-relaxed">
                      Online enquiries are opening soon. Please call{' '}
                      <a
                        href={SITE_CONFIG.contact.officialPhone.href}
                        className="font-semibold text-primary underline hover:text-gold"
                      >
                        {SITE_CONFIG.contact.officialPhone.display}
                      </a>{' '}
                      or message us on WhatsApp{' '}
                      <a
                        href={SITE_CONFIG.contact.whatsapp.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-primary underline hover:text-gold"
                      >
                        {SITE_CONFIG.contact.whatsapp.display}
                      </a>
                      .
                    </p>
                    <div className="flex flex-wrap gap-3 pt-1">
                      <a
                        href={SITE_CONFIG.contact.officialPhone.href}
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-forest-deep"
                      >
                        <Phone aria-hidden="true" className="size-3.5" />
                        Call {SITE_CONFIG.contact.officialPhone.display}
                      </a>
                      <a
                        href={SITE_CONFIG.contact.whatsapp.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-gold px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-gold-soft"
                      >
                        <MessageCircle aria-hidden="true" className="size-3.5" />
                        Message on WhatsApp
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </Reveal>

          {/* Contact details */}
          <Reveal delay={0.1} className="flex flex-col gap-4 lg:col-span-5">
            <div className="flex flex-col gap-5 rounded-[24px] bg-primary p-7 text-primary-foreground shadow-lift md:p-9">
              <ContactRow icon={<Phone aria-hidden="true" className="size-5" />} label="Phone">
                <a href={CONTACT.phoneHref} dir="ltr" className="hover:text-gold-soft" aria-label={`Call ${CONTACT.phoneDisplay}`}>
                  {CONTACT.phoneDisplay}
                </a>
              </ContactRow>
              <div className="gold-rule opacity-40" />
              <ContactRow icon={<Mail aria-hidden="true" className="size-5" />} label="Email">
                <a href={CONTACT.emailHref} className="break-all hover:text-gold-soft">
                  {CONTACT.email}
                </a>
              </ContactRow>
              <div className="gold-rule opacity-40" />
              <ContactRow icon={<MapPin aria-hidden="true" className="size-5" />} label="Address">
                <span>{SCHOOL.address}</span>
              </ContactRow>
              <SmartLink
                to="whatsapp"
                label={`Chat on WhatsApp ${CONTACT.whatsappDisplay}`}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-primary transition-colors hover:bg-gold-soft"
              >
                <MessageCircle aria-hidden="true" className="size-4" />
                Chat on WhatsApp
              </SmartLink>
            </div>

            <SmartLink
              to="map"
              label="Open BISESJ location in Google Maps"
              className="group relative flex min-h-48 flex-1 flex-col justify-end overflow-hidden rounded-[24px] border border-border bg-secondary p-7 shadow-soft transition-shadow hover:shadow-lift"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-60 [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:28px_28px]"
              />
              <span aria-hidden="true" className="absolute start-1/2 top-1/3 -translate-x-1/2 rtl:translate-x-1/2">
                <span className="relative flex size-12 items-center justify-center rounded-full bg-primary text-gold shadow-lift">
                  <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" />
                  <MapPin className="relative size-5" />
                </span>
              </span>
              <span className="relative flex items-end justify-between gap-4">
                <span>
                  <span className="block font-serif text-2xl text-primary">Find us in Jeddah</span>
                  <span className="block text-sm text-muted-foreground">Open in Google Maps</span>
                </span>
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:-translate-y-0.5">
                  <ArrowUpRight aria-hidden="true" className="size-4 rtl:-scale-x-100" />
                </span>
              </span>
            </SmartLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

const controlClass =
  'w-full rounded-2xl border bg-background px-4 py-3.5 text-base text-foreground transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-gold/40'

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: (props: {
    id: string
    className: string
    required: true
    'aria-invalid': boolean
    'aria-describedby'?: string
  }) => React.ReactNode
}) {
  const id = useId()
  const errorId = `${id}-error`
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-foreground">
        {label} <span aria-hidden="true" className="text-brand-red">*</span>
      </label>
      {children({
        id,
        required: true,
        className: cn(controlClass, error ? 'border-brand-red' : 'border-border'),
        'aria-invalid': Boolean(error),
        'aria-describedby': error ? errorId : undefined,
      })}
      {error && (
        <p id={errorId} className="text-sm font-medium text-brand-red">
          {error}
        </p>
      )}
    </div>
  )
}

function ContactRow({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-gold">{icon}</span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/60">{label}</p>
        <p className="mt-1 text-lg">{children}</p>
      </div>
    </div>
  )
}
