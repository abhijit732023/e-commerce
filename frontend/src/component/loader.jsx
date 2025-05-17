import React from 'react';
import { Bouncy } from 'ldrs/react';
import 'ldrs/react/Bouncy.css';

const Loader = () => {
  return (
    <div className="fixed inset-0  flex items-center justify-center bg-rose-100/20 backdrop-blur-sm ">
      <Bouncy
        size="80"
        speed="1.75"
        color="red"

      />
    </div>
  );
};

export default Loader;


