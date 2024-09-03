import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

export function ThemeProvider({ children }) {
  const [user, setUser] = useState();
  const [loginModal, setLoginModal] = useState(false);
  const [modalType, setModalType] = useState("login"); // new state for modal type

  useEffect(() => {
    const apiData = async () => {
      // fetch current user
      //   const data = await userService.getCurrentUser();
      //   console.log({ data });
      //   if (!user && data?.data?.result) {
      //     setUser(data.data.result);
      //   }
    };

    apiData();
  }, []);

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
