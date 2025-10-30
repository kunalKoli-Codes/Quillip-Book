'use client';
import Hero from './Hero';
import About from './About';
import Services from './Service';
import Pricing from './Pricing';
import ISBN from './Isbn';
import WhyChoose from './WhyChooseUs';
import Process from './Process';
import CTA from './CTA';

import { use } from 'react';
function App() {
  return (
    <div className="min-h-screen">
    
      <Hero />
      <About />
      <Services />
      <Pricing />
      <ISBN />
      <WhyChoose />
      <Process />
      <CTA />
    </div>
  );
}

export default App;
