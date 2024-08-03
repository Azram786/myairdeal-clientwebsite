import { useState } from "react";
import { FiMenu, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { logout, setUser } from "../../store/slices/aut.slice";
import main_logo from "../../assets/home/logo/main_logo.png";
import { IoPersonCircleOutline } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const location = useLocation();

  const handleNavigate = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/sign-in");
  };

  return (
    <div className="bg-[#ffffff] min-w-[250px]">
      <div className="flex mx-auto h-[10vh] md:h-[13vh] xl:h-[13vh] justify-between items-center px-[6vw]">
        <div className="flex gap-4 items-center ">
          <Link to='/'>
            <img
              src={main_logo}
              alt="logo"
              className="h-[45px] md:h-[55px] 2xl:h-[70px]"
            />
          </Link>
          <h3 className="text-[#1F61BC] md:text-[25px] 2xl:text-[1.6rem] font-bold">
            My Air Deal
          </h3>
        </div>
        <div className="hidden md:flex gap-6 font-semibold 2xl:text-[1.2rem]">
          {token ? (
            <div className="flex gap-2 justify-center items-center text-gray-300">
              <div
                className={`text-[#1F61BC] cursor-pointer font-bold ${location.pathname === '/' ? ' underline' : ''
                  }`}
                onClick={() => handleNavigate("/")}
              >
                Home
              </div>
              |
              <div
                className={`text-[#1F61BC] cursor-pointer font-bold ${location.pathname === '/view-booking' ? ' underline' : ''
                  }`}
                onClick={() => handleNavigate("/view-booking")}
              >
                My Bookings
              </div>
              |
              <div className="relative text-[#1F61BC]">
                <div
                  className="flex items-center justify-center cursor-pointer"
                  onClick={handleDropdownToggle}
                >
                  <div
                    className={`w-12 h-12 flex items-center justify-center rounded-full text-xl bg-gray-200 uppercase font-bold ${location.pathname === '/profile' ? 'border-2 border-[#1F61BC]' : ''
                      }`}
                  >
                    {user?.firstName.charAt(0)}
                  </div>
                  {dropdownOpen ? (
                    <FiChevronUp className="ml-2 font-extrabold" />
                  ) : (
                    <FiChevronDown className="ml-2 font-extrabold" />
                  )}
                </div>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 rounded-lg shadow-lg mt-2 bg-white border w-40 z-10"
                    >
                      <div
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-200 flex items-center justify-between ${location.pathname === '/profile' ? 'bg-gray-200' : ''
                          }`}
                        onClick={() => handleNavigate("/profile")}
                      >
                        <div>Profile</div>
                        <IoPersonCircleOutline />
                      </div>
                      <div
                        className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-200 justify-between"
                        onClick={handleSignOut}
                      >
                        <div>Sign Out</div>
                        <AiOutlineLogout />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <button
              className="h-[55px] 2xl:p-2 text-white bg-black rounded-lg w-28"
              onClick={() => handleNavigate("/sign-in")}
            >
              Login
            </button>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <FiMenu size={24} onClick={() => setMenuOpen(!menuOpen)} />
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden absolute top-[10vh] left-0 right-0 bg-white shadow-lg z-20"
          >
            {token ? (
              <div className="flex flex-col items-start p-4 gap-2">
                <div
                  className={`text-[#1F61BC] cursor-pointer font-bold ${location.pathname === '/' ? ' underline' : ''
                    }`}
                  onClick={() => handleNavigate("/")}
                >
                  Home
                </div>
                <div
                  className={`text-[#1F61BC] cursor-pointer font-bold ${location.pathname === '/view-booking' ? ' underline' : ''
                    }`}
                  onClick={() => handleNavigate("/view-booking")}
                >
                  My Bookings
                </div>
                <div
                  className={`text-[#1F61BC] cursor-pointer font-bold ${location.pathname === '/profile' ? ' underline' : ''
                    }`}
                  onClick={() => handleNavigate("/profile")}
                >
                  Profile
                </div>
                <div
                  className="text-[#1F61BC] cursor-pointer font-bold"
                  onClick={handleSignOut}
                >
                  Sign Out
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-start p-4 gap-2">
                <button
                  className="h-[55px] text-white bg-black rounded-lg w-full"
                  onClick={() => handleNavigate("/sign-in")}
                >
                  Login
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Header;
