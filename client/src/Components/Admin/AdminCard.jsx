// export default function AdminCard({ title, value }) {
//   return (
//     <div className="bg-white shadow-md rounded-xl p-6 w-full">
//       <h3 className="text-gray-600 text-sm">{title}</h3>
//       <p className="text-3xl font-bold mt-2">{value}</p>
//     </div>
//   );
// }


import { useEffect, useState } from "react";

export default function AdminCard({ title, value }) {
  const [displayValue, setDisplayValue] = useState(0);

  // Animated Counter
  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;

    let duration = 800;
    let increment = end / (duration / 20);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setDisplayValue(Math.floor(start));
    }, 20);
  }, [value]);

  return (
    <div
      className="
        bg-white p-6 rounded-xl shadow 
        transform transition-all duration-300
        hover:scale-[1.03] hover:shadow-xl 
        opacity-0 animate-fadeIn
      "
    >
      <h3 className="text-gray-600 text-sm font-semibold">{title}</h3>
      <p className="text-3xl font-bold mt-2 text-blue-600">{displayValue}</p>
    </div>
  );
}

