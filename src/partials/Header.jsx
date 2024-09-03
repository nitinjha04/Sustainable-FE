import React, { useEffect, useRef, useState } from "react";
import { FaSearch, FaRegUser, FaPlus } from "react-icons/fa";
import { useThemeContext } from "../context/ThemeProvider";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import TokenHelper from "../helpers/Token.helper";

const Header = () => {
  const params = useParams();

  const navigate = useNavigate();
  const { setLoginModal, setModalType, user, setUser } = useThemeContext();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    if (!user) {
      setModalType("login");
      setLoginModal(true);
      return;
    }
    setDropdownOpen(!dropdownOpen);
  };

  const dropdownRef = useRef(null);

  const handleGoogleCallback = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const accessToken = urlParams.get("token");

      if (accessToken) {
        TokenHelper.create(accessToken);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error handling Google authentication callback:", error);
    }
  };

  useEffect(() => {
    handleGoogleCallback();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setDropdownOpen]);

  return (
    <div className="text-lg z-10 font-normal w-full items-center lg:px-12 px-6 my-auto flex justify-between h-14 lg:h-20 bg-white shadow-sm border-[1px] border-solid">
      <Link to="/" className="text-2xl">
        {/* Sustainable */}
        <img className=" h-12 z-10" src="/sustainable-header.png" alt="" />
      </Link>

      <div className="flex gap-4 items-center relative">
        <FaPlus
          onClick={toggleDropdown}
          className="text-xl cursor-pointer"
          title="Add New Content"
        />
        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-32 top-5 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10"
          >
            <ul className="py-2">
              <Link to="/add?type=tip">
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setDropdownOpen(false);
                  }}
                >
                  Add Tips
                </li>
              </Link>
              <Link to="/add?type=product">
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setDropdownOpen(false);
                  }}
                >
                  Add Product
                </li>
              </Link>
              <Link to="/add?type=article">
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setDropdownOpen(false);
                  }}
                >
                  Add Article
                </li>
              </Link>
              {user && (
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    const token = TokenHelper.get();
                    if (token) {
                      TokenHelper.delete();
                      setUser();
                      navigate("/");
                      setDropdownOpen(false);
                    }
                  }}
                >
                  Sign Out
                </li>
              )}
            </ul>
          </div>
        )}
        {user && (
          <>
            <span>{user.name}</span>
          </>
        )}
        <FaRegUser
          onClick={() => {
            if (user) return;
            setModalType("login"); // Set to login or signup
            setLoginModal(true); // Open the modal
          }}
          className="text-xl cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Header;
