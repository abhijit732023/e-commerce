import React from "react";

const Button = ({ children, onClick, className = "", type = "button", variant = "default" }) => {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-black text-white hover:bg-gray-800",
    destructive: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 text-black hover:bg-gray-100",
  };

  return (
    <button type={type} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
