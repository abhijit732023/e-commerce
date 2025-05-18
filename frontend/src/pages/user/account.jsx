import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, warning } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useAuth, Container, Loader } from "../../FilesPaths/all_path";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
    const { user, logout } = useAuth();
    const [users, setUser] = useState('');
    const [userdata, setUserData] = useState('');
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const scrollRef = useRef(null);

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



    const handlelogout = () => {
        const confirmed = window.confirm("Are you sure you want to logout?");
        if (confirmed) {
            logout();
        }
    }

    useEffect(() => {
        if (user) {
            setUser(user._id);
            setUserData(user);
        }
    }, [user]);

    // Loader navigation handler for menu items
    const handleMenuClick = (path) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate(path);
        }, 1000);
    };

    // Optional: Scroll to top on mount
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, []);

    return (
        <Container>
            {loading && <Loader />}
            <div className="bg-gradient-to-br from-amber-50 via-white to-rose-50 min-h-screen overflow-scroll  shadow-xl flex flex-col">
                {/* Scrollable content */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-4 overflow-scroll pb-30 flex flex-col"
                    style={{
                        maxHeight: "calc(100vh - 2rem)",
                        minHeight: "400px",
                        scrollBehavior: "smooth"
                    }}
                >
                    <motion.h1
                        className="text-2xl font-bold mt-2 mb-6 text-rose-700 tracking-wide flex items-center gap-2"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        My Account
                    </motion.h1>

                    {/* Profile Section */}
                    <motion.div
                        className="bg-white p-6 rounded-2xl flex flex-col mb-6 shadow-lg border border-rose-100"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-500 via-amber-300 to-rose-300 text-white flex items-center justify-center font-bold text-2xl shadow">
                                {userdata.username ? userdata.username.charAt(0).toUpperCase() : 'U'}
                            </div>
                            <div className="flex-1 text-center sm:text-left">
                                <h2 className="font-semibold text-lg text-gray-800 break-words">{userdata.username}</h2>
                                <p className="text-sm text-gray-600 break-words">{userdata.email}</p>
                                <p className="text-sm text-gray-600 break-words">{userdata.phoneNumber || "Phone number"}</p>
                            </div>
                            <div className="w-full flex gap-3  justify-center sm:justify-center lg:justify-end">
                                <button
                                    onClick={() => handlelogout()}
                                    className=" sm:mt-0  bg-gradient-to-r from-rose-500 via-amber-400 to-rose-400 text-white px-5 py-2 rounded-full font-semibold shadow hover:from-rose-600 hover:to-amber-500 hover:scale-105 transition-all duration-200 flex items-center gap-2"
                                    style={{ alignSelf: "flex-start" }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                                    </svg>
                                    Logout
                                </button>
                                <button
                                    className="  text-blue-500 text-sm font-medium hover:underline hover:text-blue-700 transition border border-blue-200 px-6 py-2 rounded-full shadow self-start"
                                >
                                    Edit Profile
                                </button>

                            </div>
                        </div>
                    </motion.div>

                    {/* Menu Items */}
                    <div className="bg-white rounded-2xl overflow-scroll  shadow-lg divide-y border border-rose-100">
                        {menuItems.map((item, index) => (
                            <motion.div
                                key={index}
                                className="p-4 flex items-center justify-between hover:bg-rose-50 transition group"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.02 * index }}
                            >
                                <button
                                    type="button"
                                    onClick={() => handleMenuClick(item.Link)}
                                    className="flex justify-between items-center w-full text-left bg-transparent border-0 p-0 m-0"
                                >
                                    <div>
                                        <p className="font-medium text-gray-800 group-hover:text-rose-700 transition">{item.title}</p>
                                        {item.description && (
                                            <p className="text-xs text-gray-500">{item.description}</p>
                                        )}
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-rose-600 transition" />
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* Logout Button at the very end of scrollable content */}
                    <div className="mt-8 flex flex-col items-center">

                        <p className="text-xs text-gray-400 mt-2">Version 9.21.0 Build 3457</p>
                    </div>
                </div>


            </div>
        </Container>
    );
};

export default AccountPage;