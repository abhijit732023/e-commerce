import React from "react";
import { BottomMenuBar,Header} from "../FilesPaths/all_path";
const Container = ({ children, className = "h-screen w-full border-gray-100 bg-gray-400/20 overflow-y-scroll", style = {} }) => {
    return (
      <div className={`relative ${className} pb-10`} style={style}>
      <Header/>
      {children}
      <BottomMenuBar/>
    </div>
    );
  };

export default Container;