import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

export function ContextProvider({ children }) {
  const [user, setUser] = useState();
  const [loginModal, setLoginModal] = useState(false);
  const [modalType, setModalType] = useState("login");

  const [postDetails, setPostDetails] = useState();
  const [shareModal, setShareModal] = useState(false);

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
        shareModal,
        setShareModal,
        postDetails,
        setPostDetails,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useStateContext() {
  return useContext(Context);
}
