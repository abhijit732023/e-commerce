import React from "react";
import { motion } from "framer-motion";
import { FaUndo, FaExchangeAlt, FaQuestionCircle, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const RefundReturn = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-rose-50 px-4 py-12 md:px-0 flex items-center justify-center">
      <motion.div
        className="max-w-3xl w-full mx-auto bg-white/90 rounded-3xl shadow-2xl border border-rose-100 p-8 md:p-12"
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
            <FaUndo className="text-white text-3xl" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-rose-700 mb-2 tracking-tight text-center">
            Refund & Return Policy
          </h1>
          <p className="text-center text-gray-500 max-w-xl">
            At SS Collection, your satisfaction is our top priority. Here’s everything you need to know about our easy and transparent return & refund process.
          </p>
        </div>

        <div className="space-y-10">
          <motion.section
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <FaCheckCircle className="text-green-500" />
              <h2 className="text-xl md:text-2xl font-semibold">1. Return Eligibility</h2>
            </div>
            <p className="text-gray-700">
              You can return your item within <strong>7 days</strong> of delivery. To be eligible for a return:
            </p>
            <ul className="list-disc ml-6 text-gray-600 mt-2 space-y-1">
              <li>Item must be unused and in the same condition as received</li>
              <li>Item must be in original packaging with tags intact</li>
              <li>Proof of purchase (invoice or order ID) is required</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <FaTimesCircle className="text-rose-500" />
              <h2 className="text-xl md:text-2xl font-semibold">2. Non-Returnable Items</h2>
            </div>
            <p className="text-gray-700">
              The following items are not eligible for return:
            </p>
            <ul className="list-disc ml-6 text-gray-600 mt-2 space-y-1">
              <li>Undergarments, innerwear, or intimate products</li>
              <li>Customized or altered products</li>
              <li>Items marked as “Final Sale” or “Non-Returnable”</li>
            </ul>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <FaUndo className="text-blue-500" />
              <h2 className="text-xl md:text-2xl font-semibold">3. Refund Process</h2>
            </div>
            <p className="text-gray-700">
              Once your return is received and inspected, we will notify you of the approval or rejection of your refund.
            </p>
            <p className="text-gray-700 mt-2">
              If approved, your refund will be processed within <strong>5–7 business days</strong> to your original payment method.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <FaExchangeAlt className="text-amber-500" />
              <h2 className="text-xl md:text-2xl font-semibold">4. Exchange Policy</h2>
            </div>
            <p className="text-gray-700">
              Need a different size or color? You can request an exchange within the same 7-day period. Availability of stock will determine if the exchange is possible.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <FaUndo className="text-rose-400" />
              <h2 className="text-xl md:text-2xl font-semibold">5. How to Initiate a Return</h2>
            </div>
            <ol className="list-decimal ml-6 text-gray-600 space-y-1">
              <li>
                Contact our support team at{" "}
                <a href="mailto:support@sscollection.com" className="text-rose-700 font-medium underline">
                  support@sscollection.com
                </a>
              </li>
              <li>Provide your order ID and reason for return</li>
              <li>Our team will guide you through the return process</li>
            </ol>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <FaQuestionCircle className="text-blue-400" />
              <h2 className="text-xl md:text-2xl font-semibold">6. Need Help?</h2>
            </div>
            <p className="text-gray-700">
              For any questions related to returns or refunds, feel free to contact us at{" "}
              <a href="mailto:support@sscollection.com" className="text-rose-700 font-medium underline">
                support@sscollection.com
              </a>{" "}
              or call us at <strong>+91-9876543210</strong>.
            </p>
          </motion.section>
        </div>
      </motion.div>
    </div>
  );
};

export default RefundReturn;