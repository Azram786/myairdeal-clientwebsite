
import React, { useState, useEffect } from "react";
import axios from "axios";
import Oneway from "./SearchComponents/Oneway";
import Roundtrip from "./SearchComponents/Roundtrip";
import Combo from "./SearchComponents/Combo";
import MultiCity from "./SearchComponents/MultiCity";
import FilterSection from "../Home/FilterSection";
import Spinner from '../Profile/Spinner';
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import ReactToast from "../util/ReactToast";
import { MdAirlineSeatReclineExtra, MdOutlineDateRange } from "react-icons/md";
import { RiFlightLandLine, RiFlightTakeoffFill } from "react-icons/ri";
import { GoArrowSwitch } from "react-icons/go";
import { FaTelegramPlane } from "react-icons/fa";

const FlightList = () => {
  // const [data, setData] = useState({
  //   searchQuery: {
  //     cabinClass: "ECONOMY",
  //     paxInfo: {
  //       ADULT: "3",
  //       CHILD: "0",
  //       INFANT: "0",
  //     },
  //     routeInfos: [
  //       {
  //         fromCityOrAirport: { code: "COK" },
  //         toCityOrAirport: { code: "BLR" },
  //         travelDate: "2024-08-06",
  //       },
  //       {
  //         fromCityOrAirport: { code: "BLR" },
  //         toCityOrAirport: { code: "COK" },
  //         travelDate: "2024-08-06",
  //       },
  //       // {
  //       //   fromCityOrAirport: { code: "DEL" },
  //       //   toCityOrAirport: { code: "DXB" },
  //       //   travelDate: "2024-08-09",
  //       // }
  //       // {
  //       //   fromCityOrAirport: { code: "BOM" },
  //       //   toCityOrAirport: { code: "DEL" },
  //       //   travelDate: "2024-08-12",
  //       // }
  //     ],
  //     searchModifiers: {
  //       isDirectFlight: false,
  //       isConnectingFlight: false,
  //     },
  //   },
  // });
  const location=useLocation();
  const { query } = location.state || {};

  const [data, setData] = useState(query);


  const navigate = useNavigate()
  

  useEffect(() => {
    setData(query);
    if(!query || !data){
      navigate('/')
    }
  }, [query]);

  const [tripType, setTripType] = useState("");
  const [oneway, setOneWay] = useState([]);
  const [roundWay, setRoundWay] = useState([]);
  const [multicity, setMulticity] = useState([]);
  const [combo, setCombo] = useState([]);
  const [loading, setLoading] = useState(true);
  


  const getData = async () => {
    try {
      const res = await axios.post(
        `https://myairdeal-backend.onrender.com/search/flight`,
        data
      );

      console.log(
        res.data,
        "tripInfos-----------------------------------------"
      );
      const tripInfos = res.data.searchResult.tripInfos;

      console.log(tripInfos, "tripInfos");

      if (tripInfos.ONWARD && tripInfos.RETURN) {
        setTripType("roundtrip");
        setOneWay(tripInfos.ONWARD);
        setRoundWay(tripInfos.RETURN);
      } else if (tripInfos.ONWARD) {
        setTripType("oneway");
        setOneWay(tripInfos.ONWARD);
      } else if (tripInfos.COMBO) {
        setTripType("combo");
        setCombo(Object.values(tripInfos.COMBO));
      } else {
        setTripType("multicity");
        setMulticity(Object.values(tripInfos));
      }
    } catch (error) {
      console.log(error);
      ReactToast('Some issue in your search')
      navigate('/')
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  // const renderFilterSummary = () => {
  //   // if (!data) return null;
  
  //   const { cabinClass, paxInfo, routeInfos } = data?.searchQuery;
  //   const totalPassengers = Object.entries(paxInfo).reduce((sum, [type, count]) => 
  //     sum + (parseInt(count) * (type === 'INFANT' ? 0 : 1)), 0);
  
  //   return (
  //     <div className="md:rounded-xl w-[90%] shadow-md border border-gray-200 bg-white flex gap-2 flex-col justify-center md:px-5 md:gap-4 md:py-5 md:w-[85%] relative md:top-[-50px]">
  //       <div className="flex justify-center md:justify-stretch text-white">
  //         <button className={`bg-[#007EC4] rounded-l-lg p-2 md:p-3 border-2 ${tripType === "oneway" && "border-red-500"}`}>
  //           One way
  //         </button>
  //         <button className={`bg-[#01324D] md:p-3 p-2 border-2 ${tripType === "roundtrip" && "border-red-500"}`}>
  //           Round trip
  //         </button>
  //         <button className={`bg-[#007EC4] rounded-r-lg md:p-3 p-2 border-2 ${tripType === "multicity" && "border-red-500"}`}>
  //           Multi City
  //         </button>
  //       </div>
  
  //       <div>
  //         <h3 className="font-semibold my-0">Your Flight Selection</h3>
  //       </div>
  
  //       <div className="flex  w-full gap-2 border-b">
  //         <div className="flex flex-col w-[85%]">
  //           {routeInfos.map((route, index) => (
  //             <div key={index} className="flex flex-col md:flex-row bg-[#ffffff] w-full gap-2  pb-2">
  //               <div className="flex flex-col md:w-3/4 md:flex-row relative gap-2 md:gap-2 justify-between">
  //                 <div className="flex items-center border rounded p-2 md:w-1/2">
  //                   <RiFlightTakeoffFill className="text-2xl md:text-3xl" />
  //                   <div className="ml-2">
  //                     <p className="text-xs font-semibold text-gray-500">From</p>
  //                     <p className="font-bold">{route.fromCityOrAirport.code}</p>
  //                   </div>
  //                 </div>
  //                 <div className="md:flex hidden sm:items-center justify-center text-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black w-8 h-8 rounded-full">
  //                   <GoArrowSwitch />
  //                 </div>
  //                 <div className="flex items-center border rounded p-2 md:w-1/2">
  //                   <RiFlightLandLine className="text-2xl md:text-3xl" />
  //                   <div className="ml-2">
  //                     <p className="text-xs font-semibold text-gray-500">To</p>
  //                     <p className="font-bold">{route.toCityOrAirport.code}</p>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="flex flex-col md:flex-row w-full md:w-1/4 gap-2">
  //                 <div className="rounded flex items-center border md:w-full py-2">
  //                   <div className="flex items-center justify-center md:justify-evenly w-full">
  //                     <MdOutlineDateRange className="text-2xl md:text-3xl" />
  //                     <div className="ml-2">
  //                       <p className="text-xs font-semibold text-gray-500">Departure</p>
  //                       <p className="font-bold">{route.travelDate}</p>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //          <div className="flex items-center border rounded-md h-10 w-[15%] p-3 md:p-2">
  //         <MdAirlineSeatReclineExtra className="text-2xl md:text-3xl" />
  //         <div className="flex flex-col ml-2">
  //           <h5 className="text-xs font-semibold text-gray-500">
  //             Passenger and Class
  //           </h5>
  //           <p className="font-bold">
  //             {totalPassengers} | {cabinClass}
  //           </p>
  //         </div>
  //       </div>
  //       </div>
  
       
  
  //       <div className="md:items-center flex flex-col md:flex-row mt-3">
  //         <div className="flex flex-col md:flex-row md:w-3/4 gap-2 md:gap-0">
  //           <div className="w-full md:w-1/3">
  //             <select className="outline-none border rounded-md md:w-auto p-2 w-3/4 md:p-1 bg-white">
  //               <option value="">Fare Type: {data.searchQuery.pft || 'Regular'}</option>
  //             </select>
  //           </div>
  //           <div className="flex gap-2 p-1 w-full items-center md:w-1/3">
  //             <label>Direct flights</label>
  //             <input
  //               type="checkbox"
  //               checked={data.searchQuery.searchModifiers.isDirectFlight}
  //               readOnly
  //               className="h-4 w-4"
  //             />
  //           </div>
  //         </div>
  //         <div className="md:w-1/4 items-center flex justify-center">
  //           <Navigate to='/'>
  //             <button className="flex items-center space-x-2 text-white bg-[#1F61BC] p-3 rounded">
  //               <FaTelegramPlane className="text-white text-lg" />
  //               <span>Modify Search</span>
  //             </button>
  //           </Navigate>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  if (loading) {
    return <div className='w-full h-screen flex justify-center items-center'><div className='flex-col flex gap-3'><Spinner/> <h1 className='italic'>Loading available flights..</h1></div></div>;
  }

  return (
    <>
      <div className=" min-h-screen border p-4 bg-gray-50 gap-4 shadow-sm rounded-md flex flex-col">
        {/* <div>{renderFilterSummary()}</div> */}
        {tripType === "oneway" && (
          <Oneway flightProps={oneway} passenger={data.searchQuery.paxInfo} />
        )}
        {tripType === "roundtrip" && (
          <Roundtrip
            onwardProps={oneway}
            returnProps={roundWay}
            passenger={data.searchQuery.paxInfo}
          />
        )}
        {tripType === "combo" && (
          <Combo flightprops={combo} passenger={data.searchQuery.paxInfo} />
        )}
        {tripType === "multicity" && (
          <MultiCity
            flightProps={multicity}
            passenger={data.searchQuery.paxInfo}
          />
        )}
      </div>
    </>
  );
};

export default FlightList;
