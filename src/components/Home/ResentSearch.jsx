import React, { useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaPlane } from 'react-icons/fa';
import "./ResentSearch.css";
import { useDispatch, useSelector } from 'react-redux';
import { clearResent, clearResentSearchFilter, setResentSearch, setResentSearchFromFilter, setResentSearchToFilter } from '../../store/slices/aut.slice';

const RecentSearch = ({ ResentSearchData }) => {
    const dispatch = useDispatch();
    const { resentSearch } = useSelector(state => state.auth);

    useEffect(() => {
        if (resentSearch) {
            dispatch(clearResentSearchFilter())
            resentSearch.searchQuery.routeInfos.forEach(item => {

                const fromCityOrAirport = item.fromCityOrAirport;
                const toCityOrAirport = item.toCityOrAirport;

                const fromValue = { value: fromCityOrAirport.code, label: ` ${fromCityOrAirport.code}` };
                const toValue = { value: toCityOrAirport.code, label: ` ${toCityOrAirport.code}` };

                dispatch(setResentSearchFromFilter(fromValue));
                dispatch(setResentSearchToFilter(toValue));
            });
            dispatch(clearResent())
        }
    }, [resentSearch, dispatch]);


    const setResentStateHandler = (value) => {
        console.log({ value })
        dispatch(setResentSearch(value));
    };

    const settings = {
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

    return (
        <div className="max-w-7xl w-[90%] lg:w-full text-center rounded-xl p-4 h-[30vh] justify-center mx-auto flex flex-col gap-5">
            <h1 className='font-bold text-2xl'>Recent Search</h1>
            <Slider {...settings}>
                {ResentSearchData.map((search, index) => (
                    <div key={index} className="p-2 h-[15vh]"
                        onClick={() => { setResentStateHandler(search) }}
                    >
                        <div className="bg-blue-500 text-white rounded-lg h-full shadow-lg p-4 flex flex-col items-center justify-center space-y-2">
                            <div className="flex justify-between w-full">
                                <div className="text-center">
                                    <div className="text-xl font-bold">{search?.searchQuery.routeInfos[0].fromCityOrAirport?.code || "N/A"}</div>
                                    <div className="text-lg font-bold"> {search?.searchQuery.cabinClass}</div>
                                    <div className="text-xs">{search?.searchQuery.searchModifiers.pft}</div>
                                </div>
                                <div className="text-center">
                                    <FaPlane className="text-3xl" />
                                </div>
                                <div className="text-center">
                                    <div className="text-xl font-bold">{search?.searchQuery.routeInfos[0].toCityOrAirport?.code || "N/A"}</div>
                                    <div className="text-lg font-bold">Passengers{" :"}{Number(search?.searchQuery?.paxInfo.ADULT) + Number(search?.searchQuery?.paxInfo.INFANT) + Number(search?.searchQuery?.paxInfo.CHILD)}</div>
                                    <div className="text-xs">{search?.searchQuery.routeInfos[0].travelDate}</div>
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
