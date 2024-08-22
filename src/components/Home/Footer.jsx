import Logo from "../../assets/home/logo/main_logo.png";
import { FaFacebook } from "react-icons/fa";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="h-full bg-[#1B1D29] mx-auto text-white w-full  py-8">
      <div
        className=" 
          justify-center  md:items-center flex flex-col md:flex-row h-full w-full "
      >
        <div className=" w-full md:w-[15%] flex  md:flex-col justify-center items-center  md:gap-5 pt-2 mr-2 ">
          <div
            className="flex justify-center px-4 md:px-4   gap-2 w-[100%]
             "
          >
            {/* <div className="flex">
              <img src={Logo} alt="" />
            </div> */}

            <div className="text-2xl font-bold">
              My <span className="text-[#D7B56D]">Air</span> Deal
            </div>
          </div>

          <div className="cursor-pointer gap-4  px-2 grid  grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 justify-start w-[60%] text-white text-2xl   mr-1">
            <div>
              <FaFacebook className="hover:text-[#D7B56D]" />
            </div>
            <div>
              <BiLogoInstagramAlt className="hover:text-[#D7B56D]" />
            </div>
            <div>
              <FaYoutube className="hover:text-[#D7B56D]" />
            </div>
            <div>
              <FaTwitter className="hover:text-[#D7B56D]" />
            </div>
          </div>
        </div>
        <div className="flex md:w-3/4 text-center md:text-start pb-6 sm:pb-0 ">
          <div className="grid lg:grid-cols-5  gap-4 md:grid-cols-4 sm:grid-cols-3 px-6 py-4 md:px-0 grid-cols-2 text-start  w-full place-content-start">
            <div className="  font-light flex flex-col gap-1  ">
              <h2 className=" font-semibold text-[#D7B56D]  mt-5 ">
                Our Destinations
              </h2>
              <div className="cursor-pointer text-sm">Canada</div>
              <div className=" cursor-pointer text-sm"> Alaska</div>
              <div className="cursor-pointer text-sm">France</div>
              <div className="cursor-pointer text-sm">Iceland</div>
            </div>
            <div className="text-white font-light flex flex-col gap-1 ">
              <h2 className="font-semibold  text-[#D7B56D]  mt-5 ">
                Our Activities
              </h2>
              <div className=" cursor-pointer text-sm">Northern Lights</div>
              <div className="cursor-pointer text-sm">Cruising & sailing</div>
              <div className="cursor-pointer text-sm">Multi-activites</div>
              <div className="cursor-pointer text-sm">Kayaing</div>
            </div>
            <div className="text-white font-light flex flex-col gap-1 ">
              <h2 className="font-semibold  text-[#D7B56D]   mt-5 ">
                Travel Blogs
              </h2>
              <div className="cursor-pointer text-sm">Bali Travel Guide</div>
              <div className="cursor-pointer text-sm">
                Sri Lanka Travel Guide
              </div>
              <div className="cursor-pointer text-sm">Peru Travel Guide</div>
              <div className="cursor-pointer text-sm">Bali Travel Guide</div>
            </div>
            <div className="text-white font-light flex flex-col gap-1 ">
              <h2 className="font-semibold  mt-5  text-[#D7B56D]  ">
                About Us
              </h2>
              <div className="cursor-pointer text-sm">Our Story</div>
              <div className="cursor-pointer text-sm">Work with us</div>
            </div>
            <div className="text-white  font-light flex flex-col gap-1 md:pr-1">
              <h2 className="font-semibold  text-[#D7B56D]   mt-5 ">
                Contact us
              </h2>
              <div className="cursor-pointer text-sm">Our Story</div>
              <div className="cursor-pointer text-sm">Work with us</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
