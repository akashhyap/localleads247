import React, { createContext, useState, useContext, useEffect } from "react";

const TOCContext = createContext();

const isMobileDevice = () => {
  // Define the max width for mobile devices
  const mobileWidthThreshold = 768;
  return window.innerWidth <= mobileWidthThreshold;
};

export const TOCProvider = ({ children }) => {
  const [isTOCVisible, setIsTOCVisible] = useState(false);

  const toggleTOC = () => {
    // Allow toggle only for mobile devices
    if (isMobileDevice()) {
      setIsTOCVisible(!isTOCVisible);
    }
  };

  const hideTOC = () => {
    if (isMobileDevice()) {
      setIsTOCVisible(false);
    }
  };

  useEffect(() => {
    // Apply the overflow style only if isTOCVisible is true and on mobile devices
    if (isTOCVisible && isMobileDevice()) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }

    // Cleanup function to reset the overflow style
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [isTOCVisible]);

  return (
    <TOCContext.Provider value={{ isTOCVisible, toggleTOC, hideTOC }}>
      {children}
    </TOCContext.Provider>
  );
};

export const useTOC = () => useContext(TOCContext);
