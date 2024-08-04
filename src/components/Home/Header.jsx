// import { useState } from "react";
// import { FiMenu, FiChevronDown, FiChevronUp } from "react-icons/fi";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useLocation, Link } from "react-router-dom";
// import { logout, setUser } from "../../store/slices/aut.slice";
// import main_logo from "../../assets/home/logo/main_logo.png";
// import { IoPersonCircleOutline } from "react-icons/io5";
// import { AiOutlineLogout } from "react-icons/ai";
// import { motion, AnimatePresence } from "framer-motion";

// const Header = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { token, user } = useSelector((state) => state.auth);
//   const location = useLocation();

//   const handleNavigate = (path) => {
//     setMenuOpen(false);
//     navigate(path);
//   };

//   const handleDropdownToggle = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const handleSignOut = () => {
//     dispatch(logout());
//     navigate("/sign-in");
//   };

//   return (
//     <div className="bg-[#ffffff] min-w-[250px]">
//       <div className="flex mx-auto h-[10vh] md:h-[13vh] xl:h-[13vh] justify-between items-center px-[6vw]">
//         <div className="flex gap-4 items-center ">
//           <Link to='/'>
//             <img
//               src={main_logo}
//               alt="logo"
//               className="h-[45px] md:h-[55px] 2xl:h-[70px]"
//             />
//           </Link>
//           <h3 className="text-[#1F61BC] md:text-[25px] 2xl:text-[1.6rem] font-bold">
//             My Air Deal
//           </h3>
//         </div>
//         <div className="hidden md:flex gap-6 font-semibold 2xl:text-[1.2rem]">
//           {token ? (
//             <div className="flex gap-2 justify-center items-center text-gray-300">
//               <div
//                 className={`text-[#1F61BC] cursor-pointer font-bold ${location.pathname === '/' ? ' underline' : ''
//                   }`}
//                 onClick={() => handleNavigate("/")}
//               >
//                 Home
//               </div>
//               |
//               <div
//                 className={`text-[#1F61BC] cursor-pointer font-bold ${location.pathname === '/view-booking' ? ' underline' : ''
//                   }`}
//                 onClick={() => handleNavigate("/view-booking")}
//               >
//                 My Bookings
//               </div>
//               |
//               <div className="relative text-[#1F61BC]">
//                 <div
//                   className="flex items-center justify-center cursor-pointer"
//                   onClick={handleDropdownToggle}
//                 >
//                   <div
//                     className={`w-12 h-12 flex items-center justify-center rounded-full text-xl bg-gray-200 uppercase font-bold ${location.pathname === '/profile' ? 'border-2 border-[#1F61BC]' : ''
//                       }`}
//                   >
//                     {user?.firstName.charAt(0)}
//                   </div>
//                   {dropdownOpen ? (
//                     <FiChevronUp className="ml-2 font-extrabold" />
//                   ) : (
//                     <FiChevronDown className="ml-2 font-extrabold" />
//                   )}
//                 </div>
//                 <AnimatePresence>
//                   {dropdownOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       exit={{ opacity: 0, y: -10 }}
//                       className="absolute right-0 rounded-lg shadow-lg mt-2 bg-white border w-40 z-10"
//                     >
//                       <div
//                         className={`px-4 py-2 cursor-pointer hover:bg-gray-200 flex items-center justify-between ${location.pathname === '/profile' ? 'bg-gray-200' : ''
//                           }`}
//                         onClick={() => handleNavigate("/profile")}
//                       >
//                         <div>Profile</div>
//                         <IoPersonCircleOutline />
//                       </div>
//                       <div
//                         className="px-4 py-2 flex items-center cursor-pointer hover:bg-gray-200 justify-between"
//                         onClick={handleSignOut}
//                       >
//                         <div>Sign Out</div>
//                         <AiOutlineLogout />
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>
//             </div>
//           ) : (
//             <button
//               className="h-[55px] 2xl:p-2 text-white bg-black rounded-lg w-28"
//               onClick={() => handleNavigate("/sign-in")}
//             >
//               Login
//             </button>
//           )}
//         </div>
//         <div className="md:hidden flex items-center">
//           <FiMenu size={24} onClick={() => setMenuOpen(!menuOpen)} />
//         </div>
//       </div>
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             className="md:hidden absolute top-[10vh] left-0 right-0 bg-white shadow-lg z-20"
//           >
//             {token ? (
//               <div className="flex flex-col items-start p-4 gap-2">
//                 <div
//                   className={`text-[#1F61BC] cursor-pointer font-bold ${location.pathname === '/' ? ' underline' : ''
//                     }`}
//                   onClick={() => handleNavigate("/")}
//                 >
//                   Home
//                 </div>
//                 <div
//                   className={`text-[#1F61BC] cursor-pointer font-bold ${location.pathname === '/view-booking' ? ' underline' : ''
//                     }`}
//                   onClick={() => handleNavigate("/view-booking")}
//                 >
//                   My Bookings
//                 </div>
//                 <div
//                   className={`text-[#1F61BC] cursor-pointer font-bold ${location.pathname === '/profile' ? ' underline' : ''
//                     }`}
//                   onClick={() => handleNavigate("/profile")}
//                 >
//                   Profile
//                 </div>
//                 <div
//                   className="text-[#1F61BC] cursor-pointer font-bold"
//                   onClick={handleSignOut}
//                 >
//                   Sign Out
//                 </div>
//               </div>
//             ) : (
//               <div className="flex flex-col items-start p-4 gap-2">
//                 <button
//                   className="h-[55px] text-white bg-black rounded-lg w-full"
//                   onClick={() => handleNavigate("/sign-in")}
//                 >
//                   Login
//                 </button>
//               </div>
//             )}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Header;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { logout } from "../../store/slices/aut.slice";
import main_logo from "../../assets/home/logo/main_logo.png";
import { IoPersonCircleOutline } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Avatar from '../../assets/home/banner/avatar.png'

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    navigate("/sign-in");
    setMobileMenuOpen(false);
  };

  const NavLinks = ({ mobile = false }) => (
    <>
      <Link
        to="/"
        className={`font-semibold ${
          location.pathname === "/" ? "text-[#1F61BC]" : "text-gray-600"
        } ${mobile ? "block py-2" : ""}`}
        onClick={() => mobile && setMobileMenuOpen(false)}
      >
        Home
      </Link>
      <Link
        to="/view-booking"
        className={`font-semibold ${
          location.pathname === "/view-booking" ? "text-[#1F61BC]" : "text-gray-600"
        } ${mobile ? "block py-2" : ""}`}
        onClick={() => mobile && setMobileMenuOpen(false)}
      >
        My Bookings
      </Link>
    </>
  );

  return (
    <div className="bg-white shadow-md">
      <div className=" mx-auto px-4 py-2 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={main_logo} alt="logo" className="h-10 mr-2" />
          <h3 className="text-[#1F61BC] text-xl font-bold">My Air Deal</h3>
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          <NavLinks />
          {token ? (
            <div className="relative">
              <div
                className="flex items-center cursor-pointer"
                onClick={handleDropdownToggle}
              >
                <img
                  src={user?.image || Avatar}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = {Avatar};
                  }}
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <span className="ml-2 text-gray-700">{user?.firstName}</span>
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
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <IoPersonCircleOutline className="mr-2" />
                      Profile
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
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
              className="bg-[#1F61BC] text-white px-4 py-2 rounded-md"
              onClick={() => handleNavigate("/sign-in")}
            >
              Login
            </button>
          )}
        </div>
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <FiMenu size={24} />
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
            <div className="container mx-auto px-4 py-2">
              <NavLinks mobile />
              {token ? (
                <>
                  <Link
                    to="/profile"
                    className="block py-2 text-gray-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left py-2 text-gray-600"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  className="block w-full text-left py-2 text-[#1F61BC] font-semibold"
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