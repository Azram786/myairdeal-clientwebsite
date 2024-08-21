import DeatailAndOfferImage from "../../assets/home/detailsAndOffer/DetailandOffer.png";
import "./DealsAndOffers.css";
import { useState, useEffect } from "react";

// import { motion } from "framer-motion";

const DealsAndOffers = () => {
  // const [Animation,setAnimation]=useState(false);
  // const [currentIndex,setCurrentIndex]=useState(0)
  // const [data,setData]=useState([{
  //     img:DeatailAndOfferImage,
  //     content:""
  // },{
  //      img:"https://th.bing.com/th?id=OIP.G37tgeQqSNt7v2oPfj9ltQHaE7&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
  //     content:""
  // }])
  // useEffect(()=>{
  //     const interval = setInterval(()=>{
  //         setAnimation(true);
  //         setTimeout(()=>{
  //             setCurrentIndex((prevIndex)=>(prevIndex+1)%data.length);
  //         },250)

  //         setTimeout(()=>{
  //             setAnimation(false)
  //         },1000)
  //     },5000)
  //     return ()=>clearInterval(interval)
  // },[])
  return (
    <div className=" bg-[#BCE7FF]  mx-auto max-w-[1900px] min-w-[250px]  ">
      <div className="flex flex-col w-[95%] lg:w-[82%] m-auto h-[100%] bg-green-600">
        <div className="flex items-center w-[45%]">
          <h1 className="text-3xl  font-semibold ">Deals & Offers</h1>
        </div>
        <div className="flex justify-between flex-wrap w-full bg-red-800 ">
          <div className={`w-[45%] bg-blue-800 flex items-center  `}>
            <img
              className="rounded-sm min-w-[350px]"
              src={DeatailAndOfferImage}
              alt=""
            />
          </div>
          {/* <div className={`w-[45%] ${Animation?"DetailImageContainer":""}`}>
            <img className="rounded-sm" src={data[currentIndex].img} alt="" />
          </div> */}
          <div className="w-[50%] flex flex-col ">
            <div>
              <h2 className="font-bold lg:text-xl">Go Air Dubai</h2>
            </div>

            <div>
              <span className="font-light ">
                Treaveling is a unique experience as it's the best way to unplug
                from the pushes and pulls of daily life. It helps us to forget
                about our problems, frustrations and fears at home. During our
                journey, we experience life in different ways. We explore new
                places, cultures, cuisines, traditons and ways of living.
              </span>
            </div>
            <div>
              <button className="text-white bg-[#D7B56D] w-[30%] text-sm py-3 rounded-lg ">
                Get the deal
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsAndOffers;
