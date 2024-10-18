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
        <div className="flex mt-6 mb-16 justify-start  w-full md:justify-center items-center ">
          <div className="font-bold text-4xl md:text-6xl text-white">My</div>
          <div className="font-bold text-4xl md:text-6xl text-[#D7B56D]">
            Air
          </div>
          &nbsp;
          <div className="font-bold text-4xl md:text-6xl text-white">Deal</div>
        </div>
      </div>
      <div className="flex flex-wrap justify-between items-center gap-10 ">
        <div className=" justify-center flex gap-20 flex-wrap md:gap-48 pl-0 md:pl-[110px] ">
          <div>
            <p className="font-bold text-base md:text-xl text-[#D7B56D]">
              INDIA
            </p>
            <br />
            <p className="font-normal text-base md:text-sm text-white">
              2nd Floor, Anjali Plaza, jayanagar,
            </p>
            <p className="font-normal text-base md:text-sm text-white">
              Bengaluru, India-560076
            </p>
            <br />
            <p className="font-normal text-base md:text-sm text-white">
              support@myairdeal.com
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
              support@myairdeal.com
            </p>
          </div>
        </div>
        <div className="flex justify-start md:justify-center items-center mx-auto md:pr-24">
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
      </div>
      {/* Bottom Footer Section */}
      <div className="mt-8  text-sm border-t border-gray-700 pt-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <p>&copy;All Rights Reserved-MyAir Deal</p>
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
