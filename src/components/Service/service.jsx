import React from "react";
import Content from "./content";
import background from "../../assets/service/world.png";
import background1 from "../../assets/service/world2.png";

function Card(props) {
  return (
    <div className="bg-white bg-cover relative pb-12 transition-transform transform hover:scale-105 duration-300 ease-in-out text-sky-950 rounded-xl p-6 shadow-md w-32 h-44 sm:w-44 md:w-52 md:h-60">
      <div className="w-12 md:w-20 h-12 md:h-20 mx-auto mb-4  border-solid border-4 border-[#3C4A8C] bg-[#3C4A8C] rounded-tl-sm rounded-tr-2xl rounded-bl-2xl rounded-br-sm items-center justify-center">
        <img
          src={props?.imgURL}
          alt="plane"
          className="transition-transform transform mx-auto w-10 h-10 md:w-14 md:h-12 justify-center items-center flex mt-1 md:mt-4 "
        />
      </div>
      <h2 className="text-sm sm:text-xl text-[#D7B56D] font-semibold mb-2 z-10">
        {props?.head}
      </h2>
      <p className="text-xs md:text-base font-medium flex flex-wrap text-[#1B1D29] z-10">
        {props?.para}
      </p>
    </div>
  );
}

function createCard(content) {
  return (
    <Card
      key={content.id}
      imgURL={content.imgURL}
      head={content.head}
      para={content.para}
    />
  );
}

function Service() {
  return (
    <div
      style={{ backgroundImage: `url(${background1})` }}
      className="bg-cover  w-full mx-auto text-center py-12"
    >
      {" "}
      ` `<div className="text-white text-base md:text-lg font-bold mb-2">Services</div>
      <div className="text-[#D7B56D] text-xl sm:text-3xl font-bold mb-8">
        We Offer Best Services
      </div>
      <div className="flex flex-wrap  mx-auto w-full md:grid-cols-2 lg-custom:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-10 place-items-center justify-center">
        {Content.map(createCard)}
      </div>
    </div>
  );
}

export default Service;

// import React from "react";
// import Content from "./content";
// import background from "../../assets/service/world.png";
// import "./service.css"; // Import the custom CSS file

// function Card(props) {
//   return (
//     <div className="card-container relative text-sky-950 p-6 shadow-md overflow-hidden w-52 h-60">
//       {/* Expanding Blue Background */}
//       <div className="bg-expand absolute inset-0"></div>

//       {/* Image */}
//       <div className="image-wrapper absolute z-10 mx-auto mb-4">
//         <img
//           src={props?.imgURL}
//           alt="plane"
//           className="plane-img"
//         />
//       </div>

//       {/* Content */}
//       <div className="card-content relative z-20">
//         <h2 className="text-lg sm:text-2xl font-semibold mb-2">
//           {props?.head}
//         </h2>
//         <p className="text-base sm:text-lg">{props?.para}</p>
//       </div>
//     </div>
//   );
// }

// function createCard(content) {
//   return (
//     <Card
//       key={content.id}
//       imgURL={content.imgURL}
//       head={content.head}
//       para={content.para}
//     />
//   );
// }

// function Service() {
//   return (
//     <div
//       style={{ backgroundImage: `url(${background})` }}
//       className="bg-cover px-16 mx-auto text-center py-12"
//     >
//       <div className="text-white text-base font-bold mb-2">Services</div>
//       <div className="text-white text-xl sm:text-3xl font-bold mb-8">
//         We Offer Best Services
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center justify-center">
//         {Content.map(createCard)}
//       </div>
//     </div>
//   );
// }

// export default Service;
