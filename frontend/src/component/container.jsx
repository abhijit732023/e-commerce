import React from "react";
import { BottomMenuBar,Header} from "../FilesPaths/all_path";
const Container = ({ children, className = "h-screen w-full border-gray-100 bg-gray-400/20 overflow-hidden ", style = {} }) => {
    return (
    <div className="overflow-hidden">
      <Header/>
      <div className={`relative ${className} z-0`} style={style}>
      {children}
       </div>
      <BottomMenuBar/>
    </div>
    );
  };

export default Container;