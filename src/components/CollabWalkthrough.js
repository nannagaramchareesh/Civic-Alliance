import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    title: "Step 1: Initiate Collaboration",
    description:
      "Departments initiate collaboration by sending requests to other departments with details of the project.",
    icon: "📨",
  },
  {
    title: "Step 2: Review & Accept",
    description:
      "Recipient departments can view incoming requests and choose to accept or reject them based on their scope.",
    icon: "✅",
  },
  {
    title: "Step 3: Assign & Coordinate",
    description:
      "Once accepted, departments assign responsibilities, share data, and coordinate progress in real-time.",
    icon: "📊",
  },
  {
    title: "Step 4: Project Completion",
    description:
      "All departments finalize tasks, upload deliverables, and mark the project complete with reviews.",
    icon: "🏁",
  },
];

const slideLeft = {
  hidden: { x: -300 },
  visible: {
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const slideRight = {
  hidden: { x: 300 },
  visible: {
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function CollabWalkthrough() {
  return (
    <section className="w-full min-h-screen px-6 py-24  text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ y: -50 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-lime-300 mb-20"
        >
          🚀 Department Collaboration Journey
        </motion.h2>

        <div className="space-y-20">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={index % 2 === 0 ? slideLeft : slideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center gap-10 px-6 py-10 bg-gray-800 bg-opacity-60 rounded-3xl shadow-2xl ${
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="text-7xl md:text-8xl">{step.icon}</div>

              <div className="text-center md:text-left max-w-3xl">
                <h3 className="text-4xl font-bold text-cyan-300 mb-4">{step.title}</h3>
                <p className="text-lg text-gray-300">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
