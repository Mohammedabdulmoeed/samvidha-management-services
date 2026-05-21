import { Helmet } from 'react-helmet-async';
import {
  SITE_URL,
  SITE_FULL_NAME,
  DEFAULT_OG_IMAGE,
  business,
  defaultKeywords,
} from '../../data/seo';

function buildLocalBusinessSchema({ title, description }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    legalName: business.legalName,
    description: description || business.legalName,
    url: business.url,
    telephone: business.telephone,
    email: business.email,
    image: DEFAULT_OG_IMAGE,
    priceRange: business.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.streetAddress,
      addressLocality: business.address.addressLocality,
      addressRegion: business.address.addressRegion,
      postalCode: business.address.postalCode,
      addressCountry: business.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    areaServed: business.areaServed,
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '20:00',
    },
  };
}

export default function SEO({
  title,
  description,
  keywords = defaultKeywords,
  path = '/',
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  noindex = false,
}) {
  const canonicalPath = path === '/' ? '' : path;
  const canonical = `${SITE_URL}${canonicalPath}`;
  const pageTitle = title || SITE_FULL_NAME;
  const metaDescription =
    description ||
    'Samvidha Management Services — facility management, electrician, plumbing, housekeeping, and STP maintenance in Hyderabad, India.';

  const schema = buildLocalBusinessSchema({ title: pageTitle, description: metaDescription });

  return (
    <Helmet>
      <html lang="en" />
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={business.legalName} />
      <link rel="canonical" href={canonical} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:site_name" content={SITE_FULL_NAME} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
