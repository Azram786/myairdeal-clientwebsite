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
import Spinner from "../Profile/Spinner";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import ReactToast from "../util/ReactToast";
import { MdAirlineSeatReclineExtra, MdOutlineDateRange } from "react-icons/md";
import { RiFlightLandLine, RiFlightTakeoffFill } from "react-icons/ri";
import { GoArrowSwitch } from "react-icons/go";
import { FaTelegramPlane } from "react-icons/fa";
import FlightSearchSummary from "./FlightSearchSummary";
import Header from "../Home/Header";
import Footer from "../Home/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setIsaModifySearch } from "../../store/slices/aut.slice";

const FlightList = () => {
  const location = useLocation();
  const { query } = location.state || {};
  const [data, setData] = useState(query);
  const navigate = useNavigate();
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const [tripType, setTripType] = useState("");
  const [oneway, setOneWay] = useState([]);
  const [roundWay, setRoundWay] = useState([]);
  const [multicity, setMulticity] = useState([]);
  const [combo, setCombo] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isModifySearch } = useSelector((state) => state.auth);
  const [hasUserPressedBack, setHasUserPressedBack] = useState(false);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { resentSearch } = useSelector((state) => state.auth);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("ScrollToTop effect triggered");
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    window.scrollTo(0, 0);
    // Push the current state to the history
    window.history.pushState({ page: "current" }, "");

    // Handler for popstate event (back button press)
    const handlePopState = (event) => {
      if (event.state && event.state.page === "current") {
        setHasUserPressedBack(true);
        // Optionally, you can prevent the default back action
        // window.history.pushState(null, '', window.location.href);
      }
    };

    // Add event listener
    window.addEventListener("popstate", handlePopState);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    if (hasUserPressedBack) {
      dispatch(setIsaModifySearch(false));
    }
  }, [hasUserPressedBack]);

  function cleanRouteInfos(searchQueryParam) {
    const searchQuery = searchQueryParam.searchQuery;
    return {
      ...searchQuery,
      routeInfos: searchQuery.routeInfos.map((route) => ({
        ...route,
        fromCityOrAirport: {
          ...route.fromCityOrAirport,
          code: route.fromCityOrAirport.code.split("-")[0],
        },
        toCityOrAirport: {
          ...route.toCityOrAirport,
          code: route.toCityOrAirport.code.split("-")[0],
        },
      })),
    };
  }

  useEffect(() => {
    if (query || data) {
      setData(query);
    }
    if (!query || !data) {
      const cleanedQuery = cleanRouteInfos(resentSearch);
      setData({ searchQuery: cleanedQuery });
    }
  }, [location.state]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSessionExpired(true);
    }, 180);
    // 1800000
    return () => clearTimeout(timer);
  }, [navigate]);

  const getData = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}search/flight`,
        data
      );

      const tripInfos = res.data.searchResult.tripInfos;
      console.log(tripInfos, "tripInfos");
      if (!tripInfos) {
        setError("No Flights Found on this route");
        return;
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
        setCombo(tripInfos.COMBO);
      } else {
        setTripType("multicity");
        setMulticity(Object.values(tripInfos));
      }
    } catch (error) {
      console.log(error.response.data.errors[0].message);
      setLoading(false);
      if (error?.response?.data?.errors[0]?.message) {
        setError(error.response.data.errors[0].message);
      } else {
        setError("Server Error");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      getData();
    }
  }, [data]);

  if (loading) {
    return (
      <div className="w-full  h-screen flex justify-center items-center">
        <div className="flex-col flex gap-3">
          <Spinner /> <h1 className="italic">Loading available flights..</h1>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="flex-col flex gap-3 ">
          <h1>{error}</h1>
          <button
            className="mt-2 text-sm px-2 py-5 text-[#D7B56D] bg-[#1B1D29] rounded"
            onClick={() => {
              navigate("/");
            }}
          >
            Click Here to go back to Home Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      {data && (
        <div className="w-full pt-1">
          <FlightSearchSummary data={data} tripType={tripType} />
        </div>
      )}
      <div className=" border p-4  gap-4 shadow-sm rounded-md flex flex-col">
        {tripType === "oneway" && (
          <Oneway
            flightProps={oneway}
            query={data}
            passenger={data?.searchQuery.paxInfo}
          />
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
          <Combo
            flightProps={combo}
            query={data}
            passenger={data?.searchQuery.paxInfo}
          />
        )}
        {tripType === "multicity" && (
          <MultiCity
            flightProps={multicity}
            query={data}
            passenger={data?.searchQuery.paxInfo}
          />
        )}
      </div>

      <SessionExpiredPopup
        isOpen={isSessionExpired}
        onClose={() => setIsSessionExpired(false)}
      />
    </div>
  );
};

export default FlightList;

//Session popup
const SessionExpiredPopup = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleSearchAgain = () => {
    onClose();
    navigate("/");
  };

  return (
    isOpen && (
      <div className="fixed z-50 inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-white p-6 rounded shadow-lg text-center">
          <h3 className=" font-bold mb-4 text-base">Session Expired</h3>
          <p className="mb-6 text-sm">
            Your session has expired. Please search again.
          </p>
          <button
            onClick={handleSearchAgain}
            className="bg-[#1B1D29] text-[#D7B56D] py-2 px-4 rounded text-sm"
          >
            Search Again
          </button>
        </div>
      </div>
    )
  );
};
