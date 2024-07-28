import main_logo from "../../assets/home/logo/main_logo.png";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../store/slices/aut.slice";
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  console.log({ token });
  const handleNavigate = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <div className="bg-[#ffffff] min-w-[250px]">
      <div className="flex mx-auto h-[10vh] md:h-[13vh] xl:h-[13vh] justify-between items-center px-[6vw]">
        <div className="flex gap-4 items-center ">
          <img
            src={main_logo}
            alt="logo"
            className="h-[45px] md:h-[55px] 2xl:h-[70px]"
          />
          <h3 className="text-[#1F61BC] md:text-[25px] 2xl:text-[1.6rem] font-bold">
            My Air Deal
          </h3>
        </div>
        <div className="hidden md:flex gap-6 font-semibold 2xl:text-[1.2rem]">
          {token ? (
            <button
              className="h-[55px] 2xl:p-2 text-white bg-black rounded-lg w-28"
              onClick={() => dispatch(logout())}
            >
              Log out
            </button>
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
      {/* {menuOpen && (
        <div className="absolute top-[8vh] right-[6vw] bg-white shadow-lg rounded-lg p-4 z-50 md:hidden">
          <button
            onClick={() => handleNavigate("/sign-in")}
            className="block w-full text-left mb-2 p-2"
          >
            Login
          </button>
          {!token ? (
            <button
              // onClick={() => handleNavigate("/sign-up")}
              className="block w-full text-left text-white bg-black rounded-lg p-2"
            >
              Log out
            </button>
          ) : (
            <button
              onClick={() => handleNavigate("/sign-up")}
              className="block w-full text-left text-white bg-black rounded-lg p-2"
            >
              Sign up
            </button>
          )}
        </div>
      )} */}
    </div>
  );
};

export default Header;
