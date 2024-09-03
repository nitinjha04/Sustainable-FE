import { useThemeContext } from "../context/ThemeProvider";
import { FcGoogle } from "react-icons/fc"; 
import AuthService from "../services/auth.service";
import { useForm } from "react-hook-form";
import { useState } from "react";
import TokenHelper from "../helpers/Token.helper";
import toast from "react-hot-toast";

const AuthModal = () => {
  const { loginModal, setLoginModal, modalType, toggleModalType, setUser } =
    useThemeContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");

  if (!loginModal) return null;

  const handleLogin = async (data) => {
    try {
      const response = await AuthService.login(data);
      if (response?.data) {
        console.log("Login successful:", response.data.result.user);
        TokenHelper.create(response.data.result.accessToken);
        setUser(response.data.result.user);

        setLoginModal(false);
        toast.success("Login successful");
      }
    } catch (err) {
      toast.error(err.response.data.message);
      console.error("Login failed:", err);
      setError("Login failed. Please check your credentials.");
    }
  };

  const handleSignup = async (data) => {
    try {
      const response = await AuthService.signup(data);
      if (response.data) {
        TokenHelper.create(response.data.result.accessToken);
        setUser(response.data.result.user);

        console.log("Signup successful:", response.data);
        setLoginModal(false); 

        toast.success("Signup successful");
      }
    } catch (err) {
      toast.error(err.response.data.message);

      console.error("Signup failed:", err);
      setError("Signup failed. Please try again.");
    }
  };

  const loginWithGoogle = async () => {
    try {
      await AuthService.loginWithGoogle();
    } catch (error) {
      console.error("Error initiating Google login:", error);
    }
  };

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-[22rem] lg:max-w-md w-full relative">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {modalType === "login" ? "Login" : "Sign Up"}
        </h2>
        <form
          onSubmit={handleSubmit(
            modalType === "login" ? handleLogin : handleSignup
          )}
        >
          {modalType === "signup" && (
            <div className="mb-4">
              <label className="block mb-2">Name</label>
              <input
                required
                type="text"
                className={`outline-none w-full p-2 border rounded ${
                  errors.name ? "border-red-500" : ""
                }`}
                {...register("name", {
                  required: modalType === "signup",
                  validate: (value) =>
                    value.trim() !== "" ||
                    "Name cannot be empty or only spaces",
                })}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>
          )}

          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              required
              type="email"
              className={`outline-none w-full p-2 border rounded ${
                errors.email ? "border-red-500" : ""
              }`}
              {...register("email", {
                required: "Email is required",
                validate: (value) =>
                  value.trim() !== "" || "Email cannot be empty or only spaces",
              })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div className="mb-6">
            <label className="block mb-2">Password</label>
            <input
              required
              type="password"
              className={`outline-none w-full p-2 border rounded ${
                errors.password ? "border-red-500" : ""
              }`}
              {...register("password", {
                required: "Password is required",
                validate: (value) =>
                  value.trim() !== "" ||
                  "Password cannot be empty or only spaces",
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>

          <button className="w-full bg-green-500 text-white py-2 rounded">
            {modalType === "login" ? "Login" : "Sign Up"}
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>

        <div className="mt-4">
          <button
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300"
          >
            <FcGoogle className="text-2xl mr-2" />
            {modalType === "login"
              ? "Login with Google"
              : "Sign Up with Google"}
          </button>
        </div>

        <p className="mt-4 text-center">
          {modalType === "login" ? (
            <>
              Don't have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={toggleModalType}
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={toggleModalType}
              >
                Login
              </span>
            </>
          )}
        </p>
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={() => setLoginModal(false)}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
