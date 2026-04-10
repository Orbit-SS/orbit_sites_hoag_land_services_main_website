import Link from 'next/link'
import Image from 'next/image'
import {
  IMAGES,
  PHONE,
  PHONE_HREF,
  EMAIL,
  COMPANY,
  COMPANY_LLC,
  EST_YEAR,
  LOCATION,
  FACEBOOK,
  INSTAGRAM,
} from '@/shared/constants'

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Service Areas', href: '/service-areas' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
]

const SERVICE_LINKS = [
  { label: 'Site Services', href: '/services/site-work' },
  { label: 'Tree Services', href: '/services/tree-services' },
  { label: 'Fencing Services', href: '/services/fencing' },
]

/** Top service area cities for footer internal linking */
const TOP_LOCATIONS = [
  { label: 'DeLand', slug: 'deland' },
  { label: 'Daytona Beach', slug: 'daytona-beach' },
  { label: 'Palm Coast', slug: 'palm-coast' },
  { label: 'Deltona', slug: 'deltona' },
  { label: 'Sanford', slug: 'sanford' },
  { label: 'Orlando', slug: 'orlando' },
  { label: 'Port Orange', slug: 'port-orange' },
  { label: 'Ormond Beach', slug: 'ormond-beach' },
  { label: 'New Smyrna Beach', slug: 'new-smyrna-beach' },
  { label: 'Ocala', slug: 'ocala' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0d0f0d] text-white/70">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Column 1: Logo + Company */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src={IMAGES.logo}
                alt={COMPANY}
                width={48}
                height={48}
                className="w-12 h-12 object-contain"
              />
              <span className="font-display text-xl uppercase tracking-wider text-white font-bold">
                {COMPANY}
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-white/50">
              Professional land clearing, tree services, and fencing for
              residential &amp; commercial properties in Central Florida.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-widest text-[#c2a878] mb-4 font-bold">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-[#4a7c59] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-widest text-[#c2a878] mb-4 font-bold">
              Services
            </h3>
            <ul className="space-y-2">
              {SERVICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-[#4a7c59] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Service Areas */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-widest text-[#c2a878] mb-4 font-bold">
              Service Areas
            </h3>
            <ul className="space-y-2">
              {TOP_LOCATIONS.map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={`/services/tree-services/${loc.slug}`}
                    className="text-sm text-white/50 hover:text-[#4a7c59] transition-colors duration-200"
                  >
                    {loc.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/service-areas"
                  className="text-sm text-[#4a7c59] hover:text-[#5a9c6d] font-semibold transition-colors duration-200"
                >
                  View All Areas &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact + Social */}
          <div>
            <h3 className="font-display text-sm uppercase tracking-widest text-[#c2a878] mb-4 font-bold">
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={PHONE_HREF}
                  className="flex items-center gap-2 text-sm text-white/50 hover:text-[#4a7c59] transition-colors duration-200"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {PHONE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-2 text-sm text-white/50 hover:text-[#4a7c59] transition-colors duration-200"
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-white/50">
                <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {LOCATION}
              </li>
            </ul>

            {/* Social */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href={FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#4a7c59]/20 flex items-center justify-center text-white/40 hover:text-[#4a7c59] transition-all duration-200"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#4a7c59]/20 flex items-center justify-center text-white/40 hover:text-[#4a7c59] transition-all duration-200"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
          <p>&copy; {new Date().getFullYear()} {COMPANY_LLC}. All rights reserved.</p>
          <p>{COMPANY_LLC} est. {EST_YEAR}</p>
        </div>
      </div>
    </footer>
  )
}
