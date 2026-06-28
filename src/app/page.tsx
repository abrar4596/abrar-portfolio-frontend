import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { StatsBanner } from "@/components/StatsBanner";
import { Disciplines } from "@/components/Disciplines";
import { Projects } from "@/components/Projects";
import { Philosophy } from "@/components/Philosophy";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 w-full bg-[#050505]">
        <Hero />
        <StatsBanner />
        <Disciplines />
        <Projects />
        <Philosophy />
        <About />
      </main>
      <Footer />
    </>
  );
}

