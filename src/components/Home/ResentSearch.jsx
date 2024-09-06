import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaPlane } from "react-icons/fa";
import "./ResentSearch.css";
import { useDispatch, useSelector } from "react-redux";
import { clearResent, setResentSearch } from "../../store/slices/aut.slice";
import { MdFlight } from "react-icons/md";

const RecentSearch = ({ ResentSearchData }) => {
  const dispatch = useDispatch();
  const { resentSearch, token } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (resentSearch) {
  //     // dispatch(clearResent())
  //   }
  // }, [resentSearch, dispatch]);

  console.log(ResentSearchData, "resent");

  const setResentStateHandler = (value) => {
    console.log({ value });

    dispatch(setResentSearch(value));
  };

  const settings = {
    infinite: ResentSearchData.length > 1,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  if (!token) return <></>;

  return (
    <div className=" w-[90%]  text-center rounded-xl my-4 mb-10 justify-center mx-auto flex flex-col gap-5">
      <h1 className="font-semibold px-4 text-start text-2xl">Recent Search</h1>
      <div className="  ">
        <Slider {...settings}>
          {ResentSearchData?.map((search, index) => (
            <div
              key={index}
              className="rounded-2xl  shadow-lg max-w-60 md:max-w-64 my-4 p-4 border gap-4 border-[#D7B56D] font-poppins cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 "
              // onClick={() => {
              //   setResentStateHandler(search);
              // }}
              onClick={() => {
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

                setResentStateHandler(search);
              }}
            >
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row justify-between items-center">
                  <div className="text-left w-[50%] ">
                    <div className="text-xs font-bold">
                      {search?.searchQuery.routeInfos[0].fromCityOrAirport
                        ?.code || "N/A"}
                    </div>
                    <div className="text-[10px] text-gray-500">
                      {search?.searchQuery?.cabinClass || "N/A"}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {search?.searchQuery.searchModifiers.isDirectFlight ===
                      true
                        ? "Direct Flight"
                        : "Indirect flight "}
                    </div>
                  </div>
                  <div className="flex flex-col w-[20%] items-center">
                    <div className="relative h-0.5 bg-gray-300 my-1">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#D7B56D]">
                        <MdFlight className="transform rotate-90 text-base" />
                      </div>
                    </div>
                  </div>
                  <div className="text-right w-[40%]">
                    <div className="text-xs font-bold">
                      {search?.searchQuery.routeInfos[0].toCityOrAirport
                        ?.code || "N/A"}
                    </div>

                    <div className="text-xs">
                      {search?.searchQuery.routeInfos[0].travelDate}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {search?.searchQuery?.searchModifiers
                        ?.isConnectingFlight === true
                        ? "Connection flight"
                        : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default RecentSearch;
