import { useEffect } from 'react';
import sideimage from '../images/sideimage.svg'
import Collab from './Collab';
import Features from './Features';
import QuoteWall from './QuoteWall';
import StatsImpactSection from './StatsImpactSection.js';

export default function HeroSection() {
  useEffect(() => {
    const handleScroll = () => {
      const image = document.getElementById('parallax-image');
      const offset = window.scrollY * 0.2;
      if (image) image.style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="flex items-center justify-center max-w-screen-xl px-4 pt-24 pb-8 mx-auto lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Left Side */}
        <div className="lg:col-span-7 relative z-10">
          <h1 className="max-w-2xl mb-6 text-4xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 md:text-5xl xl:text-6xl tracking-wider">
            <span className="typewriter">Streamlining <br /> Urban Governance</span>
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-600 dark:text-gray-300 md:text-lg lg:text-xl">
            Empowering interdepartmental collaboration through a digital platform that enhances resource sharing, project coordination, and communication for efficient urban development.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-3 mt-2 text-white bg-blue-600 rounded-lg shadow-md transition-transform hover:scale-105 hover:bg-blue-700"
          >
            🚀 Get Started
          </a>
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex lg:col-span-5 justify-end relative">
          <img
            id="parallax-image"
            src={sideimage}
            alt="Illustration"
            className="w-[90%] drop-shadow-xl transition-transform duration-300"
          />
          <div className="absolute w-[30%] h-[50%] bottom-32 blue__gradient z-0" />
        </div>
      </div>

      {/* Typewriter Effect */}
      <style>{`
        .typewriter {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid #fff;
          animation: typing 3s steps(30, end), blink 0.75s step-end infinite;
        }
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        @keyframes blink {
          50% { border-color: transparent }
        }
      `}</style>
      <Collab/>
      <Features/>
      <StatsImpactSection/>
      <QuoteWall/>
    </section>
  );
}
