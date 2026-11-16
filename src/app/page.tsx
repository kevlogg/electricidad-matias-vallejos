// src/app/page.tsx
import { Header } from '@/components/features/Header';
import { Hero } from '@/components/features/Hero';
import { HeroServicesStrip } from '@/components/features/HeroServicesStrip';
import { ElectricDivider } from '@/components/features/ElectricDivider';
import { ServicesSection } from '@/components/features/ServicesSection';
import { WhyChooseUsSection } from '@/components/features/WhyChooseUsSection';
import { UrgencyCtaBanner } from '@/components/features/UrgencyCtaBanner';
import { SocialProofSection } from '@/components/features/SocialProofSection';
import { CoverageAndContactSection } from '@/components/features/CoverageAndContactSection';
import { FaqSection } from '@/components/features/FaqSection';
import { Footer } from '@/components/features/Footer';
import { FloatingWhatsApp } from '@/components/features/FloatingWhatsApp';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0B0B0C] text-white flex flex-col selection:bg-[#FFE600] selection:text-[#0B0B0C]">
      {/* Top Header Navigation */}
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Tira de Servicios destacados y diferenciales */}
      <HeroServicesStrip />

      {/* Dynamic Electric Divider */}
      <ElectricDivider />

      {/* 6 Core Services */}
      <ServicesSection />

      {/* Dynamic Electric Divider */}
      <ElectricDivider />

      {/* Differentials & Technical Safety Protocol */}
      <WhyChooseUsSection />

      {/* Interstitial High Impact CTA Banner */}
      <UrgencyCtaBanner />

      {/* Google Business Profile & 5-Star Reviews */}
      <SocialProofSection />

      {/* Dynamic Electric Divider */}
      <ElectricDivider />

      {/* Coverage Zones, Work Hours & Interactive Quote Wizard */}
      <CoverageAndContactSection />

      {/* Dynamic Electric Divider */}
      <ElectricDivider />

      {/* FAQ Accordion */}
      <FaqSection />

      {/* Comprehensive 4-Column Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />
    </main>
  );
}
