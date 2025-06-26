import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa";
import { Container } from "../../FilesPaths/all_path";

const faqs = [
  {
    question: "What is Khuwab Collection?",
    answer:
      "Khuwab Collection is a modern clothing brand offering stylish, high-quality, and affordable fashion for men, women, and kids.",
  },
  {
    question: "Do you offer Cash on Delivery?",
    answer:
      "Yes, we offer Cash on Delivery (COD) in select regions. You can choose COD during checkout if it's available for your location.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Our orders are typically delivered within 4–7 business days, depending on your location and the availability of the products.",
  },
  {
    question: "Can I return or exchange a product?",
    answer:
      "Absolutely. We offer a hassle-free return and exchange policy within 7 days of delivery. Please ensure items are unused and in original packaging.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, we’ll send a tracking link to your email and SMS. You can also track it via your account dashboard.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50  md:px-20 overflow-y-auto">
        <motion.div
          className="max-w-3xl w-full mx-auto h-screen pb-20 bg-white/90  shadow-2xl border border-rose-100 p-6 md:p-12"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="flex flex-col items-center mb-10">
            <motion.div
              className="bg-gradient-to-br from-rose-500 via-amber-400 to-rose-300 w-14 h-14 rounded-full flex items-center justify-center shadow-lg mb-3"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <FaQuestionCircle className="text-white text-2xl" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-rose-700 mb-2 tracking-tight text-center">
              Frequently Asked Questions
            </h1>
            <p className="text-center text-gray-500 max-w-xl">
              Find answers to the most common questions about shopping, delivery, returns, and more at Khuwab Collection.
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className={`rounded-xl border border-rose-100 bg-white/80 shadow-sm overflow-hidden`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * index }}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-5 py-4 text-lg font-semibold text-rose-700 hover:bg-rose-50 transition group focus:outline-none"
                  aria-expanded={openIndex === index}
                >
                  <span>{faq.question}</span>
                  <span>
                    {openIndex === index ? (
                      <FaChevronUp className="text-rose-400 transition" />
                    ) : (
                      <FaChevronDown className="text-gray-400 transition" />
                    )}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 text-gray-700 text-base">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Container>
  );
};

export default FAQ;
