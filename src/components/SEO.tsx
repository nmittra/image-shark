import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

export const SEO = ({ title, description, url, image }: SEOProps) => {
  const defaultTitle = "Image Shark - Free Online Image Editing Tools";
  const defaultDescription = "Edit, compress, resize, watermark, crop, and convert images online for free with Image Shark. No registration required. Fast, secure, and easy to use.";
  const defaultUrl = typeof window !== 'undefined' ? window.location.href : '';
  const defaultImage = '/shark-logo.png';

  return (
    <Helmet>
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />

      {/* Open Graph */}
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:url" content={url || defaultUrl} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
};
