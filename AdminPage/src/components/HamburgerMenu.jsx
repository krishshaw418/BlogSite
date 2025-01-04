import React, { useState } from 'react';

// Forward ref to allow external ref access
const HamburgerMenu = React.forwardRef(({ onClick }, ref) => {
  return (
    <div ref={ref}>
      {/* Hamburger Icon */}
      <button
        onClick={onClick}
        className="flex flex-col items-center justify-center space-y-1 p-2 focus:outline-none"
      >
        <span className="w-6 h-1 bg-black"></span>
        <span className="w-6 h-1 bg-black"></span>
        <span className="w-6 h-1 bg-black"></span>
      </button>
    </div>
  );
});

// Helpful for debugging to give the component a name
HamburgerMenu.displayName = 'HamburgerMenu';

export default HamburgerMenu;
