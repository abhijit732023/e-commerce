import React from "react";
import { BottomMenuBar, Header } from "../FilesPaths/all_path";

const Container = ({ children, className = "", style = {} }) => {
  return (
    <div
      className="w-full flex flex-col bg-gray-400/20 border-gray-100"
      style={{
        height: "100dvh", // mobile-safe height
        paddingBottom: "10%", // prevent content from hiding under BottomMenu
        ...style,
      }}
    >
      {/* Header: 8% */}
      <div className="flex-none" style={{ height: "8%" }}>
        <Header />
      </div>

      {/* Main Content */}
      <main
        className={`flex-grow overflow-auto relative rounded-md ${className}`}
      >
        {children}
      </main>

      {/* Fixed Bottom Menu */}
      <div
        className="fixed bottom-0 left-0 w-full z-10"
        style={{ height: "10%" }}
      >
        <BottomMenuBar />
      </div>
    </div>
  );
};

export default Container;
