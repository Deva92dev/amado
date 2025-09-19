export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Amado",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
        width: 512,
        height: 512,
      },
      sameAs: [
        "https://www.instagram.com/amado",
        "https://www.facebook.com/amado",
        "https://twitter.com/amado",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Amado – Where Leisure Meets Luxury",
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${BASE_URL}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

// Breadcrumbs helper for any page
export function buildBreadcrumb(
  paths: { name: string; url: string }[]
): object {
  return {
    "@type": "BreadcrumbList",
    itemListElement: paths.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      item: p.url,
    })),
  };
}

// Product Listing Page schema (CollectionPage with featured categories as Product Groups)
export function buildProductListingPage(
  pageUrl: string,
  categories: { id: string; name: string }[]
): object {
  return {
    "@type": "CollectionPage",
    "@id": pageUrl,
    url: pageUrl,
    name: "Shop Products – Amado",
    hasPart: categories.slice(0, 20).map((c) => ({
      "@type": "ProductGroup",
      "@id": `${BASE_URL}/categories/${c.id}`,
      name: c.name,
      url: `${BASE_URL}/categories/${c.id}`,
    })),
  };
}

// Product Details Page schema with detailed information
export function buildProductDetailPage(product: {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  type: string;
  price: number;
  priceCurrency: string; // e.g. "USD"
}): object {
  const base = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "@id": `${BASE_URL}/products/${product.id}`,
    name: product.name,
    image: product.imageUrl,
    description: product.description,
    offers: {
      "@type": "Offer",
      url: `${BASE_URL}/products/${product.id}`,
      priceCurrency: product.priceCurrency,
      price: product.price,
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return base;
}

// FAQ page schema builder
export function buildFAQ(
  faqEntries: { question: string; answer: string }[]
): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntries.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}
