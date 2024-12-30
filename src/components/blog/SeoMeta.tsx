import Head from 'next/head';

type SeoMetaProps = {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
  keywords?: string[];
  type?: 'article' | 'website';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
};

export default function SeoMeta({
  title,
  description,
  ogImage,
  canonical,
  noindex = false,
  keywords = [],
  type = 'article',
  publishedTime,
  modifiedTime,
  tags = [],
}: SeoMetaProps) {
  const siteName = '退職あんしん代行';
  const domain = 'https://taishoku-anshin-daiko.com';
  const fullTitle = `${title} | ${siteName}`;

  return (
    <Head>
      {/* 基本的なメタタグ */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* OGP */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* 記事固有のメタデータ */}
      {type === 'article' && (
        <>
          {publishedTime && (
            <meta property="article:published_time" content={publishedTime} />
          )}
          {modifiedTime && (
            <meta property="article:modified_time" content={modifiedTime} />
          )}
          {tags.map((tag) => (
            <meta property="article:tag" content={tag} key={tag} />
          ))}
        </>
      )}

      {/* JSON-LD 構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': type === 'article' ? 'BlogPosting' : 'WebSite',
            headline: title,
            description: description,
            ...(type === 'article' && {
              datePublished: publishedTime,
              dateModified: modifiedTime || publishedTime,
              keywords: keywords.join(', '),
              image: ogImage,
            }),
          }),
        }}
      />
    </Head>
  );
} 