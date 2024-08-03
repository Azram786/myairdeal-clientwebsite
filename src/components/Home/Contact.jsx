// import contactMain from "../../assets/home/contact/contactMain.png";
// import { IoCallOutline } from "react-icons/io5";
// import { CiLocationOn } from "react-icons/ci";
// import { CiMail } from "react-icons/ci";


// import background from "../../assets/home/contact/svg/background.svg";
// const Contact = () => {
//   return (
//     <div className="w-full bg-[#0A2945] max-w-[1900px] min-w-[250px] mx-auto ">
//       <div className="flex flex-col sm:flex-row sm:px-10  items-center">
//         <div
//           className="w-[80%] sm:w-[50%]  flex items-center justify-center"
//           style={{
//             backgroundImage: `url(${background})`,
//             backgroundRepeat: "no-repeat",
//             backgroundSize: "100%",
//           }}
//         >
//           <img src={contactMain} className="h-[100%]" alt="" />
//         </div>
//         <div className="w-[90%] sm:w-[50%]  flex flex-col justify-center items-center">
//           <div className="mb-5 lg:my-10">
//             <h1 className="text-white text-[.9rem] lg:text-3xl font-bold">
//               Let us know how we can help you!
//             </h1>
//           </div>
//           <div className="w-[90%] flex flex-col gap-2 ">
//             <div className="space-x-1  pb-4 lg:p-4 rounded-lg flex items-start lg:space-x-4 ">
//               <div className="flex-shrink-0 p-2 lg:p-4 rounded-full bg-white">
//                 <IoCallOutline className="text-blue-900 text-[90%] p-[2px]" />
//               </div>
//               <div className="pb-3 lg:pb-6 w-full  border-b-[1px] lg:border-b-2">
//                 <div className="flex flex-col lg:gap-3 w-1/2">
//                   <span className="text-white text-[.7rem] lg:text-xl font-semibold">
//                     Phone
//                   </span>
//                   <span className="text-white text-[90%] lg:text-[80%]">
//                     +61 234-5678 910
//                   </span>
//                   <button className=" text-[.7rem] p-[3px] sm:text-lg mt-1 lg:mt-2 bg-transparent border border-white w-1/2 text-white lg:py-1  xl:px-3 rounded-full ">
//                     CALL
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="space-x-1  pb-4 lg:p-4 rounded-lg flex items-start lg:space-x-4 ">
//               <div className="flex-shrink-0 p-2 lg:p-4 rounded-full bg-white">
//                 <IoCallOutline className="text-blue-900 text-[90%] p-[2px]" />
//               </div>
//               <div className="pb-3 lg:pb-6 w-full  border-b-[1px] lg:border-b-2">
//                 <div className="flex flex-col lg:gap-3 w-1/2">
//                   <span className="text-white text-[.7rem] lg:text-xl font-semibold">
//                     Phone
//                   </span>
//                   <span className="text-white text-[90%] lg:text-[80%]">
//                     +61 234-5678 910
//                   </span>
//                   <button className=" text-[.7rem] p-[3px] sm:text-lg mt-1 lg:mt-2 bg-transparent border border-white w-1/2 text-white lg:py-1  xl:px-3 rounded-full ">
//                     CALL
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="space-x-1  pb-4 lg:p-4 rounded-lg flex items-start lg:space-x-4 ">
//               <div className="flex-shrink-0 p-2 lg:p-4 rounded-full bg-white">
//                 <IoCallOutline className="text-blue-900 text-[90%] p-[2px]" />
//               </div>
//               <div className="pb-3 lg:pb-6 w-full  ">
//                 <div className="flex flex-col lg:gap-3 w-1/2">
//                   <span className="text-white text-[.7rem] lg:text-xl font-semibold">
//                     Phone
//                   </span>
//                   <span className="text-white text-[90%] lg:text-[80%]">
//                     +61 234-5678 910
//                   </span>
//                   <button className=" text-[.7rem] p-[3px] sm:text-lg mt-1 lg:mt-2 bg-transparent border border-white w-1/2 text-white lg:py-1  xl:px-3 rounded-full ">
//                     CALL
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;



import contactMain from "../../assets/home/contact/contactMain.png";
import { IoCallOutline } from "react-icons/io5";
import { CiLocationOn, CiMail } from "react-icons/ci";
import background from "../../assets/home/contact/svg/background.svg";

const Contact = () => {
  return (
    <div className="w-full bg-[#0A2945] max-w-[1900px] min-w-[250px] mx-auto font-poppins">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:px-10 items-center">
        {/* Image Section */}
        <div
          className="flex items-center justify-center"
          style={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <img
            src={contactMain}
            className="h-[100%] object-cover"
            alt="Contact"
          />
        </div>

        {/* Contact Form Section */}
        <div className="flex flex-col w-full justify-center items-center">
          <div className="mb-5 lg:my-10 ">
            <h1 className="text-white text-[.9rem] lg:text-3xl font-bold">
              Let us know how we can help you!
            </h1>
          </div>
          <div className="w-[90%] mt-6 ">
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 ">
                <label htmlFor="name" className="text-white text-sm">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter Your Name"
                  className="p-2 rounded-md bg-[#0A2945] border border-gray-500 text-gray-800"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-white text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter Your Email"
                  className="p-2 rounded-md bg-[#0A2945] border border-gray-500 text-gray-800"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="number" className="text-white text-sm">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="number"
                  placeholder="Enter Your Number"
                  className="p-2 rounded-md bg-[#0A2945] border border-gray-500 text-gray-800"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="enquiry" className="text-white text-sm">
                  Enquiry About
                </label>
                <select
                  id="enquiry"
                  className="p-2 rounded-md bg-[#0A2945] border border-gray-500 text-gray-800"
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {/* Add more options here */}
                </select>
              </div>
              <div className="w-full flex flex-col gap-2 col-span-2">
                <label htmlFor="message" className="text-white text-sm">
                  Your Message
                </label>
                <textarea
                  id="message"
                  placeholder="Your Message"
                  className="p-2 rounded-md bg-[#0A2945] border border-gray-500 text-gray-800 h-20"
                ></textarea>
              </div>
              <div className="w-full flex items-center gap-2 col-span-2">
                <input type="checkbox" id="terms" className="text-blue-900" />
                <label htmlFor="terms" className="text-white text-sm">
                  I agree with Terms of Use and Privacy Policy
                </label>
              </div>

              <div className="flex flex-col gap-2 col-span-2 ">
                <button className="mt-4 py-2 text-white rounded-lg w-full bg-gradient-to-r from-blue-900 via-blue-700 to-blue-400">
                  Send Message
                </button>
              </div>

              {/* Contact Info Section */}
              <div className="flex flex-wrap gap-4 col-span-2">
                <div className="flex items-start gap-2 flex-1">
                  <div className="flex-shrink-0 p-1 rounded-full bg-white">
                    <IoCallOutline className="text-blue-900 text-[1.25rem]" />
                  </div>
                  <div className="flex flex-col text-sm px-2">
                    <span className="text-white font-semibold">Phone</span>
                    <span className="text-white">+61 234-5678 910</span>
                    {/* <button className="mt-1 p-1 bg-transparent border border-white text-white rounded-full text-xs">
                      CALL
                    </button> */}
                  </div>
                </div>
                <div className="flex items-start gap-2 flex-1">
                  <div className="flex-shrink-0 p-1 rounded-full bg-white">
                    <CiLocationOn className="text-blue-900 text-[1.25rem]" />
                  </div>
                  <div className="flex flex-col text-sm px-2">
                    <span className="text-white font-semibold">Address</span>
                    <span className="text-white">
                      123 Main Street, City, Country
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2 flex-1">
                  <div className="flex-shrink-0 p-1 rounded-full bg-white">
                    <CiMail className="text-blue-900 text-[1.25rem]" />
                  </div>
                  <div className="flex flex-col text-sm px-2">
                    <span className="text-white font-semibold">Email</span>
                    <span className="text-white">contact@example.com</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
