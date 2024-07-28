import Logo from "../../assets/home/logo/main_logo.png";
import { FaFacebook } from "react-icons/fa";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="h-full md:h-[40vh] bg-[#1F61BC] max-w-[1900px] min-w-[250px] mx-auto text-white w-full ">
      <div
        className=" 
          justify-center  md:items-center flex flex-col md:flex-row h-full w-full "
      >
        <div className="w-[100%] md:w-[20%]  flex  md:flex-col justify-center items-center  md:gap-5 pt-2 ">
          <div
            className="flex justify-center items-center gap-2 w-[100%]
             "
          >
            <div className="flex">
              <img src={Logo} alt="" />
            </div>
            <div>My Air Deal</div>
          </div>

          <div className="flex gap-2 justify-center w-[50%] text-white text-2xl pl-9 mr-1">
            <div>
              <FaFacebook />
            </div>
            <div>
              <BiLogoInstagramAlt />
            </div>
            <div>
              <FaYoutube />
            </div>
            <div>
              <FaTwitter />
            </div>
          </div>
        </div>
        <div className="flex   md:w-3/4 text-center md:text-start pb-6 sm:pb-0 ">
          <div className="flex flex-col  md:flex-row md:gap-3 justify-evenly lg:gap-6 w-[100%]">
            <div className="text-white font-light flex flex-col gap-1  ">
              <h2 className="font-semibold  mt-5 ">Our Destinations</h2>
              <h3>Canada</h3>
              <h3>Alaska</h3>
              <h3>France</h3>
              <h3>Iceland</h3>
            </div>
            <div className="text-white font-light flex flex-col gap-1 ">
              <h2 className="font-semibold  mt-5 ">Our Activities</h2>
              <h3>Northern Lights</h3>
              <h3>Cruising & sailing</h3>
              <h3>Multi-activites</h3>
              <h3>Kayaing</h3>
            </div>
            <div className="text-white font-light flex flex-col gap-1 ">
              <h2 className="font-semibold  mt-5 ">Travel Blogs</h2>
              <h3>Bali Travel Guide</h3>
              <h3>Sri Lanka Travel Guide</h3>
              <h3>Peru Travel Guide</h3>
              <h3>Bali Travel Guide</h3>
            </div>
            <div className="text-white font-light flex flex-col gap-1 ">
              <h2 className="font-semibold  mt-5 ">About Us</h2>
              <h3>Our Story</h3>
              <h3>Work with us</h3>
            </div>
            <div className="text-white  font-light flex flex-col gap-1 md:pr-1">
              <h2 className="font-semibold  mt-5 ">Contact us</h2>
              <h3>Our Story</h3>
              <h3>Work with us</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
