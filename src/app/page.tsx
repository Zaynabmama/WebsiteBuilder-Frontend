'use client';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import AboutSection from '@/components/about';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <AboutSection />
    </div>
  );
};

export default HomePage;
