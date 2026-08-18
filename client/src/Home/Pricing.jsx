import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "₹0",
      period: "Free Forever",
      features: ["Basic Email Validation", "10 Checks / Day", "Spam Detection", "Role-Based Detection"],
      highlighted: false,
    },
    {
      name: "Pro",
      price: "₹299",
      period: "per month",
      features: [
        "Advanced Fraud Analysis",
        "500 Checks / Day",
        "Full Risk Scoring",
        "JSON + Message Reports",
        "Priority API Access",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "Contact Sales",
      features: [
        "Unlimited Email Checks",
        "Dedicated Support",
        "Bulk Reports",
        "Team Dashboard",
        "Advanced Threat Intelligence",
      ],
      highlighted: false,
    },
  ];

  return (
    <section className="w-full bg-[#0B0F0C] text-white py-20 px-4 md:px-14" id="pricing">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center mb-14 testPricing"
      >
        Affordable Pricing for Every Need
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto py-4">
        {plans.map((p, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className={`rounded-2xl p-8 shadow-lg border transition-all duration-300  hover:-translate-y-2 hover:shadow-2xl
              ${p.highlighted ? "bg-gradient-to-br from-green-500/20 to-green-700/20 border-green-500" : "bg-[#111511] border-[#1d1f1d]"}
            `}
          >
            <h3 className="text-2xl font-semibold mb-2">{p.name}</h3>
            <p className="text-4xl font-bold mb-1">{p.price}</p>
            <p className="text-sm opacity-70 mb-6">{p.period}</p>

            <ul className="space-y-3 mb-8">
              {p.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-sm md:text-base">{f}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full cursor-pointer py-3 rounded-xl font-medium transition-all duration-300
                ${p.highlighted ? "bg-green-500 hover:bg-green-600" : "bg-white/10 hover:bg-white/20"}
              `}
            >
              {p.highlighted ? "Get Pro" : "Choose Plan"}
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}


// import React, { useState } from "react";
// import { Check } from "lucide-react";

// export default function Pricing() {
//   const [selectedPlan, setSelectedPlan] = useState("basic");

//   const plans = [
//     {
//       id: "basic",
//       title: "Basic",
//       price: "₹0",
//       highlight: "Perfect for individual testing",
//       features: ["10 Email Checks/day", "Basic Spam Detection", "Format Validation"],
//     },
//     {
//       id: "pro",
//       title: "Pro",
//       price: "₹499/month",
//       highlight: "Best for startups & small teams",
//       features: [
//         "Unlimited Email Checks",
//         "Advanced Fraud Analysis",
//         "Domain Blacklist Check",
//         "API Access",
//       ],
//     },
//     {
//       id: "enterprise",
//       title: "Enterprise",
//       price: "₹1499/month",
//       highlight: "For large businesses",
//       features: [
//         "Priority Checks",
//         "Bulk Email Scanner",
//         "Dedicated API Endpoint",
//         "24/7 Support Team",
//       ],
//     },
//   ];

//   return (
//     <section className="w-full bg-[#0b0f0c] text-white py-20 px-4" id="pricing">
//       <div className="max-w-6xl mx-auto text-center">
//         <h2 className="text-4xl font-bold mb-5">Pricing</h2>
//         <p className="text-gray-300 max-w-2xl mx-auto mb-10">
//           Choose the plan that fits your email verification needs.
//         </p>

//         <div className="grid md:grid-cols-3 gap-6 mt-10">
//           {plans.map((plan) => {
//             const isSelected = selectedPlan === plan.id;

//             return (
//               <div
//                 key={plan.id}
//                 onClick={() => setSelectedPlan(plan.id)}
//                 className={`
//                   cursor-pointer rounded-2xl p-6 border transition-all duration-300
//                   hover:scale-105
//                   ${
//                     isSelected
//                       ? "border-green-400 shadow-[0_0_20px_#22c55e]"
//                       : "border-gray-700"
//                   }
//                 `}
//               >
//                 <h3 className="text-2xl font-semibold">{plan.title}</h3>
//                 <p className="text-green-400 text-xl mt-2">{plan.price}</p>
//                 <p className="text-gray-400 text-sm mt-1">{plan.highlight}</p>

//                 <ul className="mt-5 space-y-3">
//                   {plan.features.map((f, i) => (
//                     <li key={i} className="flex items-center gap-2">
//                       <Check className="text-green-400" size={18} />
//                       <span>{f}</span>
//                     </li>
//                   ))}
//                 </ul>

//                 {isSelected && (
//                   <div className="mt-5 text-green-400 font-medium">
//                     ✔ Selected Plan
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }
