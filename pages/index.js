import BenefitsSection from "@/components/benefits-section";
import Footer from "@/components/footer";
import { HeroComponent } from "@/components/hero";
import HowItWorks from "@/components/how-it-works";
import PreviewSection from "@/components/preview-section";
import SecuritySection from "@/components/security-section";
import Seo from "@/components/seo";
import Waitlist from "@/components/Waitlist";
import Head from "next/head";

export default function Home({ repos }) {
  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="bQ-I5B4ba72Y5TA4g1InJ-NTvOsJhVCkHSX2rp-Vkjo"
        />
      </Head>
      <Seo />
      <HeroComponent />
      <HowItWorks />
      <BenefitsSection />
      <PreviewSection />
      <SecuritySection />
      <Waitlist />
      <Footer />
    </>
  );
}
