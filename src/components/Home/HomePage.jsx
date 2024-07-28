import React from "react";
import Header from "./Header";
import Banner from "./Banner";
import FilterSection from "./FilterSection";
import OfferSection from "./OfferSection";
import Contact from "./Contact";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <div>
      <Header />

      <Banner />

      <FilterSection />

      <OfferSection />

      <Contact />

      <Footer />
    </div>
  );
};

export default HomePage;
