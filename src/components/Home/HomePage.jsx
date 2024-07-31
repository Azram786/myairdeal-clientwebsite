import React, { useEffect, useState } from "react";
import Header from "./Header";
import Banner from "./Banner";
import FilterSection from "./FilterSection";
import OfferSection from "./OfferSection";
import Contact from "./Contact";
import Footer from "./Footer";
import Spinner from "../Profile/Spinner";


const HomePage = () => {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

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
          <OfferSection />
          <Contact />
          <Footer />
        </>
      )}
    </div>
  );
};

export default HomePage;
