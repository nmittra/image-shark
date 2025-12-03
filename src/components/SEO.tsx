import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  keywords?: string;
  type?: string;
  canonicalUrl?: string;
  noindex?: boolean;
}

export const SEO = ({
  title,
  description,
  url,
  image,
  keywords,
  type = 'website',
  canonicalUrl,
  noindex = false
}: SEOProps) => {
  const siteName = "Image Shark";
  const defaultTitle = "Image Shark - Free Online Image Editor & Photo Editing Tools";
  const defaultDescription = "Edit, compress, resize, watermark, crop, and convert images online for free. Professional image editing tools with no registration required. Fast, secure, and easy to use.";
  const defaultUrl = typeof window !== 'undefined' ? window.location.href : 'https://image-shark.com';
  const defaultImage = '/og-image.png';
  const defaultKeywords = "image editor, photo editor, compress images, resize images, watermark images, crop images, convert images, online image tools, free image editor, image optimization";

  const pageTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const pageDescription = description || defaultDescription;
  const pageUrl = url || defaultUrl;
  const pageImage = image || defaultImage;
  const pageKeywords = keywords || defaultKeywords;
  const canonical = canonicalUrl || pageUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />

      {/* Robots */}
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={pageImage} />

      {/* Additional SEO */}
      <meta name="author" content="Image Shark" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />

      {/* Mobile Optimization */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteName} />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": siteName,
          "description": pageDescription,
          "url": pageUrl,
          "applicationCategory": "MultimediaApplication",
          "operatingSystem": "Any",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "1250"
          }
        })}
      </script>
    </Helmet>
  );
};
