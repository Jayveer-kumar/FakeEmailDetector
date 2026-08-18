import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ResultBox({ result, mode }) {
  const [visibleLines, setVisibleLines] = useState([]);

  useEffect(() => {
    if (!result || mode !== "message") return;
    setVisibleLines([]);

    let index = 0;
    const interval = setInterval(() => {
      setVisibleLines(prev => [...prev, result.messages[index]]);
      index++;
      if (index >= result.messages.length) {
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [result, mode]);

  if (!result) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: .4 }}
      className="bg-[#0f0f0f] border border-[#222] p-5 rounded-xl shadow-xl text-white"
    >
      {/* Header */}
      <div className="mb-4">
        <div className="text-lg font-semibold">📧 {result.email}</div>
        {/* <div className="text-sm opacity-75">
          🛡 {result.riskLabel}
        </div> */}
        <div className="text-sm opacity-75">
          <h4>Confidence :-  {result.confidence.level} </h4>
          <p>{result.confidence.text}</p>
        </div>
      </div>

      {/* -- MESSAGE MODE -- */}
      {mode === "message" && (
        <div className="space-y-2 mb-20">
          {visibleLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className="border-l-2 border-green-500 pl-3"
            >
              {line}
            </motion.div>
          ))}
        </div>
      )}

      {/* -- JSON MODE -- */}
      {mode === "json" && (
        <motion.pre
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: .3 }}
          className="bg-black/40 p-4 rounded-md text-green-300 text-sm overflow-auto mb-20 "
        >
          {JSON.stringify(result.raw, null, 2)}
        </motion.pre>
      )}
    </motion.div>
  );
}
