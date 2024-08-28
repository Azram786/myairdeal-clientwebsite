import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaPlane } from "react-icons/fa";
import "./ResentSearch.css";
import { useDispatch, useSelector } from "react-redux";
import { clearResent, setResentSearch } from "../../store/slices/aut.slice";
import { MdFlight } from "react-icons/md";

const RecentSearch = ({ ResentSearchData }) => {
  const dispatch = useDispatch();
  const { resentSearch, token } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (resentSearch) {
  //     // dispatch(clearResent())
  //   }
  // }, [resentSearch, dispatch]);

  const setResentStateHandler = (value) => {
    console.log({ value });

    dispatch(setResentSearch(value));
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  if (!token) return <></>;
  
  return (
    <div className=" w-[90%]  text-center rounded-xl my-4 mb-10 justify-center mx-auto flex flex-col gap-5">
      <h1 className="font-semibold px-4 text-start text-2xl">Recent Search</h1>
      <div className="  ">
        <Slider {...settings}>
          {ResentSearchData?.map((search, index) => (
            <div
              key={index}
              className="rounded-2xl  shadow-lg max-w-60 md:max-w-64 my-4 p-4 border gap-4 border-[#D7B56D] font-poppins cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 "
              onClick={() => {
                setResentStateHandler(search);
              }}
            >
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row justify-between items-center">
                  <div className="text-left w-[50%] ">
                    <div className="text-xs font-bold">
                      {search?.searchQuery.routeInfos[0].fromCityOrAirport
                        ?.code || "N/A"}
                    </div>
                    <div className="text-[10px] text-gray-500">
                      {search?.searchQuery?.cabinClass || "N/A"}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {search?.searchQuery.searchModifiers.isDirectFlight ===
                      true
                        ? "Direct Flight"
                        : "Indirect flight "}
                    </div>
                  </div>
                  <div className="flex flex-col w-[20%] items-center">
                    <div className="relative h-0.5 bg-gray-300 my-1">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#D7B56D]">
                        <MdFlight className="transform rotate-90 text-base" />
                      </div>
                    </div>
                  </div>
                  <div className="text-right w-[40%]">
                    <div className="text-xs font-bold">
                      {search?.searchQuery.routeInfos[0].toCityOrAirport
                        ?.code || "N/A"}
                    </div>

                    <div className="text-xs">
                      {search?.searchQuery.routeInfos[0].travelDate}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {search?.searchQuery?.searchModifiers
                        ?.isConnectingFlight === true
                        ? "Connection flight"
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default RecentSearch;

// import React from 'react';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { FaPlane } from 'react-icons/fa';
// import "./ResentSearch.css";
// import { useDispatch } from 'react-redux';
// import { setResentSearch } from '../../store/slices/aut.slice';

// const RecentSearch = ({  }) => {
//     const ResentSearchData=[
//         {
//             fromCode: 'BNG',
//             fromCity: 'Bangalore',
//             toCode: 'HYD',
//             toCity: 'Hyderabad',
//             departDate: '02-08-2024',
//             arrivalDate: '02-08-2024',
//             airline: 'Air India',
//         },
//         {
//             fromCode: 'DEL',
//             fromCity: 'Delhi',
//             toCode: 'MUM',
//             toCity: 'Mumbai',
//             departDate: '05-08-2024',
//             arrivalDate: '05-08-2024',
//             airline: 'Indigo',
//         },
//         {
//             fromCode: 'BLR',
//             fromCity: 'Bangalore',
//             toCode: 'COK',
//             toCity: 'Cochin',
//             departDate: '07-08-2024',
//             arrivalDate: '07-08-2024',
//             airline: 'SpiceJet',
//         },
//         {
//             fromCode: 'MAA',
//             fromCity: 'Chennai',
//             toCode: 'KOL',
//             toCity: 'Kolkata',
//             departDate: '09-08-2024',
//             arrivalDate: '09-08-2024',
//             airline: 'Vistara',
//         },
//     ];
//     const dispatch = useDispatch();

//     const settings = {
//         infinite: true,
//         speed: 500,
//         slidesToShow: 3,
//         slidesToScroll: 1,
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 2,
//                     slidesToScroll: 1,
//                     infinite: true,
//                 }
//             },
//             {
//                 breakpoint: 600,
//                 settings: {
//                     slidesToShow: 1,
//                     slidesToScroll: 1,
//                     initialSlide: 1
//                 }
//             }
//         ]
//     };

//     const setResentStateHandler = async (value) => {
//         try {
//             console.log({ value });
//             dispatch(setResentSearch(value));
//         } catch (error) {
//             console.log(error.message);
//         }
//     };

//     return (
//         <div className="w-[90%] text-center rounded-xl p-4 h-[30vh] justify-center mx-auto flex flex-col gap-5">
//             <h1 className='font-bold text-2xl'>Recent Search</h1>
//             <Slider {...settings}>
//                 {ResentSearchData.map((search, index) => (
//                     <div key={index} className="p-2 " onClick={() => setResentStateHandler(search)}>
//                         <div className="bg-white rounded-2xl shadow-lg p-3 border border-[#D7B56D] my-3 font-poppins max-w-[335px] mx-auto">
//                             <div className="flex flex-col space-y-2">
//                                 <div className="flex flex-row justify-between items-center">
//                                     <div className="text-left flex-1">
//                                         <div className="text-xs font-bold">{search?.fromCode}</div>
//                                         <div className="text-xxs text-gray-500">{search?.fromCity}</div>
//                                         <div className="text-xs text-gray-400 mt-1">Depart</div>
//                                         <div className="text-xs">{search.departDate}</div>
//                                     </div>
//                                     <div className="flex flex-col items-center flex-1">
//                                         <div className="text-xxs font-semibold">{search.airline}</div>
//                                         <div className="relative w-20 h-0.5 bg-gray-300 my-1">
//                                             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500">
//                                                 <FaPlane className="transform  text-base" />
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="text-right flex-1">
//                                         <div className="text-xs font-bold">{search.toCode}</div>
//                                         <div className="text-xxs text-gray-500">{search.toCity}</div>
//                                         <div className="text-xs text-gray-400 mt-1">Arrival</div>
//                                         <div className="text-xs">{search.arrivalDate}</div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </Slider>
//         </div>
//     );
// };

// export default RecentSearch;

// import React from "react";
// import { MdFlight } from "react-icons/md";
// import flightLogo from "../../assets/booking/viewBookings/flightLogo.png";

// const RecentSearch = () => {
//   return (
//     <div className="w-full py-8">
//         <h1 className="text-3xl px-16 font-bold text-start">Recent Search</h1>

//         <div className="bg-white rounded-2xl shadow-lg p-3 border border-#D7B56D] my-3 font-poppins max-w-[335px] mx-auto">
//           <div className="flex flex-col space-y-2">
//             <div className="flex flex-row justify-between items-center">
//               <div className="text-left flex-1">
//                 <div className="text-xs font-bold">BNG</div>
//                 <div className="text-xxs text-gray-500">Bangalore</div>
//                 <div className="text-xs text-gray-400 mt-1">Depart</div>
//                 <div className="text-xs">02-08-2024</div>
//               </div>
//               <div className="flex flex-col items-center flex-1">
//                 {/* <div className="w-10 h-10 rounded-md mb-1">
//                   <img
//                     src={flightLogo}
//                     alt="Flight Logo"
//                     className="w-full h-full object-cover"
//                   />
//                 </div> */}
//                 <div className="text-xxs font-semibold">Air India</div>
//                 <div className="relative w-20 h-0.5 bg-gray-300 my-1">
//                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500">
//                     <MdFlight className="transform rotate-90 text-base" />
//                   </div>
//                 </div>
//               </div>
//               <div className="text-right flex-1">
//                 <div className="text-xs font-bold">HYD</div>
//                 <div className="text-xxs text-gray-500">Hyderabad</div>
//                 <div className="text-xs text-gray-400 mt-1">Arrival</div>
//                 <div className="text-xs">02-08-2024</div>
//               </div>
//             </div>
//             {/* <button className="w-full bg-blue-800 text-white py-2 rounded-full font-semibold text-xs hover:bg-blue-900 transition duration-300">
//               Book Now
//             </button> */}
//           </div>
//         </div>
//     </div>
//   );
// };

// export default RecentSearch;
