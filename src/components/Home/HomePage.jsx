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


const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth)
  const [ResentSearchData, setResentSearchData] = useState([])

  async function getResentSearche() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}search/searchQueryHistory`, {
        headers: {
          Authorization: `Bearer ${token}` // Replace 'token' with your actual token
        }
      });
      setResentSearchData(response.data.data)
    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    getResentSearche()

    return () => clearTimeout(timer);
  }, []);
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
          <FilterSection />
          <RecentSearch ResentSearchData={ResentSearchData} />
          <OfferSection />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
};

export default HomePage;
