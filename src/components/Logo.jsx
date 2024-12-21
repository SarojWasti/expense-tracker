import React from 'react';

const Logo=() => {
  return (
    <div className={`relative w-12 h-12 md:w-24 md:h-24`}>
      <div className="absolute inset-0 bg-green-500 rounded-full"></div>
      <div className="absolute inset-1 bg-slate-800 rounded-full"></div>
      <div className="absolute inset-2 bg-green-500 rounded-full flex items-center justify-center">
        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-slate-800">
          <path d="M3 20h18L17 7l-5 9-4-5-5 9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
};

export default Logo;