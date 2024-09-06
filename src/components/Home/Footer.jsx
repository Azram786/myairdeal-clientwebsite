// import Logo from "../../assets/home/logo/main_logo.png";

// const Footer = () => {
//   return (
//     <div className="h-full bg-[#1B1D29] mx-auto text-white w-full  py-8">
//       <div
//         className="
//           justify-center  md:items-center flex flex-col md:flex-row h-full w-full "
//       >
//         <div className=" w-full md:w-[15%] flex  md:flex-col justify-center items-center  md:gap-5 pt-2 mr-2 ">
//           <div
//             className="flex justify-center px-4 md:px-4   gap-2 w-[100%]
//              "
//           >
//             {/* <div className="flex">
//               <img src={Logo} alt="" />
//             </div> */}

//             <div className="text-2xl font-bold">
//               My <span className="text-[#D7B56D]">Air</span> Deal
//             </div>
//           </div>

//           <div className="cursor-pointer gap-4  px-2 grid  grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 justify-start w-[60%] text-white text-2xl   mr-1">
//             <div>
//               <FaFacebook className="hover:text-[#D7B56D]" />
//             </div>
//             <div>
//               <BiLogoInstagramAlt className="hover:text-[#D7B56D]" />
//             </div>
//             <div>
//               <FaYoutube className="hover:text-[#D7B56D]" />
//             </div>
//             <div>
//               <FaTwitter className="hover:text-[#D7B56D]" />
//             </div>
//           </div>
//         </div>
//         <div className="flex md:w-3/4 text-center md:text-start pb-6 sm:pb-0 ">
//           <div className="grid lg:grid-cols-5  gap-4 md:grid-cols-4 sm:grid-cols-3 px-6 py-4 md:px-0 grid-cols-2 text-start  w-full place-content-start">
//             <div className="  font-light flex flex-col gap-1  ">
//               <h2 className=" font-semibold text-[#D7B56D]  mt-5 ">
//                 Our Destinations
//               </h2>
//               <div className="cursor-pointer text-sm">Canada</div>
//               <div className=" cursor-pointer text-sm"> Alaska</div>
//               <div className="cursor-pointer text-sm">France</div>
//               <div className="cursor-pointer text-sm">Iceland</div>
//             </div>
//             <div className="text-white font-light flex flex-col gap-1 ">
//               <h2 className="font-semibold  text-[#D7B56D]  mt-5 ">
//                 Our Activities
//               </h2>
//               <div className=" cursor-pointer text-sm">Northern Lights</div>
//               <div className="cursor-pointer text-sm">Cruising & sailing</div>
//               <div className="cursor-pointer text-sm">Multi-activites</div>
//               <div className="cursor-pointer text-sm">Kayaing</div>
//             </div>
//             <div className="text-white font-light flex flex-col gap-1 ">
//               <h2 className="font-semibold  text-[#D7B56D]   mt-5 ">
//                 Travel Blogs
//               </h2>
//               <div className="cursor-pointer text-sm">Bali Travel Guide</div>
//               <div className="cursor-pointer text-sm">
//                 Sri Lanka Travel Guide
//               </div>
//               <div className="cursor-pointer text-sm">Peru Travel Guide</div>
//               <div className="cursor-pointer text-sm">Bali Travel Guide</div>
//             </div>
//             <div className="text-white font-light flex flex-col gap-1 ">
//               <h2 className="font-semibold  mt-5  text-[#D7B56D]  ">
//                 About Us
//               </h2>
//               <div className="cursor-pointer text-sm">Our Story</div>
//               <div className="cursor-pointer text-sm">Work with us</div>
//             </div>
//             <div className="text-white  font-light flex flex-col gap-1 md:pr-1">
//               <h2 className="font-semibold  text-[#D7B56D]   mt-5 ">
//                 Contact us
//               </h2>
//               <div className="cursor-pointer text-sm">Our Story</div>
//               <div className="cursor-pointer text-sm">Work with us</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;

import React from "react";
import { FaFacebook } from "react-icons/fa";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="w-full bg-[#1E1F2D] text-white py-12">
      <div className=" w-fit flex flex-col items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex mt-6 mb-16 items-center">
          <div className="font-bold text-4xl md:text-8xl text-white">My</div>
          <div className="font-bold text-4xl md:text-8xl text-[#D7B56D]">
            Air
          </div>
          &nbsp;
          <div className="font-bold text-4xl md:text-8xl text-white">Deal</div>
        </div>
      </div>
      <div className=" justify-center flex gap-20 flex-wrap md:gap-56">
        <div>
          <p className="font-bold text-base md:text-xl text-[#D7B56D]">INDIA</p>
          <br />
          <p className="font-normal text-base md:text-sm text-white">
            2nd Floor, Anjali Plaza, jayanagar,
          </p>
          <p className="font-normal text-base md:text-sm text-white">
            Bengaluru, India-560076
          </p>
          <br />
          <p className="font-normal text-base md:text-sm text-white">
            support@bookmyjet.com
          </p>
        </div>
        <div>
          <p className="font-bold text-base md:text-xl text-[#D7B56D]">
            DUBAI-UAE
          </p>
          <br />
          <p className="font-normal text-base md:text-sm text-white">
            I 10,Block 1,Phase 1,Saih Shuaib 2,
          </p>
          <p className="font-normal text-base md:text-sm text-white">
            Dubai, UAE.
          </p>
          <br />
          <p className="font-normal text-base md:text-sm text-white">
            support@bookmyjet.com
          </p>
        </div>
        <div className="flex space-x-4 mt-10 text-white text-2xl">
          <a href="#" className="text-gray-300 hover:text-[#D7B56D]">
            <FaFacebook />
          </a>
          <a href="#" className="text-gray-300 hover:text-[#D7B56D]">
            <BiLogoInstagramAlt />
          </a>
          <a href="#" className="text-gray-300 hover:text-[#D7B56D]">
            <FaTwitter />
          </a>
          <a href="#" className="text-gray-300 hover:text-[#D7B56D]">
            <FaYoutube />
          </a>
        </div>
      </div>
      {/* Bottom Footer Section */}
      <div className="mt-8  text-sm border-t border-gray-700 pt-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <p>&copy;All Rights Reserved-BookAnyJet</p>
        <p
          className="cursor-pointer underline mt-2"
          onClick={() => {
            navigate("/terms-and-conditions");
          }}
        >
          Term's & Condition
        </p>
        <p
          className="cursor-pointer underline mt-2"
          onClick={() => {
            navigate("/privacy-policy");
          }}
        >
          Privacy Policy
        </p>
      </div>
    </footer>
  );
};

export default Footer;
