import Logo from "../../assets/home/logo/main_logo.png";
import { FaFacebook } from "react-icons/fa";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="h-full md:h-[40vh] bg-[#1F61BC] max-w-[1900px] min-w-[250px] mx-auto text-white w-full">
  <div className="justify-center md:items-center flex flex-col md:flex-row h-full w-full">
    <div className="w-[100%] md:w-[20%] flex flex-col md:flex-col justify-center items-center md:gap-5 pt-2">
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 w-[100%]">
        <div className="flex justify-center">
          <img src={Logo} alt="" className="mx-auto md:mx-0" />
        </div>
        <div className="text-center md:text-left">My Air Deal</div>
      </div>

      <div className="flex gap-2 justify-center text-white text-2xl pt-2 md:pt-0">
        <FaFacebook />
        <BiLogoInstagramAlt />
        <FaYoutube />
        <FaTwitter />
      </div>
    </div>

    <div className="flex flex-col  md:flex-row md:w-3/4 text-center md:text-start pb-6 sm:pb-0 mt-4 md:mt-0">
      <div className="flex flex-col ml-24 md:flex-row md:gap-3 justify-around lg:gap-6 w-[100%] sm:ml-52">
        
        <div className="sd: flex justify-start gap-20 text-left md:gap-24">
            <div className="text-white font-light flex flex-col gap-1">
              <h2 className="font-semibold mt-5 md:mt-0 text-left">Our Destinations</h2>
              <h3>Canada</h3>
              <h3>Alaska</h3>
              <h3>France</h3>
              <h3>Iceland</h3>
            </div>
          
            <div className="text-white font-light flex flex-col gap-1 text-left ">
              <h2 className="font-semibold mt-5 md:mt-0">Our Activities</h2>
              <h3>Northern Lights</h3>
              <h3>Cruising & sailing</h3>
              <h3>Multi-activities</h3>
              <h3>Kayaking</h3>
            </div>
        </div>

        <div className="sd: flex justify-start gap-16 text-left  md:gap-24">
        <div className="text-white font-light flex flex-col gap-1">
          <h2 className="font-semibold mt-5 md:mt-0">Travel Blogs</h2>
          <h3>Bali Travel Guide</h3>
          <h3>Sri Lanka Travel Guide</h3>
          <h3>Peru Travel Guide</h3>
        </div>

        <div className="text-white font-light flex flex-col gap-1 text-left ">
          <h2 className="font-semibold mt-5 md:mt-0">About Us</h2>
          <h3>Our Story</h3>
          <h3>Work with us</h3>
        </div>
        </div>

        <div className="text-white font-light flex flex-col gap-1 text-left sm:ml-0 md:text-center md:pr-1 pb-10 mt-4 md:mt-0">
         <h2 className="font-semibold mt-5 md:mt-0">Contact Us</h2>
          <h3>Email Us</h3>
          <h3>Call Us</h3>
        </div>
      </div>
    </div>
    
  </div>
</div>

  );
};

export default Footer;
