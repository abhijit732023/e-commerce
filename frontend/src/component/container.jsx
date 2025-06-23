import React from "react";
import { BottomMenuBar, Header } from "../FilesPaths/all_path";

const Container = ({ children, className = "", style = {} }) => {
  return (
    <div
      className="h-screen w-full flex flex-col bg-gray-400/20 border-gray-100"
      style={{ ...style }}
    >
      {/* Header: 8% height */}
      <div className="overflow-hidden" style={{ height: "8vh" }}>
        <Header />
      </div>

      {/* Main Content: 86% height */}
      <main
        className={`overflow-auto relative rounded-md ${className}`}
        style={{ height: "84vh" }}
      >
        {children}
      </main>

      {/* Bottom Menu: 8% height */}
      <div className="overflow-hidden" style={{ height: "10vh" }}>
        <BottomMenuBar />
      </div>
    </div>
  );
};

export default Container;