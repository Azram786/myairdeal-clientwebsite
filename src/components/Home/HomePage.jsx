import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import { useLocation } from 'react-router-dom';
import FilterSection from "./FilterSection";
import OfferSection from "./OfferSection";
import Contact from "./Contact";

import Spinner from "../Profile/Spinner";
import RecentSearch from "./ResentSearch";
import axios from "axios";
import { useSelector } from "react-redux";
import AboutUs from "./AboutUsSection";
import WhyChooseUs from "./whyChooseUs";
import Testimonials from "./TestMonials";
import DownloadApp from "./AppDownload";
import Service from "../Service/service";
import { FiTable } from "react-icons/fi";
import { setUser } from "../../store/slices/aut.slice";

const HomePage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    console.log('ScrollToTop effect triggered');
    window.scrollTo(0, 0);
  }, [pathname]);
  
  const [loading, setLoading] = useState(false);
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
    isDirectFlight: true,
    isConnectingFlight: true,
    pft: "REGULAR",
  });

  const [dynamicFormData, setDynamicFormData] = useState([
    {
      fromCity: formData.toCityOrAirport || null,
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
    getResentSearch();
  }, []);

  const { isModifySearch } = useSelector((state) => state.auth);

  useEffect(() => {
    if (resentSearch?.searchQuery) {
      console.log({ query: resentSearch?.searchQuery });
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
        travelDate:
          new Date(resentSearch?.searchQuery?.routeInfos[0]?.travelDate) >=
            new Date()
            ? new Date(resentSearch?.searchQuery?.routeInfos[0]?.travelDate)
            : new Date(),
        returnDate:
          new Date(
            resentSearch?.searchQuery?.routeInfos[
              resentSearch.searchQuery.routeInfos.length - 1
            ]?.travelDate
          ) > new Date()
            ? new Date(
              resentSearch?.searchQuery?.routeInfos[
                resentSearch.searchQuery.routeInfos.length - 1
              ]?.travelDate
            )
            : new Date(),
        isDirectFlight: true,
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
      if (
        resentSearch.searchQuery.routeInfos.length === 2 &&
        resentSearch.searchQuery.routeInfos[0].toCityOrAirport.code ===
        resentSearch.searchQuery.routeInfos[1].fromCityOrAirport.code
      ) {
        setTypeOfTravel("round-trip");
      } else if (resentSearch.searchQuery.routeInfos.length > 1) {
        setTypeOfTravel(() => "multi-city");
        console.log({ typeOfTravel });
        const data = resentSearch.searchQuery.routeInfos
          .slice(1)
          .map((route, index) => {
            console.log({ route, index, date: new Date(route.travelDate) });
            console.log({
              fromCity:
                index === 0
                  ? formData.toCityOrAirport || route.fromCityOrAirport.code
                  : route.fromCityOrAirport.code,
              toCity: route.toCityOrAirport.code,
              travelDate: new Date(route.travelDate),
            });
            return {
              fromCity:
                index === 0
                  ? formData.toCityOrAirport || route.fromCityOrAirport.code
                  : route.fromCityOrAirport.code,
              toCity: route.toCityOrAirport.code,
              travelDate: new Date(route.travelDate),
            };
          });
        console.log({ data });
        setDynamicFormData(() => data);
      }
    }
  }, [resentSearch]);
  // useEffect(() => {
  //   if (resentSearch?.searchQuery) {
  //     console.log({ query: resentSearch?.searchQuery })
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       cabinClass: resentSearch.searchQuery.cabinClass || prevFormData.cabinClass,
  //       ADULT: resentSearch.searchQuery.paxInfo.ADULT || prevFormData.ADULT,
  //       CHILD: resentSearch.searchQuery.paxInfo.CHILD || prevFormData.CHILD,
  //       INFANT: resentSearch.searchQuery.paxInfo.INFANT || prevFormData.INFANT,
  //       fromCityOrAirport: resentSearch.searchQuery.routeInfos[0]?.fromCityOrAirport?.code || prevFormData.fromCityOrAirport,
  //       toCityOrAirport: resentSearch.searchQuery.routeInfos[0]?.toCityOrAirport?.code || prevFormData.toCityOrAirport,
  //       travelDate: new Date(resentSearch?.searchQuery?.routeInfos[0]?.travelDate) >= new Date() ? new Date(resentSearch?.searchQuery?.routeInfos[0]?.travelDate) : new Date(),
  //       returnDate: new Date(resentSearch?.searchQuery?.routeInfos[resentSearch.searchQuery.routeInfos.length - 1]?.travelDate) > new Date() ? new Date(resentSearch?.searchQuery?.routeInfos[resentSearch.searchQuery.routeInfos.length - 1]?.travelDate) : new Date(),
  //       isDirectFlight: true,
  //       isConnectingFlight: resentSearch.searchQuery.searchModifiers?.isConnectingFlight ?? prevFormData.isConnectingFlight,
  //       pft: resentSearch.searchQuery.searchModifiers?.pft || prevFormData.pft,
  //     }));

  //     if (resentSearch?.searchQuery?.routeInfos?.length === 1) {
  //       setTypeOfTravel("one-way");
  //       setDynamicFormData([{
  //         fromCity: "",
  //         toCity: "",
  //         travelDate: new Date(resentSearch.searchQuery.routeInfos[0].travelDate),
  //       }]);
  //     } else if (resentSearch.searchQuery.routeInfos.length === 2 &&
  //                resentSearch.searchQuery.routeInfos[0].toCityOrAirport.code === resentSearch.searchQuery.routeInfos[1].fromCityOrAirport.code) {
  //       setTypeOfTravel("round-trip");
  //     } else if (resentSearch.searchQuery.routeInfos.length > 1) {
  //       setTypeOfTravel("multi-city");
  //       setDynamicFormData(resentSearch.searchQuery.routeInfos.slice(1).map((route, index) => ({
  //         fromCity: route.fromCityOrAirport.code,
  //         toCity: route.toCityOrAirport.code,
  //         travelDate: new Date(route.travelDate),
  //       })));
  //     }
  //   }
  // }, [resentSearch]);

  return (
    <div>
      {isModifySearch ? (
        <FilterSection
          formData={formData}
          setFormData={setFormData}
          dynamicFormData={dynamicFormData}
          setDynamicFormData={setDynamicFormData}
          typeOfTravel={typeOfTravel}
          setTypeOfTravel={setTypeOfTravel}
        />
      ) : loading ? (
        <div className="h-screen">
          <Spinner />
        </div>
      ) : (
        <>

          <Banner />
          <FilterSection
            formData={formData}
            setFormData={setFormData}
            dynamicFormData={dynamicFormData}
            setDynamicFormData={setDynamicFormData}
            typeOfTravel={typeOfTravel}
            setTypeOfTravel={setTypeOfTravel}
          />

          {token && resentSearch?.length !== 0 && (
            <RecentSearch ResentSearchData={ResentSearchData} />
          )}

          <OfferSection />
          <AboutUs />
          <Service />
          <WhyChooseUs />
          <Testimonials />
          <Contact />
          <DownloadApp />

        </>
      )}
    </div>
  );
};

export default HomePage;


