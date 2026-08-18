import { motion } from "framer-motion";

export default function Process() {
  const steps = [
    {
      id: 1,
      title: "Step 1: Discovery",
      description: "We understand your needs, goals, and challenges to plan the right solution.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Step 2: Strategy",
      description: "We create a clear roadmap, define features, and finalize the action plan.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 6h18M3 14h18M3 18h18" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Step 3: Build",
      description: "Our team designs, develops, and tests the product with precision.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Step 4: Launch",
      description: "We deploy, monitor, and optimize your product for long-term success.",
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3" />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full py-20 my-20" id="our_process">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-4 text-white"
        >
          Our Process
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-gray-300 max-w-2xl mx-auto mb-16 text-lg"
        >
          A clear, structured, and efficient workflow built for speed and quality.
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className=" rounded-2xl p-8 shadow-md  hover:shadow-lg transition cursor-pointer bg-white/5"
            >
              <div className="flex justify-center mb-6 text-white">{step.icon}</div>
              <h3 className="text-xl text-white font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-300 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}