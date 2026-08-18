import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";
import { validateContactForm } from "../Utills/validateContactForm";
import CustomAlert from "../Components/Aleart";
import Loader from "../Components/Loader";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [loading , setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { valid, msg, type } = validateContactForm(form);
    if (!valid) {
      setAlertMsg(msg);
      setAlertType(type);
      setAlertOpen(true);
      return;
    }

    try {
       
      setLoading(true);
      
      const response = await fetch("http://localhost:8080/api/contact",
        {
          method : "POST",
          headers: {
            "Content-Type" : "application/json",
          },

          body : JSON.stringify({
            name : form.name,
            email : form.email,
            message : form.message,
          })
        }
      );

      const data = await response.json();

      if(!response.ok){
        setAlertMsg(data.message || "Something went wrong!");
        setAlertType("error");
        setAlertOpen(true);
        setLoading(false);
        return;
      }

      // Server successfully sent email
      setAlertMsg(data.message);
      setAlertType("success");
      setAlertOpen(true);
      setLoading(false);

      // Clear Form
      setForm({
        name : "",
        email : "",
        message : ""
      });
    } catch (err) {
      console.error("Contact form error:",err);
      setAlertMsg("Unable to send message. Please try again later.");
      setAlertType("error");
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }

  };

  return (
    <section className="w-full bg-[#0b0f0c] text-white py-20 px-4" id="contact">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold mb-3">Contact Us</h2>
          <p className="text-gray-300">
            Have questions or need help? Our team is here for you 24/7.
          </p>

          <div className="space-y-4 mt-6">
            <div className="flex items-center gap-4">
              <Mail className="text-green-400" />
              <span className="text-gray-300">
                support@fakeemaildetector.com
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="text-green-400" />
              <span className="text-gray-300">+91 7248060696</span>
            </div>

            <div className="flex items-center gap-4">
              <MapPin className="text-green-400" />
              <span className="text-gray-300">Indira Chowk Badaun , Uttar Pradesh , India</span>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-[#111812] p-8 rounded-xl border border-gray-700 shadow-lg space-y-5"
        >
          <div>
            <label className="block mb-1 text-gray-300">Your Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-green-400 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-300">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-green-400 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-300">Your Message</label>
            <textarea
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              className="w-full p-3 bg-transparent border border-gray-600 rounded-lg focus:border-green-400 outline-none"
            ></textarea>
          </div>

          <button 
            type="submit"
            className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-3 rounded-lg transition-colors cursor-pointer "
          >
            Send Message { loading? <Loader /> : <Send size={20} /> }
          </button>
          <CustomAlert
            open={alertOpen}
            onClose={() => setAlertOpen(false)}
            message={alertMsg}
            severity={alertType}
          />
        </motion.form>
      </div>
    </section>
  );
}
