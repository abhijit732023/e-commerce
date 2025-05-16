import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useAuth, Container } from "../../FilesPaths/all_path";
import { Link } from "react-router-dom";

const AccountPage = () => {
    const { user, logout } = useAuth();
    const [users, setUser] = useState('');
    const [userdata, setUserData] = useState('');
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const menuItems = [
        { title: "Orders", Link: `/order/${users}` },
        { title: "Customer Care", Link: "/customer-care" },
        { title: "Address", Link: "/address" },
        { title: "Notifications", Link: "/notifications" },
        { title: "How To Return", Link: "/how-to-return" },
        { title: "Terms & Conditions", Link: "/terms" },
        { title: "Returns & Refunds Policy", Link: "/returns-policy" },
        { title: "We Respect Your Privacy", Link: "/privacy-policy" },
        { title: "Who We Are", Link: "/about-us" },
    ];

    useEffect(() => {
        if (user) {
            setUser(user._id);
            setUserData(user);
        }
    }, [user]);

    return (
        <Container>
            <div className="bg-gradient-to-br from-amber-50 via-white to-rose-50 min-h-screen p-4 rounded-2xl shadow-xl">
                <motion.h1
                    className="text-2xl font-bold mt-2 mb-6 text-rose-700 tracking-wide flex items-center gap-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    My Account
                </motion.h1>

                {/* Profile Section */}
                <motion.div
                    className="bg-white p-6 rounded-2xl flex items-center justify-between mb-6 shadow-lg border border-rose-100"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 via-amber-300 to-rose-300 text-white flex items-center justify-center font-bold text-2xl shadow">
                            {userdata.username ? userdata.username.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div>
                            <h2 className="font-semibold text-lg text-gray-800">{userdata.username}</h2>
                            <p className="text-sm text-gray-600">{userdata.email}</p>
                            <p className="text-sm text-gray-600">{userdata.phoneNumber || "Phone number"}</p>
                        </div>
                    </div>
                    <button className="text-blue-500 text-sm font-medium hover:underline hover:text-blue-700 transition">Edit</button>
                </motion.div>

                {/* Menu Items */}
                <div className="bg-white rounded-2xl shadow-lg divide-y border border-rose-100">
                    {menuItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className="p-4 flex items-center justify-between hover:bg-rose-50 transition group"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.02 * index }}
                        >
                            <Link to={item.Link} className="flex justify-between items-center w-full">
                                <div>
                                    <p className="font-medium text-gray-800 group-hover:text-rose-700 transition">{item.title}</p>
                                    {item.description && (
                                        <p className="text-xs text-gray-500">{item.description}</p>
                                    )}
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-rose-600 transition" />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Logout Button */}
                <div className="mt-8 flex flex-col items-center">
                    <button
                        onClick={() => setShowLogoutConfirm(true)}
                        className="border px-8 py-2 rounded-full text-red-500 font-semibold hover:bg-rose-50 hover:text-red-700 transition shadow"
                    >
                        Logout
                    </button>
                    <p className="text-xs text-gray-400 mt-2">Version 9.21.0 Build 3457</p>
                </div>

                {/* Logout Confirmation Popup */}
                <AnimatePresence>
                    {showLogoutConfirm && (
                        <motion.div
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div
                                className="bg-white rounded-2xl p-8 w-full max-w-xs shadow-2xl text-center border border-rose-200"
                                initial={{ scale: 0.8, opacity: 0, y: 40 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.8, opacity: 0, y: 40 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                <h3 className="text-lg font-bold mb-4 text-rose-700">Are you sure you want to logout?</h3>
                                <div className="flex justify-center gap-4 mt-4">
                                    <button
                                        onClick={() => { logout(); setShowLogoutConfirm(false); }}
                                        className="bg-rose-600 text-white px-6 py-2 rounded-lg border border-rose-700 hover:bg-rose-700 transition font-semibold shadow"
                                    >
                                        Yes
                                    </button>
                                    <button
                                        onClick={() => setShowLogoutConfirm(false)}
                                        className="bg-gray-200 px-6 py-2 rounded-lg border border-gray-400 hover:bg-gray-300 transition font-semibold shadow"
                                    >
                                        No
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Container>
    );
};

export default AccountPage;