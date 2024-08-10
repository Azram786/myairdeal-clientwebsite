// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Oneway from "./SearchComponents/Oneway";
// import Roundtrip from "./SearchComponents/Roundtrip";
// import Combo from "./SearchComponents/Combo";
// import MultiCity from "./SearchComponents/MultiCity";
// import FilterSection from "../Home/FilterSection";
// import Spinner from '../Profile/Spinner';
// import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import ReactToast from "../util/ReactToast";
// import { MdAirlineSeatReclineExtra, MdOutlineDateRange } from "react-icons/md";
// import { RiFlightLandLine, RiFlightTakeoffFill } from "react-icons/ri";
// import { GoArrowSwitch } from "react-icons/go";
// import { FaTelegramPlane } from "react-icons/fa";
// import FlightSearchSummary from "./FlightSearchSummary";
// import Header from "../Home/Header";
// import Footer from "../Home/Footer";

// const FlightList = () => {
//   // const [data, setData] = useState();
//   const location = useLocation();
//   const { query } = location.state || {};

//   const [data, setData] = useState(query);

//   const navigate = useNavigate();

//   useEffect(() => {
//     setData(query);
//     if (!query || !data) {
//       navigate("/");
//     }
//   }, [query]);

//   const [tripType, setTripType] = useState("");
//   const [oneway, setOneWay] = useState([]);
//   const [roundWay, setRoundWay] = useState([]);
//   const [multicity, setMulticity] = useState([]);
//   const [combo, setCombo] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const getData = async () => {
//     try {
//       const res = await axios.post(
//         `https://myairdeal-backend.onrender.com/search/flight`,
//         data
//       );

//       console.log(
//         res.data,
//         "tripInfos-----------------------------------------"
//       );
//       const tripInfos = res.data.searchResult.tripInfos;

//       console.log(tripInfos, "tripInfos");

//       if (tripInfos.ONWARD && tripInfos.RETURN) {
//         setTripType("roundtrip");
//         setOneWay(tripInfos.ONWARD);
//         setRoundWay(tripInfos.RETURN);
//       } else if (tripInfos.ONWARD) {
//         setTripType("oneway");
//         setOneWay(tripInfos.ONWARD);
//       } else if (tripInfos.COMBO) {
//         setTripType("combo");
//         setCombo(Object.values(tripInfos.COMBO));
//       } else {
//         setTripType("multicity");
//         setMulticity(Object.values(tripInfos));
//       }
//     } catch (error) {
//       console.log(error);
//       ReactToast('Some issue in your search')
//       navigate('/')
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);




//   if (loading) {
//     return (
//       <div className="w-full h-screen flex justify-center items-center">
//         <div className="flex-col flex gap-3">
//           <Spinner /> <h1 className="italic">Loading available flights..</h1>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//         <Header/>
//      { data &&   <div className="w-full py-5"><FlightSearchSummary data={data} tripType={tripType} /></div>}
//       <div className=" border p-4  gap-4 shadow-sm rounded-md flex flex-col">
//         {tripType === "oneway" && (
//           <Oneway flightProps={oneway} query={data} passenger={data?.searchQuery.paxInfo} />
//         )}
//         {tripType === "roundtrip" && (
//           <Roundtrip
//             onwardProps={oneway}
//             returnProps={roundWay}
//             query={data}
//             passenger={data?.searchQuery.paxInfo}
//           />
//         )}
//         {tripType === "combo" && (
//           <Combo flightprops={combo} query={data} passenger={data?.searchQuery.paxInfo} />
//         )}
//         {tripType === "multicity" && (
//           <MultiCity
//             flightProps={multicity}
//             query={data}
//             passenger={data?.searchQuery.paxInfo}
//           />
//         )}
//       </div>
//       <Footer/>
//     </div>
//   );
// };

// export default FlightList;


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
import FlightSearchSummary from "./FlightSearchSummary";
import Header from "../Home/Header";
import Footer from "../Home/Footer";

const FlightList = () => {
  const location = useLocation();
  const { query } = location.state || {};
  const [data, setData] = useState(query);
  const navigate = useNavigate();

  const [tripType, setTripType] = useState("");
  const [oneway, setOneWay] = useState([]);
  const [roundWay, setRoundWay] = useState([]);
  const [multicity, setMulticity] = useState([]);
  const [combo, setCombo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData(query);
    if (!query || !data) {
      navigate("/");
    }
  }, [query]);

  useEffect(() => {

    const timer = setTimeout(() => {
      ReactToast('Session expired. Please search again.');
      navigate("/");
    }, 1800000);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, [navigate]);

  const getData = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}search/flight`,
        data
      );

      const tripInfos = res.data.searchResult.tripInfos;

      console.log(tripInfos, "tripInfos");
      if (!tripInfos) {
        ReactToast("No flights found on this route")
        return
      }

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

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="flex-col flex gap-3">
          <Spinner /> <h1 className="italic">Loading available flights..</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {data && <div className="w-full py-5"><FlightSearchSummary data={data} tripType={tripType} /></div>}
      <div className=" border p-4  gap-4 shadow-sm rounded-md flex flex-col">
        {tripType === "oneway" && (
          <Oneway flightProps={oneway} query={data} passenger={data?.searchQuery.paxInfo} />
        )}
        {tripType === "roundtrip" && (
          <Roundtrip
            onwardProps={oneway}
            returnProps={roundWay}
            query={data}
            passenger={data?.searchQuery.paxInfo}
          />
        )}
        {tripType === "combo" && (
          <Combo flightprops={combo} query={data} passenger={data?.searchQuery.paxInfo} />
        )}
        {tripType === "multicity" && (
          <MultiCity
            flightProps={multicity}
            query={data}
            passenger={data?.searchQuery.paxInfo}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default FlightList;