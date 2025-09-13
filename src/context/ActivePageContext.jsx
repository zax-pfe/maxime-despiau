import { createContext, useState } from "react";
import gsap from "gsap";

const ActivePageContext = createContext({});

const ActivePageProvider = ({ children }) => {
  const [activePage, setActivePage] = useState("");

  return (
    <ActivePageContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </ActivePageContext.Provider>
  );
};

export { ActivePageContext, ActivePageProvider };
