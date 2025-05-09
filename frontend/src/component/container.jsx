import React from "react";
const Container = ({ children, className = "h-screen w-full border-gray-100 overflow-y-scroll", style = {} }) => {
    return (
      <div className={`relative ${className}`} style={style}>
      {children}
    </div>
    );
  };

export default Container;