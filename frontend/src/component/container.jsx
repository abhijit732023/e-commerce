import React from "react";
import { BottomMenuBar, Header } from "../FilesPaths/all_path";

const Container = ({ children, className = "", style = {} }) => {
  return (
    <div
      className="h-screen w-full flex flex-col bg-gray-400/20 border-gray-100"
      style={{ ...style }}
    >
      {/* Header: fixed height */}
      <div
        className="flex-shrink-0 overflow-hidden"
        style={{ height: 62 /* fixed px height for consistency */ }}
      >
        <Header />
      </div>

      {/* Main Content: flex-grow to fill remaining space, scrollable */}
      <main
        className={`flex-grow overflow-y-auto relative rounded-xl mt-1 mb-1 ${className}`}
        style={{ minHeight: 0 }}
      >
        {children}
      </main>

      {/* Bottom Menu: fixed height */}
      <div
        className="flex-shrink-0 overflow-hidden"
        style={{ height: 62 /* fixed px height for consistency */ }}
      >
        <BottomMenuBar />
      </div>
    </div>
  );
};

export default Container;


// import React from "react";
// import { BottomMenuBar,Header} from "../FilesPaths/all_path";
// const Container = ({ children, className = "h-screen w-full border-gray-100 bg-gray-400/20 overflow-hidden ", style = {} }) => {
//     return (
//     <div className="overflow-hidden">
//       <Header/>
//       <div className={`relative ${className} z-0`} style={style}>
//       {children}
//        </div>
//       <BottomMenuBar/>
//     </div>
//     );
//   };

// export default Container;