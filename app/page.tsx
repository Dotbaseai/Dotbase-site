import Header from "../components/home/Header";
import Footer from "../components/home/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import AgentsSection from "@/components/home/AgentsSection";
import TokenomicsSection from "@/components/home/TokenomicsSection";
import { Providers } from "@/providers/privy-provider";

export default function Home() {
  return (
        <Providers>
          <main className="bg-black">
            <Header />
            <HeroSection />
            <AgentsSection />
            <FeaturesSection />
            <TokenomicsSection />
            <Footer />
          </main>
        </Providers>
  );
}
