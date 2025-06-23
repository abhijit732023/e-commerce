import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import Container from "../../component/container";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2500);
    setFormData({ name: "", email: "", message: "" });
    // TODO: Add backend integration or API call here
  };

  return (
    <Container>
      <div className="h-[84vh] bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex items-center justify-center overflow-y-auto">
        <motion.div
          className="max-w-4xl w-full mx-auto bg-white/90 shadow-2xl border border-pink-200 p-4 md:p-8 overflow-auto"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          style={{ maxHeight: "100%" }}
        >
          <div className="flex flex-col items-center mb-8">
            <motion.div
              className="bg-gradient-to-br from-rose-500 via-amber-400 to-rose-300 w-16 h-16 rounded-full flex items-center justify-center shadow-lg mb-3"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <FaEnvelope className="text-white text-3xl" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-rose-700 mb-2 tracking-tight text-center drop-shadow-lg">
              Contact Us
            </h1>
            <p className="text-center text-gray-700 max-w-xl mb-6">
              Have a question, feedback, or just want to say hello? We’d love to hear from you.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Contact Form */}
            <div className="flex-1 bg-white py-6 px-4 rounded-3xl shadow-lg border border-pink-200">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:ring-rose-400 focus:border-rose-400 bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:ring-rose-400 focus:border-rose-400 bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full p-3 rounded-md border border-gray-300 shadow-sm focus:ring-rose-400 focus:border-rose-400 bg-white"
                  ></textarea>
                </div>
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.97 }}
                  className="w-full flex items-center justify-center gap-2 bg-rose-600 text-white py-3 rounded-lg font-semibold shadow hover:bg-rose-700 transition duration-300"
                >
                  <FaPaperPlane />
                  Send Message
                </motion.button>
                {sent && (
                  <motion.p
                    className="text-green-600 text-center font-semibold mt-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Message sent! We’ll get back to you soon.
                  </motion.p>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div className="flex-1 flex flex-col justify-center items-center gap-5 mt-8 md:mt-0">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-rose-600 text-xl" />
                <span className="text-gray-700 font-medium">
                  <a href="mailto:support@sscollection.com" className="hover:underline">
                    support@sscollection.com
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="text-rose-600 text-xl" />
                <span className="text-gray-700 font-medium">+91-9876543210</span>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-rose-600 text-xl" />
                <span className="text-gray-700 font-medium">Mumbai, India</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Container>
  );
};

export default ContactUs;