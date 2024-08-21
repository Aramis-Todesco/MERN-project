// src/context/ScrollContext.jsx
import { createContext, useContext, useRef } from "react";

const ScrollContext = createContext();

const ScrollProvider = ({ children }) => {
  const scrollPositionRef = useRef(0);

  return (
    <ScrollContext.Provider
      value={{
        scrollPositionRef,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

const useScroll = () => {
  return useContext(ScrollContext);
};

export { ScrollProvider, useScroll };
