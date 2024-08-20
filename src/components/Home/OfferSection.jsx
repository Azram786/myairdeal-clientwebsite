// import OfferBg from "../../assets/home/offer/OfferBG.png";
// import Offer1 from "../../assets/home/offer/Offer1.png";
// import Offer2 from "../../assets/home/offer/Offer2.png";
// import Offer3 from "../../assets/home/offer/Offer3.png";
// import Offer4 from "../../assets/home/offer/Offer4.png";

// const offers = [
//   {
//     img: `${Offer1}`,
//     cntryName: "Melbourne",
//     description: "An amazing journey",
//     amount: "70K",
//   },
//   {
//     img: `${Offer2}`,
//     cntryName: "Paris",
//     description: "A Paris Adventure",
//     amount: "90K",
//   },
//   {
//     img: `${Offer3}`,
//     cntryName: "London",
//     description: "London eye adventure",
//     amount: "50K",
//   },
//   {
//     img: `${Offer4}`,
//     cntryName: "Columbia",
//     description: "An amazing journey",
//     amount: "BookFlight",
//   },
// ];
// const OfferSection = () => {
//   return (
//     <div className="h-[100%]  mx-auto max-w-[1900px] min-w-[250px] overflow-hidden  ">

//       <div
//         className="h-[100%]   flex
//           text-white w-full flex-wrap gap-4 md:py-7 justify-center py-3 "
//         style={{
//           backgroundImage: `url(${OfferBg})`,
//           backgroundRepeat: "no-repeat",
//           backgroundSize: "cover",
//         }}
//       >
//         {offers.map((value, index) => (
//           <div
//           key={index}
//             style={{
//               backgroundImage: `url(${Offer+index+1})`,
//               backgroundRepeat: "no-repeat",
//               backgroundSize: "cover",
//             }}
//             className="h-[35vh] xs:h-[45vh] md:h-[55vh] lg:h-[60vh] md:w-[30%] w-[43%] sm:w-[33%] lg:w-[22%]  flex items-end rounded-[3%]"
//           >
//             <div className="mb-5 px-3 w-full">
//               <div className="flex items-end justify-between">
//                 <div>
//                   <div className="font-bold text-[.9rem] md:text-[1.3rem] ">
//                     {value.cntryName}
//                   </div>
//                   <div className="font-semibold text-[.7rem] md:text-[.9rem]">
//                     {value.description}
//                   </div>
//                 </div>
//                 <h3 className="font-bold text-[.9rem] md:text-[1.5rem]">
//                   {value?.amount}
//                 </h3>
//               </div>
//               <button
//                 className=" text-black bg-white rounded-lg
//                font-semibold text-[.8rem] md:text-[1rem] mt-4 md:p-4 p-2 md:w-[88%]"
//               >
//                 Book Flight
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default OfferSection;

// import React from 'react';
// import OfferBg from "../../assets/home/offer/OfferBG.png";
// import Offer1 from "../../assets/home/offer/Offer1.png";
// import Offer2 from "../../assets/home/offer/Offer2.png";
// import Offer3 from "../../assets/home/offer/Offer3.png";
// import Offer4 from "../../assets/home/offer/Offer4.png";
// import background from "../../assets/home/contact/svg/background.svg";

// const offers = [
//   {
//     img: Offer1,
//     cntryName: "Melbourne",
//     description: "An amazing journey",
//     amount: "70k",
//   },
//   {
//     img: Offer2,
//     cntryName: "Paris",
//     description: "A Paris Adventure",
//     amount: "90k",
//   },
//   {
//     img: Offer3,
//     cntryName: "London",
//     description: "London eye adventure",
//     amount: "50k",
//   },
//   {
//     img: Offer4,
//     cntryName: "Columbia",
//     description: "An amazing journey",
//     amount: "27k",
//   },
// ];

// const OfferSection = () => {
//   return (
//     <div style={{ backgroundImage: `url(${background})` }} className="h-full ">
//       <div className='px-16 py-6  mx-auto bg-gradient-to-b from-[#1966AB] to-[#0E385E] max-w-[1900px] min-w-[250px] overflow-hidden'>
//         <div className='flex w-full justify-between'>
//           <div className="flex flex-col text-white px-5 items-start gap-4 2xl:gap-6 ">
//               <h2 className="font-semibold text-[1.3rem]  md:text-4xl 2xl:text-[2.2rem] ">
//                 Explore places together
//               </h2>
//               <h4 className="font-light text-sm md:text-lg 2xl:text-2xl">
//                 Discover the latest offers and news and start planning your next
//                 trip with us.
//               </h4>
//             </div>
//             <div className="flex items-center  rounded-lg w-full md:w-1/4 2xl:h-full ">
//             <select
//               className="flex justify-center relative text-white items-center p-2 w-full  outline-none sm:w-1/2 sm:mx-auto rounded-lg border border-white mt-1 font-roboto text-center font-light  bg-transparent  md:w-3/4 2xl:w-3/4  2xl:p-4"
//               name=""
//               id=""
//               // selected={}
//               defaultValue={"i"}
//             >
//               <option value="i">International</option>
//               <option value="d">Domestic</option>
//             </select>
//           </div>
//         </div>
//         <div
//           className="h-full px-6 py-6  text-white grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 "
//           style={{
//             // backgroundImage: `url(${OfferBg})`,
//             backgroundRepeat: "no-repeat",
//             backgroundSize: "cover",
//           }}
//         >
//           {offers.map((offer, index) => (
//             <div
//               key={index}
//               style={{
//                 backgroundImage: `url(${offer.img})`,
//                 backgroundRepeat: "no-repeat",
//                 backgroundSize: "cover",
//               }}
//               className=" h-[55vh] w-full  flex items-end rounded-[3%]"
//             >
//               <div className="mb-5 px-3 w-full">
//                 <div className="flex items-end justify-between">
//                   <div>
//                     <div className="font-bold text-[.9rem] md:text-[1.3rem]">
//                       {offer.cntryName}
//                     </div>
//                     <div className="font-semibold text-[.7rem] md:text-[.9rem]">
//                       {offer.description}
//                     </div>
//                   </div>
//                   <h3 className="font-bold text-[.9rem] md:text-[1.5rem]">
//                     {offer.amount}
//                   </h3>
//                 </div>
//                 <button className="text-black bg-white rounded-lg font-semibold text-[.8rem] md:text-[1rem] mt-4 md:p-4 p-2 md:w-[88%] w-full">
//                   Book Flight
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OfferSection;

import React from "react";
import OfferBg from "../../assets/home/offer/OfferBG.png";
import Offer1 from "../../assets/home/offer/Offer1.png";
import Offer2 from "../../assets/home/offer/Offer2.png";
import Offer3 from "../../assets/home/offer/Offer3.png";
import Offer4 from "../../assets/home/offer/Offer4.png";
import background from "../../assets/service/earth.png";

const offers = [
  {
    img: Offer1,
    cntryName: "Melbourne",
    description: "An amazing journey",
    amount: "70k",
  },
  {
    img: Offer2,
    cntryName: "Paris",
    description: "A Paris Adventure",
    amount: "90k",
  },
  {
    img: Offer3,
    cntryName: "London",
    description: "London eye adventure",
    amount: "50k",
  },
  {
    img: Offer4,
    cntryName: "Columbia",
    description: "An amazing journey",
    amount: "27k",
  },
];

const OfferSection = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${OfferBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="h-full"
    >
      <div style={{ backgroundImage: `url(${background})` }} className="h-full">
        <div className="md:px-16 px-3 py-10 mx-auto bg-gradient-to-b from-[#D7B56D]/80 to-[#D7B56D]/80 max-w-[1900px] min-w-[250px] overflow-hidden">
          <div className="flex w-full justify-between">
            <div className="flex flex-col text-black px-5 items-start gap-4 2xl:gap-6 ">
              <h2 className="font-semibold text-[1.3rem] md:text-4xl 2xl:text-[2.2rem] ">
                Explore places together
              </h2>
              <div className="font-light text-sm md:text-base 2xl:text-2xl">
                Discover the latest offers and news and start planning your next
                trip with us.
              </div>
            </div>
            <div className="flex items-center border-2 border-black rounded-lg w-full md:w-[20%] h-10 relative">
              <select
                className="appearance-none flex justify-center  text-black items-center px-7  w-full outline-none sm:w-1/2 sm:mx-auto rounded-lg text-center font-light bg-transparent md:w-3/4 2xl:w-3/4 2xl:p-4"
                name=""
                id=""
                defaultValue="i"
              >
                <option className="text-black w-full " value="i">
                  International
                </option>
                <option className="text-black " value="d">
                  Domestic
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-black">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="h-full px-6 py-6 text-white grid gap-6 grid-cols-2 sm:grid-cols-2 lg-custom:grid-cols-4">
            {offers.map((offer, index) => (
              <div
                key={index}
                style={{
                  backgroundImage: `url(${offer.img})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
                className="h-[25vh] md:h-[55vh]  w-full md:w-[260px] flex flex-wrap items-end rounded-[3%] transition-transform transform hover:scale-105 duration-300 ease-in-out"
              >
                <div className="mb-5 w-full  px-5">
                  <div className="flex w-full items-end justify-between">
                    <div>
                      <div className="font-bold text-xs md:text-[1.3rem]">
                        {offer.cntryName}
                      </div>
                      <div className="font-semibold text-xs md:text-[.9rem]">
                        {offer.description}
                      </div>
                    </div>
                    <h3 className="font-bold text-xs md:text-[1.5rem]">
                      {offer.amount}
                    </h3>
                  </div>
                  <div className="flex justify-center mt-3">
                    <button className="text-black p-2 w-full bg-white rounded-lg font-semibold text-xs md:text-sm">
                      Book Flight
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferSection;
