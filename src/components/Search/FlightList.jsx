import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import axios from "axios";
import Oneway from "./SearchComponents/Oneway";
import Roundtrip from "./SearchComponents/Roundtrip";
import Combo from "./SearchComponents/Combo";
import Loader from "./Loader";
import MultiCity from "./SearchComponents/MultiCity";
import FilterSection from "../Home/FilterSection";
import { useLocation, useNavigate } from "react-router-dom";

const FlightList = () => {


  const [data, setData] = useState(query);
  console.log(query, "query")

  const navigate = useNavigate()
  if (!query || !data) {
    navigate('/')
  }
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

      console.log(res.data, "tripInfos-----------------------------------------");
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    getData();
  }, []);

  if (loading) {
    return <Loader text="Loading all available flights..." />;
  }

  return (
    <>
      <div className=" min-h-screen border p-4 bg-gray-50 gap-4 shadow-sm rounded-md flex flex-col">
        {tripType === "oneway" && <Oneway flightProps={oneway} passenger={data.searchQuery.paxInfo} />}
        {tripType === "roundtrip" && (
          <Roundtrip onwardProps={oneway} returnProps={roundWay} passenger={data.searchQuery.paxInfo} />
        )}
        {tripType === "combo" && <Combo flightprops={combo} passenger={data.searchQuery.paxInfo} />}
        {tripType === "multicity" && <MultiCity flightProps={multicity} passenger={data.searchQuery.paxInfo} />}
      </div>
    </>
  );
};

export default FlightList;
