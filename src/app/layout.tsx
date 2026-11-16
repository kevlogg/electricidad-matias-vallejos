// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { BUSINESS_CONFIG, FAQ_DATA, TESTIMONIALS_DATA } from "@/lib/constants";

const montserrat = Montserrat({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B0B0C",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://electricidad-matias-vallejos.vercel.app"),
  title: {
    default: "MV Electricidad • Matías Vallejos | Electricista Profesional & Urgencias 24hs",
    template: "%s | MV Electricidad - Matías Vallejos",
  },
  description:
    "Soluciones eléctricas profesionales, rápidas y garantizadas en CABA y GBA a cargo de Matías Vallejos. Urgencias eléctricas 24hs, armado y renovación de tableros, cableados normalizados e iluminación LED. Calificación 5.0 en Google.",
  applicationName: "MV Electricidad",
  category: "Home Services, Electrical Services",
  keywords: [
    "electricista",
    "electricista urgente",
    "electricista matriculado",
    "electricista 24 horas",
    "electricista a domicilio",
    "Matías Vallejos",
    "MV Electricidad",
    "electricista CABA",
    "electricista Palermo",
    "electricista Belgrano",
    "electricista Caballito",
    "electricista Recoleta",
    "electricista Villa Urquiza",
    "electricista Núñez",
    "electricista Vicente López",
    "electricista Olivos",
    "electricista San Isidro",
    "tableros eléctricos",
    "reparación cortocircuitos",
    "salto de disyuntor",
    "protectores de sobretensión",
    "cableado normalizado IRAM",
    "instalaciones eléctricas domiciliarias",
    "instalaciones eléctricas comerciales",
    "iluminación LED",
    "norma AEA 90364",
    "diagnóstico eléctrico en el día"
  ],
  authors: [{ name: "Matías Vallejos", url: "https://electricidad-matias-vallejos.vercel.app" }],
  creator: "Matías Vallejos",
  publisher: "MV Electricidad",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://electricidad-matias-vallejos.vercel.app",
    siteName: "MV Electricidad • Matías Vallejos",
    title: "MV Electricidad • Matías Vallejos | Electricista Profesional & Urgencias 24hs",
    description:
      "Soluciones eléctricas seguras, rápidas y garantizadas en CABA y GBA por Matías Vallejos. Urgencias 24hs, tableros, instalaciones domiciliarias y comerciales. Calificación 5.0 ★★★★★ en Google.",
    images: [
      {
        url: "/images/logo.jpg",
        width: 640,
        height: 640,
        alt: "Logo oficial MV Electricidad - Matías Vallejos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MV Electricidad • Matías Vallejos | Electricista Profesional",
    description:
      "Urgencias eléctricas 24hs, tableros, cableados e iluminación bajo norma AEA 90364 con materiales IRAM certificados.",
    images: ["/images/logo.jpg"],
  },
  alternates: {
    canonical: "https://electricidad-matias-vallejos.vercel.app",
  },
  other: {
    "geo.region": "AR-C",
    "geo.placename": "Buenos Aires, CABA",
    "geo.position": "-34.588;-58.430",
    ICBM: "-34.588, -58.430",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Electrician", "LocalBusiness", "ProfessionalService"],
    "@id": "https://electricidad-matias-vallejos.vercel.app/#business",
    name: BUSINESS_CONFIG.name,
    legalName: "MV Electricidad - Matías Vallejos",
    alternateName: ["Matías Vallejos Electricista", "MV Electricidad Profesional"],
    url: "https://electricidad-matias-vallejos.vercel.app",
    logo: "https://electricidad-matias-vallejos.vercel.app/images/logo.jpg",
    image: "https://electricidad-matias-vallejos.vercel.app/images/logo.jpg",
    telephone: BUSINESS_CONFIG.phoneDisplay,
    email: BUSINESS_CONFIG.email,
    priceRange: "$$",
    currenciesAccepted: "ARS",
    paymentAccepted: "Efectivo, Transferencia Bancaria, Mercado Pago",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Buenos Aires",
      addressRegion: "CABA",
      addressCountry: "AR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -34.588,
      longitude: -58.43,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "49",
      bestRating: "5",
      worstRating: "1",
    },
    review: TESTIMONIALS_DATA.map((t) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: t.author,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: t.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: t.comment,
    })),
    areaServed: [
      { "@type": "AdministrativeArea", name: "Ciudad Autónoma de Buenos Aires" },
      { "@type": "AdministrativeArea", name: "Gran Buenos Aires" },
      { "@type": "City", name: "Palermo" },
      { "@type": "City", name: "Belgrano" },
      { "@type": "City", name: "Caballito" },
      { "@type": "City", name: "Recoleta" },
      { "@type": "City", name: "Villa Urquiza" },
      { "@type": "City", name: "Vicente López" },
      { "@type": "City", name: "Olivos" },
      { "@type": "City", name: "San Isidro" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Catálogo de Servicios Eléctricos Profesionales",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Urgencias Eléctricas y Reparación de Cortocircuitos",
            description: "Detección rápida de fugas a tierra, salto de disyuntor y corte de suministro.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Armado y Renovación de Tableros Eléctricos",
            description: "Instalación de disyuntores diferenciales, llaves térmicas y protectores de tensión.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Instalaciones Domiciliarias y Comerciales",
            description: "Cableados completos bajo norma AEA 90364 y circuitos dedicados para aires acondicionados.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Iluminación Interior y Exterior LED",
            description: "Colocación de spots, artefactos embutidos, tiras LED, reflectores y sensores.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mantenimiento Preventivo y Puesta a Tierra",
            description: "Medición con instrumental calibrado, balanceo de fases y jabalina de PAT.",
          },
        },
      ],
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${plusJakartaSans.variable} dark scroll-smooth`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#0B0B0C] text-white antialiased flex flex-col selection:bg-[#FFE600] selection:text-[#0B0B0C]">
        {children}
      </body>
    </html>
  );
}
