import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaProjectDiagram, FaComments } from "react-icons/fa";

const statItems = [
  {
    icon: <FaUsers />,
    label: "Departments",
    target: 50,
    bgColor: "bg-green-500",
    glowColor: "#22c55e",
  },
  {
    icon: <FaProjectDiagram />,
    label: "Projects Collaborated",
    target: 120,
    bgColor: "bg-purple-500",
    glowColor: "#a855f7",
  },
  {
    icon: <FaComments />,
    label: "Forum Discussions",
    target: 900,
    bgColor: "bg-yellow-400",
    glowColor: "#facc15",
  },
];

const StatItem = ({ icon, label, target, bgColor, glowColor }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const increment = Math.ceil(target / 60);
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setCount(current);
    }, 30);

    return () => clearInterval(interval);
  }, [target]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center space-y-4"
    >
      <div
        className={`w-20 h-20 rounded-xl flex items-center justify-center ${bgColor}`}
        style={{
          boxShadow: `0 0 60px ${glowColor}, 0 0 30px ${glowColor}`,
        }}
      >
        <div className="text-white text-5xl">{icon}</div>
      </div>

      <h2 className="text-4xl font-bold text-white">{count}+</h2>
      <p className="text-white/80 uppercase tracking-widest">{label}</p>
    </motion.div>
  );
};

export default function StatsImpactSection() {
  return (
    <section className="bg-gray-900 py-16 px-6 text-center">
      {/* <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 mb-28"
      >
        ✨ Platform Stats & Impact
      </motion.h2> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 max-w-6xl mx-auto">
        {statItems.map((item, i) => (
          <StatItem key={i} {...item} />
        ))}
      </div>

    </section>
  );
}
