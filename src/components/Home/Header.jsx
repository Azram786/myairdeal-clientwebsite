import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Logo from "../../assets/home/logo/FinalLogo.jpg";
import {
  clearResent,
  clearUser,
  logout,
  setIsaModifySearch,
  setUser,
} from "../../store/slices/aut.slice";
import main_logo from "../../assets/home/logo/main_logo.png";
import { IoNotificationsCircle, IoPersonCircleOutline } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Avatar from "../../assets/home/banner/avatar.png";
import axios from "axios";
import ReactToast from "../util/ReactToast";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference to the dropdown element
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const location = useLocation();

  const handleNavigate = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSignOut = () => {
    dispatch(logout());
    dispatch(clearResent());
    dispatch(clearUser());
    localStorage.clear();
    navigate("/sign-in");
    setMobileMenuOpen(false);
  };

  const getProfileData = async () => {
    try {
      if (token) {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}user/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const profileData = {
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          phone: ` ${response.data.phone}`,
          country: {
            dialCode: response.data.country.dialCode,
            countryCode: response.data.country.countryCode,
            countryName: response.data.country.countryName,
          },
        };
        dispatch(setUser(profileData));
      }
    } catch (error) {
      ReactToast(error.message);
    }
  };

  useEffect(() => {
    getProfileData();
  }, [token]);

  // Add event listener to detect clicks outside of the dropdown
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
  }, [dropdownRef]);

  const NavLinks = ({ mobile = false }) => (
    <>
      <Link
        to="/"
        className={`font-medium py-2 text-center border-r border-[#D7B56D]  px-3 ${
          location.pathname === "/"
            ? "bg-[#D7B56D] text-[#1B1D29]"
            : "text-[#D7B56D]"
        } ${mobile ? "block py-2" : ""}`}
        onClick={() => {
          dispatch(setIsaModifySearch(false));
          mobile && setMobileMenuOpen(false);
        }}
      >
        Home
      </Link>
      <Link
        to="/enquiry"
        className={`font-medium py-2 text-center border-r border-[#D7B56D]  px-3 ${
          location.pathname === "/enquiry"
            ? "bg-[#D7B56D] text-[#1B1D29]"
            : "text-[#D7B56D]"
        } ${mobile ? "block py-2" : ""}`}
        onClick={() => mobile && setMobileMenuOpen(false)}
      >
        {/* Notifications */}
        Enquiry
        {/* <IoNotificationsCircle className="text-3xl " /> */}
      </Link>
      {token && user && (
        <>
          <Link
            to="/view-booking"
            className={`font-medium py-2 border-[#D7B56D] border-r px-3 ${
              location.pathname === "/view-booking"
                ? "bg-[#D7B56D] text-[#1B1D29]"
                : "text-[#D7B56D]"
            } ${mobile ? "block py-2" : ""}`}
            onClick={() => mobile && setMobileMenuOpen(false)}
          >
            My Bookings
          </Link>
        </>
      )}
    </>
  );

  return (
    <div className="bg-[#1B1D29] shadow-md fixed top-0 left-0 w-full z-50 ">
      <div className=" mx-auto px-8 py-2 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          {/* <img src={main_logo} alt="logo" className="h-10 mr-2" /> */}
          <h3 className="text-white text-2xl font-bold">
            My <span className="text-[#D7B56D]">Air</span> Deal
          </h3>
        </Link>
        <div className="hidden md:flex items-center ">
          <NavLinks />
          {token && user ? (
            <div className="relative px-1" ref={dropdownRef}>
              <div
                className="flex items-center cursor-pointer ml-2"
                onClick={handleDropdownToggle}
              >
                <img
                  src={user?.image || Avatar}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = { Avatar };
                  }}
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <span className="ml-2 text-white">{user?.firstName}</span>
              </div>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                  >
                    <Link
                      to="/profile"
                      className="px-4 py-2 text-sm text-black hover:bg-gray-100 flex items-center"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <IoPersonCircleOutline className="mr-2" />
                      Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className=" text-left px-4 py-2 text-sm text-black hover:bg-gray-100 flex items-center"
                    >
                      <AiOutlineLogout className="mr-2" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              className="bg-[#D7B56D] text-[#1B1D29] px-4 py-2 cursor-pointer mx-4 rounded-md"
              onClick={() => handleNavigate("/sign-in")}
            >
              Login
            </button>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <FiMenu className="text-[#D7B56D]" size={24} />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="flex flex-col text-center flex-wrap mx-auto px-4 ">
              <NavLinks mobile />
              {token && user ? (
                <div className="flex  w-full flex-col justify-center items-center text-sm  gap-4">
                  <Link
                    to="/profile"
                    className="block py-2 text-[#1B1D29]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-center py-2 text-[#1B1D29]"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  className="block w-full text-center py-2 bg-[#D7B56D]  text-black font-semibold"
                  onClick={() => handleNavigate("/sign-in")}
                >
                  Login
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
