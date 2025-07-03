import React from 'react';

function Loader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white z-50">
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-xl">Loading...</p>
    </div>
  );
}

export default Loader;