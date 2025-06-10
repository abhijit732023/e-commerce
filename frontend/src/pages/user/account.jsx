import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useAuth, Container, Loader, ENV_File } from "../../FilesPaths/all_path";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AccountPage = () => {
    const { user, logout, login } = useAuth();
    const [users, setUser] = useState('');
    const [userdata, setUserData] = useState('');
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        mobileNumber: ''
    });

    const navigate = useNavigate();
    const scrollRef = useRef(null);

    const menuItems = [
        { title: "Orders", Link: `/order/${users}` },
        { title: "Customer Care", Link: "/contact-us" },
        { title: "Address", Link: `/address/${users}` },
        { title: "Notifications", Link: "/notifications" },
        { title: "How To Return", Link: "/refund-and-returns" },
        { title: "Terms & Conditions", Link: "/terms-and-conditions" },
        { title: "Returns & Refunds Policy", Link: "/refund-and-returns" },
        { title: "We Respect Your Privacy", Link: "/" },
        { title: "Who We Are", Link: "/about-company" },
    ];

    useEffect(() => {
        if (user) {
            setUser(user._id);
            setUserData(user);
            setFormData({
                username: user.username || '',
                email: user.email || '',
                mobileNumber: user.mobileNumber || ''
            });
        }
    }, [user]);

    const handlelogout = () => {
        const confirmed = window.confirm("Are you sure you want to logout?");
        if (confirmed) {
            logout();
        }
    };

    const handleMenuClick = (path) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate(path);
        }, 1000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.username.trim()) {
            alert("Username is required");
            return;
        }
        if (!formData.email.trim()) {
            alert("Email is required");
            return;
        }
        // Simple email regex validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert("Please enter a valid email address");
            return;
        }
        const mobileNumberStr = String(formData.mobileNumber || '');
        if (!mobileNumberStr.trim()) {
            alert("Mobile number is required");
            return;
        }
        // Mobile number validation: digits only, length 10-15
        const mobileRegex = /^\d{10,15}$/;
        if (!mobileRegex.test(mobileNumberStr)) {
            alert("Please enter a 10 digit valid mobile number ");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.put(
                `${ENV_File.backendURL}/update/${users}`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200) {
                alert("Profile updated successfully");
                setUserData(response.data.updatedUser || formData);
                login(response.data.updatedUser || formData);
                console.log("Updated userdata:", response.data.updatedUser || formData);
                setEditMode(false);
            } else {
                alert(response.data.message || "Update failed");
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Something went wrong");
        }

        setLoading(false);
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, []);

    return (
        <Container>
            {loading && <Loader />}
            <div className="bg-gradient-to-br  from-amber-50 via-white to-rose-50 overflow-scroll shadow-xl flex flex-col" style={{ height: "84vh" }}>
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-4 pb-30 flex flex-col"
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
                        Account
                    </motion.h1>

                    {/* Profile Card */}
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
                                <p className="text-sm text-gray-600 break-words">{userdata.mobileNumber || "Phone number"}</p>
                            </div>
                            <div className="w-full flex gap-3 justify-center sm:justify-center lg:justify-end">
                                <button
                                    onClick={handlelogout}
                                    className="bg-gradient-to-r from-rose-500 via-amber-400 to-rose-400 text-white px-5 py-2 rounded-full font-semibold shadow hover:from-rose-600 hover:to-amber-500 hover:scale-105 transition-all duration-200 flex items-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                                    </svg>
                                    Logout
                                </button>
                                <button
                                    onClick={() => setEditMode(true)}
                                    className="text-blue-500 text-sm font-medium hover:underline hover:text-blue-700 transition border border-blue-200 px-6 py-2 rounded-full shadow self-start"
                                >
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Edit Form */}
                    {editMode && (
                        <motion.form
                            onSubmit={handleSubmit}
                            className="bg-white p-6 rounded-2xl shadow-lg border border-rose-100 mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <h3 className="text-lg font-semibold mb-4 text-rose-700">Edit Profile</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-rose-500 focus:border-rose-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-rose-500 focus:border-rose-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                                    <input
                                        type="text"
                                        name="mobileNumber"
                                        value={formData.mobileNumber}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-rose-500 focus:border-rose-500"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex gap-4 mt-6">
                                <button
                                    type="submit"
                                    className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600"
                                >
                                    Save Changes
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditMode(false)}
                                    className="text-gray-500 hover:underline"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.form>
                    )}

                    {/* Menu List */}
                    <div className="bg-white rounded-2xl shadow-lg divide-y border border-rose-100">
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
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-rose-600 transition" />
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="mt-8 flex flex-col items-center">
                        <p className="text-xs text-gray-400 mt-2">Version 9.21.0 Build 3457</p>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default AccountPage;
