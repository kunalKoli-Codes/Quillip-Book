'use client';
import Hero from './Hero';
import About from './About';
import Services from './Service';
import Pricing from './Pricing';
import ISBN from './Isbn';
import Process from './Process';


import { use } from 'react';
function App() {
  return (
    <div className="min-h-screen">
    
      <Hero />
      <About />
      <Services />
      <Pricing />
      <ISBN />
      <Process />
      
    </div>
  );
}

export default App;
