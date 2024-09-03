import { createContext, useContext, useEffect, useState } from "react";
import UserService from "../services/user.service";
import CustomLoader from "../components/CustomLoader";

const Context = createContext();

export function ContextProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [loginModal, setLoginModal] = useState(false);
  const [modalType, setModalType] = useState("login");

  const [postDetails, setPostDetails] = useState();
  const [shareModal, setShareModal] = useState(false);

  const toggleModalType = () => {
    setModalType((prevType) => (prevType === "login" ? "signup" : "login"));
  };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      setLoading(true);
      if (!user) {
        console.log("saving");
        try {
          const response = await UserService.getCurrentUser();
          if (response.data && response.data.result) {
            console.log(response.data.result);
            setUser(response.data.result);
          }
        } catch (error) {
          console.error("Failed to fetch current user", error);
        }
      }
      setLoading(false);
    };

    fetchCurrentUser();
  }, [user, setUser]);

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
      {loading ? (
        <div className=" my-auto flex justify-center items-center w-full h-screen">
          {" "}
          <CustomLoader loading={loading} />
        </div>
      ) : (
        children
      )}
    </Context.Provider>
  );
}

export function useStateContext() {
  return useContext(Context);
}
