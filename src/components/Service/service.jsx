import React from "react";
import Content from "./content";
import background from "../../assets/service/world.png"

function Card(props) {
  return (
    <div className="bg-white text-sky-950 rounded-xl p-6 shadow-md  w-52 h-60">
    <img src={props?.imgURL} alt="plane" className="w-20 h-20 mx-auto mb-4 bg-sky-100 border-solid border-4 border-sky-900 rounded-tl-sm rounded-tr-2xl rounded-bl-2xl rounded-br-sm"  />
    <h2 className="text-lg sm:text-2xl font-semibold mb-2">{props?.head}</h2>
    <p className="text-base sm:text-lg   ">{props?.para}</p>
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
          style={{ backgroundImage: `url(${background})` }}
          className="bg-cover px-16 mx-auto text-center py-8">
            <div className="text-white text-lg font-medium mb-2">Services</div>
          <div className="text-white text-xl sm:text-3xl font-bold mb-8">We Offer Best Services</div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 place-items-center justify-center">
            {Content.map(createCard)}
          </div>
        </div>
      );
}

export default Service;
