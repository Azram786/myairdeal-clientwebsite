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

import React from 'react';
import OfferBg from "../../assets/home/offer/OfferBG.png";
import Offer1 from "../../assets/home/offer/Offer1.png";
import Offer2 from "../../assets/home/offer/Offer2.png";
import Offer3 from "../../assets/home/offer/Offer3.png";
import Offer4 from "../../assets/home/offer/Offer4.png";

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
    <div className="h-full mx-auto max-w-[1900px] min-w-[250px] overflow-hidden">
      <div
        className="h-full flex text-white w-full flex-wrap gap-4 md:py-7 justify-center py-3"
        style={{
          backgroundImage: `url(${OfferBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        {offers.map((offer, index) => (
          <div
            key={index}
            style={{
              backgroundImage: `url(${offer.img})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            className="h-[35vh] xs:h-[45vh] md:h-[55vh] lg:h-[60vh] md:w-[30%] w-[43%] sm:w-[33%] lg:w-[22%] flex items-end rounded-[3%]"
          >
            <div className="mb-5 px-3 w-full">
              <div className="flex items-end justify-between">
                <div>
                  <div className="font-bold text-[.9rem] md:text-[1.3rem]">
                    {offer.cntryName}
                  </div>
                  <div className="font-semibold text-[.7rem] md:text-[.9rem]">
                    {offer.description}
                  </div>
                </div>
                <h3 className="font-bold text-[.9rem] md:text-[1.5rem]">
                  {offer.amount}
                </h3>
              </div>
              <button className="text-black bg-white rounded-lg font-semibold text-[.8rem] md:text-[1rem] mt-4 md:p-4 p-2 md:w-[88%] w-full">
                Book Flight
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferSection;
