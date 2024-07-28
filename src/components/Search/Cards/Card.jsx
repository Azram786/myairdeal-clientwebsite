import React from "react";

const Card = ({ text, likes, buttonText, description, bgImage }) => {
  return (
    <div
      className="gap-4 p-4 w-[15rem] h-[20rem] border rounded-md flex flex-col justify-end items-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="flex justify-evenly p-2 rounded gap-3">
        <div className="flex flex-col gap-1">
          <div className="text-white text-xl">{text}</div>
          <span className="text-white">{description}</span>
        </div>
        <h1 className="text-white">{likes}</h1>
      </div>
      <button className="w-[8rem] px-4 py-2 border rounded-md bg-white text-black">
        {buttonText}
      </button>
    </div>
  );
};

export default Card;
