import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    quote: "This platform completely transformed how we collaborate with other departments.",
    author: "A. Kumar, Health Department",
  },
  {
    quote: "Incredible coordination features! We saved so much time on joint projects.",
    author: "S. Rao, Urban Development",
  },
  {
    quote: "The discussion forum and project tracking made everything smooth and transparent.",
    author: "P. Iyer, Transport Department",
  },
  {
    quote: "A must-have system for modern governance. The collaboration is seamless.",
    author: "R. Sen, Environment Department",
  },
];

const QuoteWall = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const flickerAnimation = {
    animate: {
      opacity: [0.6, 1, 0.7, 1],
      transition: {
        repeat: Infinity,
        duration: 1.5,
      },
    },
  };

  return (
    <section className="bg-gray-900 py-24 px-4 text-white relative">
      <h2 className="text-center text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-cyan-400 to-teal-300 text-transparent bg-clip-text mb-20">
        💬 What Departments Say
      </h2>

      <div className="max-w-4xl mx-auto text-center px-6 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8 }}
            className="relative px-8 py-12 rounded-xl border border-cyan-500/20 bg-gray-800/60 shadow-[0_0_30px_#06b6d450] backdrop-blur-md"
          >
            <motion.div
              variants={flickerAnimation}
              animate="animate"
              className="text-cyan-400 text-5xl absolute -top-6 left-6"
            >
              <FaQuoteLeft />
            </motion.div>

            <p className="text-2xl md:text-3xl font-medium leading-relaxed text-white drop-shadow-md">
              "{testimonials[index].quote}"
            </p>
            <p className="mt-6 text-cyan-300 text-lg font-semibold">
              — {testimonials[index].author}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default QuoteWall;
