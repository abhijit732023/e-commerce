import React from "react";
import { BottomMenuBar, Header } from "../FilesPaths/all_path";

const Container = ({ children, className = "", style = {} }) => {
  return (
    <div className="h-screen w-full flex flex-col bg-gray-400/20 border-gray-100 overflow-hidden" style={{ ...style }}>
      {/* Header: 10% height */}
      <div className="flex-shrink-0 overflow-hidden" style={{ height: "8vh", minHeight: "62px" }}>
        <Header />
      </div>
      {/* Main Content: 80% height */}
      <main className={`flex-1 overflow-hidden relative z-0 rounded-xl mt-0.5 mb-0.5 ${className}`} style={{ minHeight: 0,height:'83vh' }}>
        {children}
      </main>
      {/* Bottom Menu: 10% height */}
      <div className="flex-shrink-0 overflow-hidden" style={{ height: "8vh", minHeight: "62px" }}>
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