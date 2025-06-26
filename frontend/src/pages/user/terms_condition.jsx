import React from "react";
import { motion } from "framer-motion";
import { FaGavel, FaShieldAlt, FaSyncAlt, FaInfoCircle, FaLock, FaUndo, FaUserShield } from "react-icons/fa";
import Container from "../../component/container";

const sections = [
  {
    icon: <FaGavel className="text-rose-600 text-xl" />,
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using our website (Khuwab Collection), you agree to comply with and be bound by these Terms & Conditions. If you do not agree, please do not use our website.",
  },
  {
    icon: <FaShieldAlt className="text-amber-500 text-xl" />,
    title: "2. Use of the Website",
    content:
      "You agree to use the website for lawful purposes only. You must not use it in a way that violates any applicable laws or regulations or causes harm to others or the website.",
  },
  {
    icon: <FaInfoCircle className="text-blue-500 text-xl" />,
    title: "3. Product Information",
    content:
      "We strive to ensure that all product details, prices, and availability are accurate. However, we do not guarantee that descriptions are error-free, complete, or current.",
  },
  {
    icon: <FaSyncAlt className="text-green-600 text-xl" />,
    title: "4. Orders & Payments",
    content:
      "All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order. Payments must be completed through our secure payment gateway options.",
  },
  {
    icon: <FaLock className="text-rose-400 text-xl" />,
    title: "5. Intellectual Property",
    content:
      "All content on this site, including logos, designs, images, and text, is the property of Khuwab Collection and protected by copyright laws. Unauthorized use is strictly prohibited.",
  },
  {
    icon: <FaUndo className="text-blue-400 text-xl" />,
    title: "6. Returns & Refunds",
    content: (
      <>
        Please refer to our{" "}
        <a href="/refund-policy" className="text-rose-700 underline font-medium">
          Refund & Return Policy
        </a>{" "}
        for details on product returns and eligibility for refunds.
      </>
    ),
  },
  {
    icon: <FaUserShield className="text-green-500 text-xl" />,
    title: "7. Privacy Policy",
    content: (
      <>
        Your privacy is important to us. Please review our{" "}
        <a href="/privacy-policy" className="text-rose-700 underline font-medium">
          Privacy Policy
        </a>{" "}
        to understand how we collect and use your data.
      </>
    ),
  },
  {
    icon: <FaShieldAlt className="text-amber-400 text-xl" />,
    title: "8. Limitation of Liability",
    content:
      "Khuwab Collection is not liable for any indirect, incidental, or consequential damages resulting from the use of our website or products.",
  },
  {
    icon: <FaSyncAlt className="text-blue-500 text-xl" />,
    title: "9. Changes to Terms",
    content:
      "We reserve the right to update or change these Terms & Conditions at any time without prior notice. Your continued use of the website constitutes your agreement to any changes.",
  },
  {
    icon: <FaInfoCircle className="text-rose-600 text-xl" />,
    title: "10. Contact Us",
    content: (
      <>
        If you have any questions regarding these Terms & Conditions, please contact us at{" "}
        <a href="mailto:support@sscollection.com" className="text-rose-700 font-medium">
          support@sscollection.com
        </a>
        .
      </>
    ),
  },
];

const TermsConditions = () => {
  return (
    <Container>
          <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50    md:px-20 flex flex-col items-center justify-start overflow-y-auto max-h-screen">
      <motion.div
        className="max-w-4xl w-full mx-auto bg-white/90 rounded-md shadow-2xl border border-pink-200 p-6 md:p-12"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center mb-10">
          <motion.div
            className="bg-gradient-to-br from-rose-500 via-amber-400 to-rose-300 w-16 h-16 rounded-full flex items-center justify-center shadow-lg mb-3"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <FaGavel className="text-white text-3xl" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-rose-700 mb-2 tracking-tight text-center">
            Terms & Conditions
          </h1>
          <p className="text-center text-gray-600 mb-8 max-w-2xl">
            Please read these Terms and Conditions carefully before using our website.
          </p>
        </div>
        <div className="space-y-8 pb-20">
          {sections.map((section, idx) => (
            <motion.section
              key={idx}
              className="bg-white/80 rounded-2xl border border-rose-100 shadow p-5 md:p-7 flex gap-4 items-start"
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.07 * idx }}
            >
              <div className="flex-shrink-0 mt-1">{section.icon}</div>
              <div>
                <h2 className="text-xl md:text-2xl font-semibold mb-1">{section.title}</h2>
                <div className="text-gray-700">{section.content}</div>
              </div>
            </motion.section>
          ))}
        </div>
      </motion.div>
    </div>
    </Container>

  );
};

export default TermsConditions;