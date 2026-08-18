import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    id: 1,
    title: 'Format Validation',
    desc: 'Checks if the email syntax is correct (username@domain.tld).',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 12l2 2 6-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: 'from-green-400 to-emerald-500',
  },
  {
    id: 2,
    title: 'Domain & MX Check',
    desc: 'Verifies the domain exists and mail servers (MX) are reachable.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 15v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 10l5-5 5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 3v12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: 'from-sky-400 to-indigo-500',
  },
  {
    id: 3,
    title: 'Disposable Detection',
    desc: 'Detects throwaway/temporary email providers and flags them.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 11h14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 22h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 11v11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 11v11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: 'from-pink-400 to-rose-500',
  },
  {
    id: 4,
    title: 'Role-based Detection',
    desc: 'Identifies role emails like support@, info@, which are less personal.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 22v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: 'from-yellow-300 to-amber-400',
  },
  {
    id: 5,
    title: 'Catch-All Detection',
    desc: 'Detects catch-all domains that accept any email address (higher risk).',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 12h18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 3v18" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: 'from-violet-400 to-purple-500',
  },
  {
    id: 6,
    title: 'Suspicious Pattern Check',
    desc: 'Runs heuristics to flag spammy or algorithmically generated addresses.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 8v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 16h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: 'from-emerald-300 to-lime-500',
  },
];

function FeatureCard({ f, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      className="bg-gradient-to-br shadow-lg rounded-2xl p-5 flex flex-col gap-3 hover:scale-[1.02] transform-gpu transition-transform"
      style={{ background: 'transparent' }}
    >
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${f.color} flex items-center justify-center text-white`}>
        {f.icon}
      </div>

      <h4 className="text-white font-semibold text-lg">{f.title}</h4>
      <p className="text-sm text-gray-300 leading-relaxed">{f.desc}</p>
    </motion.article>
  );
}

export default function ProductSection() {
  return (
    <section className="mt-12 px-6 lg:px-20" id="product">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-3xl sm:text-4xl font-extrabold text-white"
          >
            Product — What it does
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12, duration: 0.6 }}
            className="text-gray-300 mt-3 max-w-2xl mx-auto"
          >
            Fast, reliable email verification for signup forms, lead capture and
            security workflows. See the key checks we run under the hood.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left: key benefits + CTA + demo */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="space-y-6"
          >
            <div className="bg-[#0b1220] border border-[#1f2937] rounded-2xl p-6 shadow-md">
              <h3 className="text-xl font-semibold text-white">Why use Fake Email Detector</h3>
              <ul className="mt-4 text-gray-300 space-y-2">
                <li>• Reduce fake signups and bot accounts</li>
                <li>• Improve email deliverability & sender reputation</li>
                <li>• Cut down on fraud and account abuse</li>
                <li>• Real-time checks with minimal latency</li>
              </ul>

              <div className="mt-6 flex gap-3">
                <button className="cursor-pointer px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-400 to-teal-500 text-black font-semibold shadow hover:brightness-105 transition">
                  Try Live Demo
                </button>
                <button className="cursor-pointer px-4 py-2 rounded-lg border border-gray-700 text-gray-200 hover:bg-white/5 transition">
                  Learn more
                </button>
              </div>
            </div>

            {/* Demo card (mini) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="bg-gradient-to-br from-black/30 to-black/10 border border-[#111827] p-5 rounded-2xl shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-300">Sample Check</div>
                  <div className="text-lg font-semibold text-white">jayveer@gmail.com</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">Risk</div>
                  <div className="text-sm font-semibold text-green-400">Very Low</div>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm text-gray-300">
                <div>✔ Email format is valid.</div>
                <div>✔ Domain exists and is reachable.</div>
                <div>✔ Mail server (MX record) found.</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Middle + Right: Feature grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <FeatureCard  key={f.id} f={f} index={i} />
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 flex items-center justify-center"
        >
          <button className="cursor-pointer px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition-transform">
            Try it now — test an email
          </button>
        </motion.div>
      </div>
    </section>
  );
}
