import React from "react";
const Container = ({ children, className = "h-screen w-full", style = {} }) => {
    return (
      <div className={`relative ${className}`} style={style}>
      {children}
    </div>
    );
  };

export default Container;