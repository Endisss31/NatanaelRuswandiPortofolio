import React from 'react'
import { Helmet } from 'react-helmet-async'

// ─── Site-wide constants ───────────────────────────────────────────────────────
const SITE_URL = 'https://natanael.tech'
const SITE_NAME = 'Natanael Ruswandi Portfolio'
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`
const TWITTER_HANDLE = '@ntnlrswnd'
const DEFAULT_LOCALE = 'en_US'

// ─── Person JSON-LD ────────────────────────────────────────────────────────────
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Natanael Ruswandi',
  jobTitle: 'Junior Web Developer & Network Administrator',
  description:
    'Junior Web Developer, Network Administrator, and UI/UX Designer based in Kuningan, West Java, Indonesia. Passionate about creating intuitive, responsive web and mobile applications.',
  url: SITE_URL,
  image: `${SITE_URL}/assets/images/LogoNR.png`,
  email: 'natanaeldidi31@gmail.com',
  telephone: '+6285158813112',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Jl. Moertahsiah Soepomo, No. 30 B, Link. Cipicung',
    addressLocality: 'Kuningan',
    addressRegion: 'Jawa Barat',
    addressCountry: 'ID',
  },
  sameAs: [
    'https://github.com/Endisss31',
    'https://linkedin.com',
    'https://instagram.com',
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Universitas Kuningan',
  },
  knowsAbout: [
    'Web Development',
    'React.js',
    'Network Administration',
    'UI/UX Design',
    'Mobile Development',
    'MikroTik',
    'Fiber Optic',
  ],
}

// ─── WebSite JSON-LD (enables Sitelinks Searchbox) ────────────────────────────
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description:
    'Portfolio website of Natanael Ruswandi — Junior Web Developer, Network Administrator, and UI/UX Designer.',
  author: { '@type': 'Person', name: 'Natanael Ruswandi' },
  inLanguage: ['en', 'id'],
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/?s={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
}

// ─── ProfilePage JSON-LD ──────────────────────────────────────────────────────
const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  mainEntity: personSchema,
}

// ═════════════════════════════════════════════════════════════════════════════
// SEOHead component
// ═════════════════════════════════════════════════════════════════════════════
/**
 * @param {object} props
 * @param {string}  props.title          - Page title (appended with " | Natanael Ruswandi")
 * @param {string}  props.description    - Meta description (150–160 chars recommended)
 * @param {string}  [props.canonicalPath] - Path e.g. "/", "/project/p1"
 * @param {string}  [props.ogImage]      - Absolute URL of OG image
 * @param {string}  [props.ogType]       - "website" | "article" | "profile"
 * @param {object}  [props.breadcrumb]   - Array of {name, url} for BreadcrumbList
 * @param {object}  [props.articleSchema]- Optional Article schema override
 * @param {boolean} [props.noIndex]      - Set true for admin/private pages
 */
const SEOHead = ({
  title,
  description,
  canonicalPath = '/',
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  breadcrumb = null,
  articleSchema = null,
  noIndex = false,
}) => {
  const fullTitle = title
    ? `${title} | Natanael Ruswandi`
    : 'Natanael Ruswandi | Junior Web Developer & Network Administrator'

  const fullDescription =
    description ||
    'Portfolio of Natanael Ruswandi — Junior Web Developer, Network Administrator, and UI/UX Designer based in Kuningan, West Java, Indonesia.'

  const canonicalUrl = `${SITE_URL}${canonicalPath}`

  // ── Breadcrumb JSON-LD ──────────────────────────────────────────────────────
  const breadcrumbSchema = breadcrumb
    ? {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        ...breadcrumb.map((item, idx) => ({
          '@type': 'ListItem',
          position: idx + 2,
          name: item.name,
          item: `${SITE_URL}${item.path}`,
        })),
      ],
    }
    : null

  return (
    <Helmet>
      {/* ── Title ── */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />

      {/* ── Core Meta ── */}
      <meta name="description" content={fullDescription} />
      <meta
        name="robots"
        content={noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}
      />
      <meta
        name="google-site-verification"
        content="3UXdBOir4ReCU3SKANtksPYQV4mhR2cjLuG-qc3uMGo"
      />

      {/* ── Canonical ── */}
      <link rel="canonical" href={canonicalUrl} />

      {/* ── Open Graph ── */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={`${fullTitle} — Preview`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content={DEFAULT_LOCALE} />

      {/* ── Twitter Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${fullTitle} — Preview`} />
      {TWITTER_HANDLE && <meta name="twitter:creator" content={TWITTER_HANDLE} />}

      {/* ── JSON-LD: Person + WebSite (on every page) ── */}
      <script type="application/ld+json">{JSON.stringify(personSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>

      {/* ── JSON-LD: ProfilePage (home only) ── */}
      {canonicalPath === '/' && (
        <script type="application/ld+json">{JSON.stringify(profilePageSchema)}</script>
      )}

      {/* ── JSON-LD: BreadcrumbList (when breadcrumb prop provided) ── */}
      {breadcrumbSchema && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      )}

      {/* ── JSON-LD: Article (when articleSchema prop provided) ── */}
      {articleSchema && (
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      )}
    </Helmet>
  )
}

export default SEOHead
