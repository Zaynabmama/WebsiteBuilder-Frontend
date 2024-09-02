import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/about";


export default function HomePage() {
  return (
   <div>
      <Navbar></Navbar>
      <Hero></Hero>
      <AboutSection></AboutSection>
   </div>
  );
}
