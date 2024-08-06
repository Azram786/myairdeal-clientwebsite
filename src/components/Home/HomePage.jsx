// import React, { useEffect, useState } from "react";
// import Header from "./Header";
// import Banner from "./Banner";
// import FilterSection from "./FilterSection";
// import OfferSection from "./OfferSection";
// import Contact from "./Contact";
// import Footer from "./Footer";
// import Spinner from "../Profile/Spinner";
// import RecentSearch from "./ResentSearch";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const HomePage = () => {
//   const [loading, setLoading] = useState(true);
//   const { token, resentSearch } = useSelector((state) => state.auth);
//   const [ResentSearchData, setResentSearchData] = useState([]);

//   const [formData, setFormData] = useState({
//     cabinClass: "ECONOMY",
//     ADULT: "1",
//     CHILD: "0",
//     INFANT: "0",
//     fromCityOrAirport: "",
//     toCityOrAirport: "",
//     travelDate: new Date(),
//     returnDate: new Date(),
//     isDirectFlight: true,
//     isConnectingFlight: true,
//     pft: "REGULAR",
//   });
//   // State for dynamically rendering form elements
//   const [dynamicFormData, setDynamicFormData] = useState([
//     {
//       fromCity: formData.toCity ? formData.toCityOrAirport : "",
//       toCity: "",
//       travelDate: formData.travelDate,
//     },
//   ]);
//   console.log({ formData })
//   console.log(ResentSearchData)
//   async function getResentSearche() {
//     try {
//       const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}search/searchQueryHistory`, {
//         headers: {
//           Authorization: `Bearer ${token}` // Replace 'token' with your actual token
//         }
//       });
//       setResentSearchData(response.data.data)
//     } catch (error) {
//       console.log(error.message)
//     }
//   }

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 2000);
//     getResentSearche()

//     return () => clearTimeout(timer);
//   }, []);
//   console.log({ formData })
//   useEffect(() => {
//     if (resentSearch?.searchQuery) {
//       setFormData(prevFormData => ({
//         ...prevFormData,
//         cabinClass: resentSearch.searchQuery.cabinClass || prevFormData.cabinClass,
//         ADULT: resentSearch.searchQuery.paxInfo.ADULT || prevFormData.ADULT,
//         CHILD: resentSearch.searchQuery.paxInfo.CHILD || prevFormData.CHILD,
//         INFANT: resentSearch.searchQuery.paxInfo.INFANT || prevFormData.INFANT,
//         fromCityOrAirport: resentSearch.searchQuery.routeInfos[0]?.fromCityOrAirport?.code || prevFormData.fromCityOrAirport,
//         toCityOrAirport: resentSearch.searchQuery.routeInfos[0]?.toCityOrAirport?.code || prevFormData.toCityOrAirport,
//         travelDate: new Date(),
//         returnDate: new Date(),
//         isDirectFlight: resentSearch.searchQuery.searchModifiers?.isDirectFlight ?? prevFormData.isDirectFlight,
//         isConnectingFlight: resentSearch.searchQuery.searchModifiers?.isConnectingFlight ?? prevFormData.isConnectingFlight,
//         pft: resentSearch.searchQuery.searchModifiers?.pft || prevFormData.pft,
//       }));
//     }
//   }, [resentSearch]);
//   return (
//     <div>
//       {loading ? (
//         <div className="h-screen">F
//           <Spinner />
//         </div>
//       ) : (
//         <>
//           <Header />
//           <Banner />
//           <FilterSection formData={formData} setFormData={setFormData} dynamicFormData={dynamicFormData} setDynamicFormData={setDynamicFormData} />
//           <RecentSearch ResentSearchData={ResentSearchData} />
//           <OfferSection />
//           <Contact />
//           <Footer />
//         </>
//       )}
//     </div>
//   );
// };

// export default HomePage;
import React, { useEffect, useState } from "react";
import Header from "./Header";
import Banner from "./Banner";
import FilterSection from "./FilterSection";
import OfferSection from "./OfferSection";
import Contact from "./Contact";
import Footer from "./Footer";
import Spinner from "../Profile/Spinner";
import RecentSearch from "./ResentSearch";
import axios from "axios";
import { useSelector } from "react-redux";
import AboutUs from "./AboutUsSection";
import WhyChooseUs from "./whyChooseUs";
import Testimonials from "./TestMonials";
import DownloadApp from "./AppDownload";
import Service from "../Service/service";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const { token, resentSearch } = useSelector((state) => state.auth);
  const [ResentSearchData, setResentSearchData] = useState([]);
  const [typeOfTravel, setTypeOfTravel] = useState("one-way");

  const [formData, setFormData] = useState({
    cabinClass: "ECONOMY",
    ADULT: "1",
    CHILD: "0",
    INFANT: "0",
    fromCityOrAirport: "",
    toCityOrAirport: "",
    travelDate: new Date(),
    returnDate: new Date(),
    isDirectFlight: false,
    isConnectingFlight: true,
    pft: "REGULAR",
  });

  const [dynamicFormData, setDynamicFormData] = useState([
    {
      fromCity: formData.toCityOrAirport || "",
      toCity: "",
      travelDate: formData.travelDate,
    },
  ]);
  console.log({ formData, dynamicFormData });

  async function getResentSearch() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}search/searchQueryHistory`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setResentSearchData(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    getResentSearch();

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (resentSearch?.searchQuery) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        cabinClass:
          resentSearch.searchQuery.cabinClass || prevFormData.cabinClass,
        ADULT: resentSearch.searchQuery.paxInfo.ADULT || prevFormData.ADULT,
        CHILD: resentSearch.searchQuery.paxInfo.CHILD || prevFormData.CHILD,
        INFANT: resentSearch.searchQuery.paxInfo.INFANT || prevFormData.INFANT,
        fromCityOrAirport:
          resentSearch.searchQuery.routeInfos[0]?.fromCityOrAirport?.code ||
          prevFormData.fromCityOrAirport,
        toCityOrAirport:
          resentSearch.searchQuery.routeInfos[0]?.toCityOrAirport?.code ||
          prevFormData.toCityOrAirport,
        travelDate: new Date(),
        returnDate: new Date(),
        isDirectFlight:
          resentSearch.searchQuery.searchModifiers?.isDirectFlight ??
          prevFormData.isDirectFlight,
        isConnectingFlight:
          resentSearch.searchQuery.searchModifiers?.isConnectingFlight ??
          prevFormData.isConnectingFlight,
        pft: resentSearch.searchQuery.searchModifiers?.pft || prevFormData.pft,
      }));
      if (resentSearch?.searchQuery?.routeInfos?.length === 1)
        setTypeOfTravel("one-way");
      setDynamicFormData(() => [
        {
          fromCity: "",
          toCity: "",
          travelDate: formData.travelDate,
        },
      ]);
      if (resentSearch.searchQuery.routeInfos.length > 1) {
        setTypeOfTravel("multi-city");
        setDynamicFormData(
          resentSearch?.searchQuery?.routeInfos
            ?.slice(1)
            .map((route, index) => ({
              fromCity: route.fromCityOrAirport.code,
              toCity: route.toCityOrAirport.code,
              travelDate: new Date(route.travelDate),
            }))
        );
      }
    }
  }, [resentSearch]);

  console.log({ resentSearch });

  return (
    <div>
      {loading ? (
        <div className="h-screen">
          <Spinner />
        </div>
      ) : (
        <>
          <Header />
          <Banner />
          <FilterSection
            formData={formData}
            setFormData={setFormData}
            dynamicFormData={dynamicFormData}
            setDynamicFormData={setDynamicFormData}
            typeOfTravel={typeOfTravel}
            setTypeOfTravel={setTypeOfTravel}
          />

          {(token && resentSearch?.length !== 0 )&& (
            <RecentSearch ResentSearchData={ResentSearchData} />
          )}

          <OfferSection />
          <AboutUs />
          <Service />
          <WhyChooseUs />
          <Testimonials />
          <Contact />
          <DownloadApp />
          <Footer />
        </>
      )}
    </div>
  );
};

export default HomePage;
