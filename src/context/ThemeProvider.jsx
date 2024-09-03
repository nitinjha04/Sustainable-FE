import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

export function ThemeProvider({ children }) {
  const [user, setUser] = useState();
  const [loginModal, setLoginModal] = useState(false);
  const [modalType, setModalType] = useState("login"); 

  const toggleModalType = () => {
    setModalType((prevType) => (prevType === "login" ? "signup" : "login"));
  };

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        loginModal,
        setLoginModal,
        modalType,
        setModalType,
        toggleModalType,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useThemeContext() {
  return useContext(Context);
}
