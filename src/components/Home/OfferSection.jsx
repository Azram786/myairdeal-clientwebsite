import React from "react";
import OfferBg from "../../assets/home/offer/OfferBG.png";
import Offer1 from "../../assets/home/offer/Offer1.png";
import Offer2 from "../../assets/home/offer/Offer2.png";
import Offer3 from "../../assets/home/offer/Offer3.png";
import Offer4 from "../../assets/home/offer/Offer4.png";
import Offer5 from "../../assets/home/offer/BLR.jpg";
import Offer6 from "../../assets/home/offer/CCU.jpg";
import Offer7 from "../../assets/home/offer/MAA.jpg";
import Offer8 from "../../assets/home/offer/BOM.jpg";

import background from "../../assets/service/earth.png";
import { useDispatch } from "react-redux";
import { clearResent } from "../../store/slices/aut.slice";
import { useState } from "react";
import { useEffect } from "react";
const offers = [
  {
    img: Offer1,
    cntryName: "Melbourne",
    description: "An amazing journey",
    amount: "70k",
    type: "International",
    src: "MEL",
  },
  {
    img: Offer2,
    cntryName: "Paris",
    description: "A Paris Adventure",
    amount: "90k",
    type: "International",
    src: "CDG",
  },
  {
    img: Offer3,
    cntryName: "London",
    description: "London eye adventure",
    amount: "50k",
    type: "International",
    src: "LON",
  },
  {
    img: Offer4,
    cntryName: "Columbia",
    description: "An amazing journey",
    amount: "27k",
    type: "International",
    src: "CAE",
  },
  {
    img: Offer5,
    cntryName: "Bengaluru",
    description: "An amazing journey",
    amount: "70k",
    type: "Domestic",
    src: "BLR",
  },
  {
    img: Offer6,
    cntryName: "Kolkata",
    description: "An exceptional journey",
    amount: "90k",
    type: "Domestic",
    src: "CCU",
  },
  {
    img: Offer7,
    cntryName: "Chennai",
    description: "Marina Beach",
    amount: "50k",
    type: "Domestic",
    src: "MAA",
  },
  {
    img: Offer8,
    cntryName: "Mumbai",
    description: "An amazing journey",
    amount: "27k",
    type: "Domestic",
    src: "BOM",
  },
];

const OfferSection = ({ setFormData }) => {
  const [value, setValue] = useState("International");
  const dispatch = useDispatch();
  const [filteredOffers, setFilteredOffers] = useState([]);
  useEffect(() => {
    const newOffers = offers.filter((offer) => {
      return offer.type === value;
    });
    setFilteredOffers(newOffers);
  }, [value]);

  return (
    <div
      style={{
        backgroundImage: `url(${OfferBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="h-full"
    >
      <div style={{ backgroundImage: `url(${background})` }} className="h-full">
        <div className="md:px-16 px-3 py-10 mx-auto  bg-[#1B1D29] max-w-[1900px] min-w-[250px] overflow-hidden">
          <div className="flex w-full justify-between">
            <div className="flex flex-col text-[#D7B56D] px-5 items-start gap-4 2xl:gap-6 ">
              <h2 className="font-semibold text-[1.3rem] md:text-4xl 2xl:text-[2.2rem] ">
                Explore places together
              </h2>
              <div className="text-white  font-light text-sm md:text-base 2xl:text-2xl">
                Discover the latest offers and news and start planning your next
                trip with us.
              </div>
            </div>
            <div className="flex items-center border-2 border-white rounded-lg w-full md:w-[20%] h-10 relative">
              <select
                className="appearance-none flex justify-center  text-white items-center px-7  w-full outline-none sm:w-1/2 sm:mx-auto rounded-lg text-center font-light bg-transparent md:w-3/4 2xl:w-3/4 2xl:p-4"
                name=""
                id=""
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              >
                <option className="text-black w-full " value="International">
                  International
                </option>
                <option className="text-black " value="Domestic">
                  Domestic
                </option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M7 10l5 5 5-5H7z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center px-2 lg:pl-6 ">
            <div className="h-full w-full justify-around py-6   text-white grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  lg-custom:grid-cols-4  ">
              {filteredOffers.map((offer, index) => (
                <div
                  key={index}
                  style={{
                    backgroundImage: `url(${offer.img})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                  onClick={() => {
                    dispatch(clearResent());

                    const scrollToPosition = (targetPosition, duration) => {
                      const start = window.pageYOffset;
                      const distance = targetPosition - start;
                      let startTime = null;

                      const scrollStep = (currentTime) => {
                        if (!startTime) startTime = currentTime;
                        const timeElapsed = currentTime - startTime;
                        const progress = Math.min(timeElapsed / duration, 1);
                        window.scrollTo(0, start + distance * progress);

                        if (progress < 1) {
                          requestAnimationFrame(scrollStep);
                        }
                      };

                      requestAnimationFrame(scrollStep);
                    };

                    scrollToPosition(400, 1000);

                    setFormData((prev) => ({
                      ...prev,
                      toCityOrAirport: offer.src,
                    }));
                  }}
                  className="h-[30vh] sm:h-[50vh]  w-full md:w-[270px] lg:w-[270px]  gap-2 flex flex-wrap items-end rounded-[3%] transition-transform transform hover:scale-105 duration-300 ease-in-out"
                >
                  <div className="mb-5 w-full  px-5">
                    <div className="`flex w-full items-end justify-between">
                      <div>
                        <div className="font-bold text-xs md:text-[1.3rem]">
                          {offer.cntryName}
                        </div>
                        <div className="font-semibold text-xs md:text-[.9rem] mt-2">
                          {offer.description}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center mt-3">
                      <button className="text-black p-2 w-full bg-white rounded-lg font-semibold text-xs md:text-sm">
                        Book Flight
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferSection;
