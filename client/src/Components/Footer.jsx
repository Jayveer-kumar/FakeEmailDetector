import { Mail, Phone, Globe, Facebook, Twitter, Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { Link , useNavigate , useLocation } from "react-router-dom";

const scrollLinks = [
  // { id : "overview" , label : "Overview"},
  { id: "product" , label : "Product"},
  { id: "our_process", label : "Our Process"},
  { id: "pricing", label : "Pricing"},
  { id: "contact", label : "Contact"}
]

export default function Footer() {

  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollLink = (e , id) => {
    e.preventDefault();

    if(location.pathname === "/") {
      // already on home page - just scroll
      document.getElementById(id)?.scrollIntoView({ behavior : "smooth"})
    } else {
      // different page - go home with hash , Home.jsx will scroll after mount
      navigate(`/#${id}`);
    }
  }

  return (
    <footer className="w-full bg-[#070c08] text-gray-300 py-12 px-6 mt-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

        {/* Brand Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-white mb-3">
            Fake Email Detector
          </h2>
          <p className="text-gray-400">
            Trusted tool to verify email authenticity and reduce fraud.
          </p>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex gap-3 items-center">
              <Mail className="text-green-400" size={18} />
              support@fakeemaildetector.com
            </div>
            <div className="flex gap-3 items-center">
              <Phone className="text-green-400" size={18} />
              +91 7248060696
            </div>
            <div className="flex gap-3 items-center">
              <Globe className="text-green-400" size={18} />
              Indira Chowk , Badaun , Uttar Pradesh , India
            </div>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="text-sm">
            {scrollLinks.map((link)=> (
              <li key={link.id} className="py-1">
                <a href={`/#{link.id}`}
                   onClick={(e)=> handleScrollLink(e,link.id)}
                   className="hover:text-green-400 cursor-pointer transition">
                    {link.label}
                  
                </a>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Legal Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
          <ul className="space-y-3 text-sm">
            <li> <Link to="/terms"className="hover:text-green-400 cursor-pointer transition"  >Terms & Conditions</Link> </li>
            <li> <Link to="/privacy"className="hover:text-green-400 cursor-pointer transition"  >Privacy Policy</Link> </li>
            <li> <Link to="/refund"className="hover:text-green-400 cursor-pointer transition"  >Refund Policy</Link> </li>
            <li> <Link to="/data-usage"className="hover:text-green-400 cursor-pointer transition"  >Data Usage</Link> </li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-5 mt-6">
            <Facebook className="cursor-pointer hover:text-green-400 transition" />
            <Twitter className="cursor-pointer hover:text-green-400 transition" />
            <Instagram className="cursor-pointer hover:text-green-400 transition" />
          </div>
        </motion.div>
      </div>

      {/* Bottom Divider */}
      <div className="border-t border-gray-700 mt-10 pt-5 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} Fake Email Detector — All Rights Reserved.
      </div>
    </footer>
  );
}
