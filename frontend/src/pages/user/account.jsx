import React,{useState,useEffect} from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useAuth } from "../../FilesPaths/all_path";

const menuItems = [
    { title: "Orders" },
    { title: "Customer Care" },
    { title: "Invite Friends & Earn", description: "You get ₹100 SuperCash for every friend" },
    { title: "AJIO Wallet", description: "Add Gift Card | Manage rewards and refunds" },
    { title: "Saved Cards" },
    { title: "My Rewards" },
    { title: "Address" },
    { title: "Notifications" },
    { title: "Return Creation Demo" },
    { title: "How To Return" },
    { title: "How Do I Redeem My Coupon?" },
    { title: "Terms & Conditions" },
    { title: "Promotions Terms & Conditions" },
    { title: "Returns & Refunds Policy" },
    { title: "We Respect Your Privacy" },
    { title: "Fees & Payments" },
    { title: "Who We Are" },
    { title: "Join Our Team" },
];

const AccountPage = () => {

    const { user,logout } = useAuth();
    const [users, setUser] = useState('');
    useEffect(() => {
        if (user) {
            console.log('user', user);
            setUser(user);  // Set the user ID if the user is logged in
        }
    }, [user]);


    return (
        <div className="bg-gray-50 min-h-screen p-4 pb-24">
            <motion.h1
                className="text-xl font-semibold mb-4"
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
                        <div>
                            <p className="font-medium">{item.title}</p>
                            {item.description && (
                                <p className="text-xs text-gray-500">{item.description}</p>
                            )}
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                    </motion.div>
                ))}
            </div>

            {/* Logout Button */}
            <div className="mt-6 flex flex-col items-center">
                <button onClick={logout} className="border px-6 py-2 rounded-full text-red-500 font-medium hover:bg-red-50 transition">
                    Logout
                </button>
                <p className="text-xs text-gray-400 mt-2">Version 9.21.0 Build 3457</p>
            </div>
        </div>
    );
};

export default AccountPage;
