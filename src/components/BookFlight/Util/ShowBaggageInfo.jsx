import React from "react";
import { PiBagSimpleBold } from "react-icons/pi";
const BaggageInformation = ({ item }) => {
  const passengerTypes = ["ADULT", "INFANT", "CHILDREN"];

  return (
    <div className=" rounded-lg w-full gap-2 mx-auto justify-start  flex   ">
      <div className=" ">
        {/* <svg
          className="w-12 h-12 mb-2"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2C10.35 2 9 3.35 9 5H7.5C6.12 5 5 6.12 5 7.5V18.5C5 19.88 6.12 21 7.5 21H16.5C17.88 21 19 19.88 19 18.5V7.5C19 6.12 17.88 5 16.5 5H15C15 3.35 13.65 2 12 2ZM12 4C12.55 4 13 4.45 13 5H11C11 4.45 11.45 4 12 4ZM7.5 7H16.5C16.78 7 17 7.22 17 7.5V8H7V7.5C7 7.22 7.22 7 7.5 7ZM7 10H17V18.5C17 18.78 16.78 19 16.5 19H7.5C7.22 19 7 18.78 7 18.5V10ZM9 12V14H15V12H9ZM9 16V18H15V16H9Z" />
        </svg> */}
      </div>
      {/* <h3 className="text-lg font-semibold mb-4 text-center">Baggage Information</h3> */}
      <div className=" flex flex-wrap justify-start  w-max gap-1 text-gray-600 rounded-md">
        {passengerTypes.map(
          (type) =>
            type === "ADULT" && (
              <div className="flex">
                <div className=" flex gap-2 text-base justify-center items-center p-2 ">
                  <p className="font-bold  ">{type}</p>
                  <PiBagSimpleBold className="text-lg" />{" "}
                </div>
                <div
                  key={type}
                  className="w-max  rounded-md p-3 flex gap-4 items-start text-sm"
                >
                  <div className="text-xs md:text-sm  flex justify-between w-max">
                    <p>Cabin:</p>
                    <p className="font-semibold ml-1">
                      {item?.totalPriceList[0].fd[type]?.bI.cB || "N/A"}
                    </p>
                  </div>
                  <div className="text-xs md:text-sm flex justify-between w-max">
                    <p>Check-In:</p>
                    <p className="font-semibold ml-1">
                      {item?.totalPriceList[0].fd[type]?.bI.iB || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
      {/* <div className="text-center mt-4">
        <a href="#" className="text-blue-500 underline inline-block  text-sm">
          Fare details
        </a>
      </div> */}
    </div>
  );
};

export default BaggageInformation;
