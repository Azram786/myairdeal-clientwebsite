import contactMain from "../../assets/home/contact/contactMain.png";
import { IoCallOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import { CiMail } from "react-icons/ci";


import background from "../../assets/home/contact/svg/background.svg";
const Contact = () => {
  return (
    <div className="w-full bg-[#0A2945] max-w-[1900px] min-w-[250px] mx-auto ">
      <div className="flex flex-col sm:flex-row sm:px-10  items-center">
        <div
          className="w-[80%] sm:w-[50%]  flex items-center justify-center"
          style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
          }}
        >
          <img src={contactMain} className="h-[100%]" alt="" />
        </div>
        <div className="w-[90%] sm:w-[50%]  flex flex-col justify-center items-center">
          <div className="mb-5 lg:my-10">
            <h1 className="text-white text-[.9rem] lg:text-3xl font-bold">
              Let us know how we can help you!
            </h1>
          </div>
          <div className="w-[90%] flex flex-col gap-2 ">
            <div className="space-x-1  pb-4 lg:p-4 rounded-lg flex items-start lg:space-x-4 ">
              <div className="flex-shrink-0 p-2 lg:p-4 rounded-full bg-white">
                <IoCallOutline className="text-blue-900 text-[90%] p-[2px]" />
              </div>
              <div className="pb-3 lg:pb-6 w-full  border-b-[1px] lg:border-b-2">
                <div className="flex flex-col lg:gap-3 w-1/2">
                  <span className="text-white text-[.7rem] lg:text-xl font-semibold">
                    Phone
                  </span>
                  <span className="text-white text-[90%] lg:text-[80%]">
                    +61 234-5678 910
                  </span>
                  <button className=" text-[.7rem] p-[3px] sm:text-lg mt-1 lg:mt-2 bg-transparent border border-white w-1/2 text-white lg:py-1  xl:px-3 rounded-full ">
                    CALL
                  </button>
                </div>
              </div>
            </div>
            <div className="space-x-1  pb-4 lg:p-4 rounded-lg flex items-start lg:space-x-4 ">
              <div className="flex-shrink-0 p-2 lg:p-4 rounded-full bg-white">
                <IoCallOutline className="text-blue-900 text-[90%] p-[2px]" />
              </div>
              <div className="pb-3 lg:pb-6 w-full  border-b-[1px] lg:border-b-2">
                <div className="flex flex-col lg:gap-3 w-1/2">
                  <span className="text-white text-[.7rem] lg:text-xl font-semibold">
                    Phone
                  </span>
                  <span className="text-white text-[90%] lg:text-[80%]">
                    +61 234-5678 910
                  </span>
                  <button className=" text-[.7rem] p-[3px] sm:text-lg mt-1 lg:mt-2 bg-transparent border border-white w-1/2 text-white lg:py-1  xl:px-3 rounded-full ">
                    CALL
                  </button>
                </div>
              </div>
            </div>
            <div className="space-x-1  pb-4 lg:p-4 rounded-lg flex items-start lg:space-x-4 ">
              <div className="flex-shrink-0 p-2 lg:p-4 rounded-full bg-white">
                <IoCallOutline className="text-blue-900 text-[90%] p-[2px]" />
              </div>
              <div className="pb-3 lg:pb-6 w-full  ">
                <div className="flex flex-col lg:gap-3 w-1/2">
                  <span className="text-white text-[.7rem] lg:text-xl font-semibold">
                    Phone
                  </span>
                  <span className="text-white text-[90%] lg:text-[80%]">
                    +61 234-5678 910
                  </span>
                  <button className=" text-[.7rem] p-[3px] sm:text-lg mt-1 lg:mt-2 bg-transparent border border-white w-1/2 text-white lg:py-1  xl:px-3 rounded-full ">
                    CALL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
