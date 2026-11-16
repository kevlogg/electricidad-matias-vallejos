// src/app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { BUSINESS_CONFIG } from "@/lib/constants";

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
  metadataBase: new URL("https://mvelectricidad.com.ar"),
  title: {
    default: "MV Electricidad • Matías Vallejos | Electricista Profesional y Urgencias",
    template: "%s | MV Electricidad - Matías Vallejos",
  },
  description:
    "Soluciones eléctricas seguras, rápidas y garantizadas en CABA y GBA por Matías Vallejos. Urgencias eléctricas, tableros, instalaciones domiciliarias/comerciales, iluminación LED y mantenimiento con certificación IRAM.",
  keywords: [
    "electricista",
    "electricista urgente",
    "electricista matriculado",
    "Matías Vallejos",
    "MV Electricidad",
    "tableros eléctricos",
    "reparación cortocircuitos",
    "instalaciones eléctricas CABA",
    "electricista Palermo",
    "electricista Belgrano",
    "electricista Caballito",
    "disyuntor diferencial",
    "protectores de tensión"
  ],
  authors: [{ name: "Matías Vallejos", url: "https://mvelectricidad.com.ar" }],
  creator: "MV Electricidad",
  publisher: "MV Electricidad",
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
    url: "https://mvelectricidad.com.ar",
    siteName: "MV Electricidad",
    title: "MV Electricidad • Matías Vallejos | Electricista Profesional y Urgencias",
    description:
      "Soluciones eléctricas seguras, rápidas y con garantía escrita a cargo de Matías Vallejos. Atención en el día, materiales certificados y calificación 5.0 en Google.",
    images: [
      {
        url: "/images/logo.jpg",
        width: 800,
        height: 800,
        alt: "MV Electricidad - Matías Vallejos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MV Electricidad • Matías Vallejos | Soluciones Eléctricas",
    description:
      "Electricista profesional para urgencias, tableros, cableados e iluminación con materiales certificados.",
    images: ["/images/logo.jpg"],
  },
  alternates: {
    canonical: "https://mvelectricidad.com.ar",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Electrician", "LocalBusiness"],
    name: BUSINESS_CONFIG.name,
    legalName: "MV Electricidad - Matías Vallejos",
    alternateName: "Matías Vallejos Electricista",
    image: "https://mvelectricidad.com.ar/images/logo.jpg",
    telephone: BUSINESS_CONFIG.phoneDisplay,
    priceRange: "$$",
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
    areaServed: [
      { "@type": "AdministrativeArea", name: "Ciudad Autónoma de Buenos Aires" },
      { "@type": "AdministrativeArea", name: "Gran Buenos Aires" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de Electricidad Profesional",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Urgencias Eléctricas y Cortocircuitos",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Tableros Eléctricos y Protecciones",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Instalaciones Domiciliarias y Comerciales",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Iluminación Interior y Exterior LED",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mantenimiento Preventivo y Certificación",
          },
        },
      ],
    },
  };

  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${plusJakartaSans.variable} dark scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#0B0B0C] text-white antialiased flex flex-col selection:bg-[#FFE600] selection:text-[#0B0B0C]">
        {children}
      </body>
    </html>
  );
}
