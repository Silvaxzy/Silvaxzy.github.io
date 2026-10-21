import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Particles from "@/components/ui/Particles";
import Cursor from "@/components/ui/Cursor";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Particles />
      <Cursor />
      <Navbar />
      <main id="conteudo" className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
