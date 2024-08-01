// RecentSearch.js
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaPlane } from 'react-icons/fa';
import "./ResentSearch.css"
import { useDispatch } from 'react-redux';
import { setResentSearch } from '../../store/slices/aut.slice';
const RecentSearch = ({ ResentSearchData }) => {
    const dispatch = useDispatch()

    console.log({ ResentSearchData })
    const settings = {
        // dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            }
        ]
    };
    const setResentStateHandler = async (value) => {
        try {
            dispatch(setResentSearch(value))
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <div className="max-w-7xl mx-auto text-center rounded-xl p-4 h-[30vh] justify-center flex flex-col gap-5">
            <h1 className='font-bold text-2xl'>Recent Search</h1>
            <Slider {...settings}>
                {ResentSearchData.map((search, index) => (
                    <div key={index} className="p-2 h-[15vh]  " onClick={() => setResentStateHandler(search)}>
                        <div className="bg-blue-500 text-white rounded-lg h-full shadow-lg p-4  flex flex-col items-center justify-center space-y-2">
                            <div className="flex justify-between w-full">
                                <div className="text-center">
                                    <div className="text-xl font-bold">{search?.searchQuery.routeInfos[0].fromCityOrAirport?.code || "N/A"}</div>
                                    {/* <div className="text-lg font-bold"></div>
                                    <div className="text-xs">{search.airport1}</div> */}
                                </div>
                                <div className="text-center">
                                    <FaPlane className="text-3xl" />
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold">{search?.searchQuery.routeInfos[0].toCityOrAirport?.code || "N/A"}</div>
                                    {/* <div className="text-lg font-bold">{search.name2}</div>
                                    <div className="text-xs">{search.airport2}</div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default RecentSearch;
