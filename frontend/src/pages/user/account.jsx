import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useAuth, Container } from "../../FilesPaths/all_path";
import { Link } from "react-router-dom";

const menuItems = [
    { title: "Orders", Link: "/order" },
    { title: "Customer Care", Link: "/customer-care" },
    { title: "Invite Friends & Earn", description: "You get ₹100 SuperCash for every friend", Link: "/invite-friends" },
    { title: "AJIO Wallet", description: "Add Gift Card | Manage rewards and refunds", Link: "/wallet" },
    { title: "Saved Cards", Link: "/saved-cards" },
    { title: "My Rewards", Link: "/rewards" },
    { title: "Address", Link: "/address" },
    { title: "Notifications", Link: "/notifications" },
    { title: "Return Creation Demo", Link: "/return-demo" },
    { title: "How To Return", Link: "/how-to-return" },
    { title: "How Do I Redeem My Coupon?", Link: "/redeem-coupon" },
    { title: "Terms & Conditions", Link: "/terms" },
    { title: "Promotions Terms & Conditions", Link: "/promotions-terms" },
    { title: "Returns & Refunds Policy", Link: "/returns-policy" },
    { title: "We Respect Your Privacy", Link: "/privacy-policy" },
    { title: "Fees & Payments", Link: "/fees-payments" },
    { title: "Who We Are", Link: "/about-us" },
    { title: "Join Our Team", Link: "/careers" },
];

const AccountPage = () => {
    const { user, logout } = useAuth();
    const [users, setUser] = useState('');
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    useEffect(() => {
        if (user) {
            console.log('user', user);
            setUser(user);  // Set the user ID if the user is logged in
        }
    }, [user]);

    return (
        <Container>
            <Link
  to={-1}
  className="flex items-center gap-2 px-4 py-2  bg-gray-400/20 text-gray-700 rounded-md  transition-all duration-200"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5L8.25 12l7.5-7.5"
    />
  </svg>
  Back
</Link>
            <div className="bg-gray-50 min-h-screen p-4 pb-24">
                <motion.h1
                    className="text-xl font-semibold mt-2 mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    My Account
                </motion.h1>

                {/* Profile Section */}
                <motion.div
                    className="bg-white p-4 rounded-xl flex items-center justify-between mb-4 shadow"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-semibold text-lg">
                            {users.username ? users.username.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                            <h2 className="font-medium">{users.username}</h2>
                            <p className="text-sm text-gray-600">{users.email}</p>
                            <p className="text-sm text-gray-600">8976350904</p>
                        </div>
                    </div>
                    <button className="text-blue-500 text-sm font-medium">Edit</button>
                </motion.div>

                {/* Menu Items */}
                <div className="bg-white rounded-xl shadow divide-y">
                    {menuItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className="p-4 flex items-center justify-between hover:bg-gray-50 transition"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.02 * index }}
                        >
                            <Link to={item.Link} className="flex justify-between items-center w-full">
                                <div>
                                    <p className="font-medium">{item.title}</p>
                                    {item.description && (
                                        <p className="text-xs text-gray-500">{item.description}</p>
                                    )}
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Logout Button */}
                <div className="mt-6 flex flex-col items-center">
                    <button
                        onClick={() => setShowLogoutConfirm(true)}
                        className="border px-6 py-2 rounded-full text-red-500 font-medium hover:bg-red-50 transition"
                    >
                        Logout
                    </button>
                    <p className="text-xs text-gray-400 mt-2">Version 9.21.0 Build 3457</p>
                </div>

                {/* Logout Confirmation Popup */}
                {showLogoutConfirm && (
                    <div className="fixed inset-0 bg-black/10 backdrop-blur-sm flex justify-center items-center z-50">
                        <div className="bg-white rounded-lg p-6 w-85 shadow-lg text-center">
                            <h3 className="text-lg font-semibold mb-4">Are you sure you want to logout?</h3>
                            <div className="flex justify-around border-t-2 border-gray-200 pt-4">
                                <div className="border-r-1 border-gray-300 w-1/2">
                                    <button
                                        onClick={() => { logout(); setShowLogoutConfirm(false); }}
                                        className="bg-red-500 text-white px-8 py-2 rounded-md border border-red-700 hover:bg-red-600 transition"
                                    >
                                        Yes
                                    </button>
                                </div>
                                <div className="border-l-1 border-gray-300 w-1/2">
                                    <button
                                        onClick={() => setShowLogoutConfirm(false)}
                                        className="bg-gray-300 px-8 py-2 rounded-md border border-gray-500 hover:bg-gray-400 transition"
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default AccountPage;