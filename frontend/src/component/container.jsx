import React from "react";
import { BottomMenuBar, Header } from "../FilesPaths/all_path";

const Container = ({ children, className = "", style = {} }) => {
  return (
    <div
      className="w-full flex flex-col bg-gray-400/20 border-gray-100"
      style={{
        height: "100dvh", // Use device viewport height (mobile-safe)
        ...style,
      }}
    >
      {/* Header: 8% */}
      <div className="flex-none" style={{ height: "8%" }}>
        <Header />
      </div>

      {/* Main Content: 82% */}
      <main
        className={`flex-grow overflow-auto relative rounded-md ${className}`}
        style={{ height: "80%" }}
      >
        {children}
      </main>

      {/* Bottom Menu: 10% */}
      <div className="flex-none z-10" style={{ height: "10%" }}>
        <BottomMenuBar />
      </div>
    </div>
  );
};

export default Container;
