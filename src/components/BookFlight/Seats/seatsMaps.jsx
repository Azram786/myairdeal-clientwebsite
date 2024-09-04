import React, { useEffect, useState } from "react";
import ReactToast from "../Util/ReactToast";
import defaultAirline from "../../../assets/home/logo/defaultAirline.png";
import passengers from "../flightSummary/passengers";

const SeatMap = ({
  Passengers,
  flightData,
  booking,
  onSeatSelect,
  setModalClose,
  flightId,
}) => {
  console.log(Passengers, "hey");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [flightDetails, setFlightDetails] = useState({});
  const [sData, setSData] = useState(null);
  const [sInfo, setSInfo] = useState([]);

  // Filter out infants from passengers
  const adultPassengers = Passengers.filter(
    (passenger) => passenger.passengerType !== "INFANT"
  );

  useEffect(() => {
    if (flightData && booking && flightId) {
      const flightInfo = flightData.tripInfos
        .flatMap((trip) => trip.sI)
        .find((segment) => segment.id === flightId);

      if (flightInfo) {
        setFlightDetails({
          airline: flightInfo.fD?.aI?.name,
          flightNumber: flightInfo?.fD.fN,
          flightCode: flightInfo?.fD?.aI?.code,
          flightClass: flightData?.tripInfos.find((trip) =>
            trip.sI.some((segment) => segment.id === flightId)
          )?.cabinClass,
          departure: flightInfo?.da?.cityCode,
          arrival: flightInfo?.aa.cityCode,
          departureTime: new Date(flightInfo?.dt).toLocaleTimeString(),
          arrivalTime: new Date(flightInfo?.at).toLocaleTimeString(),
        });

        const tripSeat = booking?.tripSeatMap?.tripSeat[flightId];
      
        if (tripSeat) {
          setSData(tripSeat?.sData);
          setSInfo(tripSeat?.sInfo);
        }
      }
    }

    // Pre-select seats that are already selected by passengers

    const preSelectedSeats = Passengers.flatMap((passenger) =>
      Array.isArray(passenger.selectedSeat)
        ? passenger.selectedSeat
            .filter((seat) => seat.key === flightId) // Filter seats with the correct flightId
            .map((seat) => ({
              key: seat?.key,
              code: seat?.code,
              amount: seat?.amount,
            }))
        : []
    );
    setSelectedSeats(preSelectedSeats);
  }, [flightData, booking, flightId]);

  const toggleSeat = (seat) => {
    if (!seat.isBooked) {
      setSelectedSeats((prevSeats) => {
        const seatIndex = prevSeats.findIndex(
          (s) => s.code === seat.seatNo && s.key === flightId
        );

        // If the seat is already selected, unselect it
        if (seatIndex !== -1) {
          const updatedSeats = prevSeats.filter(
            (s) => s.code !== seat.seatNo && s.key === flightId
          );
          onSeatSelect(updatedSeats.length, null);
          return updatedSeats;
        }

        // If the maximum number of seats is selected, replace the last selected seat
        if (prevSeats.length >= adultPassengers.length) {
          const updatedSeats = prevSeats.slice(1); // Remove the first seat
          const newSeat = {
            key: flightId,
            code: seat.seatNo,
            amount: seat.amount,
          };
          const newSeatsList = [...updatedSeats, newSeat];
          onSeatSelect(newSeatsList.length - 1, newSeat);
          return newSeatsList;
        }

        // If there is still room to select a new seat
        const newSeat = {
          key: flightId,
          code: seat.seatNo,
          amount: seat.amount,
        };
        const updatedSeats = [...prevSeats, newSeat];
        onSeatSelect(updatedSeats.length - 1, newSeat);
        return updatedSeats;
      });
    }
  };

  const isSeatSelected = (seatNo) =>
    selectedSeats.some((seat) => seat.code === seatNo && seat.key === flightId);

  const renderSeat = (seat) => {
    let className =
      "w-10 h-10 m-1 rounded-md flex items-center justify-center text-xs font-semibold transition-colors duration-200 ";

    if (seat.isBooked) {
      className += "bg-gray-400 cursor-not-allowed";
    } else if (isSeatSelected(seat.seatNo)) {
      className += "bg-[#D7B56D] text-white";
    } else {
      className += "bg-white hover:bg-gray-200";
    }

    if (seat.isLegroom) {
      className += " border-t-8 border-green-500";
    }

    if (seat.isAisle) {
      className += " mr-14";
    }

    return (
      <button
        key={seat?.seatNo}
        className={className}
        onClick={() => toggleSeat(seat)}
        disabled={seat?.isBooked}
      >
        {seat?.isBooked || isSeatSelected(seat?.seatNo)
          ? seat.seatNo
          : `${seat.amount}`}
      </button>
    );
  };

  const renderSeatMap = () => {
    if (!sData || !sInfo) {
      return (
        <div className="text-sm font-semibold">
          Seat Map Not Available for this Trip
        </div>
      );
    }

    const rows = [];
    for (let i = 1; i <= sData.row; i++) {
      const rowSeats = sInfo.filter((seat) => seat.seatPosition.row === i);
      rows.push(
        <div key={i} className="flex justify-center">
          {rowSeats.map(renderSeat)}
        </div>
      );
    }
    return rows;
  };

  const handleProceed = () => {
    adultPassengers.forEach((passenger, index) => {
      if (index < selectedSeats.length) {
        onSeatSelect(index, selectedSeats[index]);
      }
    });

    setModalClose(false);
  };

  return (
    <div className="container ">
     
      <div className="flex flex-col gap-6 md:flex-row w-full justify-around ">
        {/* First portion for displaying the data - make it sticky */}
        
        <div className="md:sticky md:top-0 md:self-start bg-white md:w-[40%] border-r-2 flex flex-col">
          <div className="w-full  flex-grow ">
          <p className="text-base font-semibold ">
        Your booking is protected by MyAirDeal {flightId}
      </p>
            <div className=" px-3 py-2">
              <p className="text-sm md:text-base font-semibold">
                Seat Selection
              </p>
              <div className="border-b flex flex-wrap py-2 justify-between">
                <div className="rounded-md size-12 bg-slate-500">
                  <img
                    src={`${
                      import.meta.env.VITE_SERVER_URL
                    }uploads/AirlinesLogo/${flightDetails?.flightCode}.png`}
                    onError={(e) => (e.currentTarget.src = defaultAirline)}
                    alt={flightDetails?.flightCode}
                    className="w-12 h-12 mr-6"
                  />
                </div>
                <div>
                  <p className="font-semibold">{flightDetails?.airline}</p>
                  <span className="w-full text-sm  flex gap-2 justify-center">
                    <p>
                      {flightDetails?.departure} - {flightDetails?.arrival}
                    </p>
                    <p>{flightDetails?.flightClass}</p>
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-6 md:max-h-[calc(100vh-300px)] w-full  custom-scrollbar">
              <div className="grid  mx-2 grid-cols-3">
                <div className="flex flex-col text-center items-center ">
                  <h1 className="text-sm font-semibold text-center border-b-2  w-full mb-2">
                    Passengers
                  </h1>
                  <div className="flex flex-col flex-wrap items-center text-center  w-full">
                    {adultPassengers.map((person, index) => (
                      <p
                        key={index}
                        className="flex flex-wrap  text-xs md:text-sm w-[80%]  break-words"
                      >
                        {person?.firstName} {person?.lastName}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-start items-center">
                  <h1 className=" text-sm font-semibold mb-2 w-full text-center border-b-2">
                    Seat
                  </h1>
                  <div className="flex flex-col">
                    {selectedSeats
                      ?.filter((seat) => seat.key === flightId)
                      .map((seat) => (
                        <p
                          key={seat?.code}
                          className="truncate text-sm font-semibold"
                        >
                          {seat?.code}
                        </p>
                      ))}
                  </div>
                </div>
                <div className="flex flex-col justify-start items-center">
                  <h1 className="text-sm font-semibold mb-2 w-full text-center border-b-2">
                    Fee
                  </h1>
                  <div>
                    {selectedSeats
                      ?.filter((seat) => seat.key === flightId)
                      .map((seat) => (
                        <p
                          key={seat?.code}
                          className="truncate text-sm font-sm font-semibold"
                        >
                          ₹ {seat?.amount}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Total and Proceed button - always visible */}
          <div className="mt-auto flex flex-col items-center p-4 bg-white">
            <div className="flex justify-between w-full">
              <div>
                <h2 className="text-sm md:text-base font-semibold">Total</h2>
              </div>
              <div>{`    `}</div>
              <div className="text-sm md:text-base">
                ₹ {selectedSeats.reduce((sum, seat) => sum + seat.amount, 0)}/-
              </div>
            </div>
            <button
              onClick={handleProceed}
              className={`mt-3 w-[60%] bg-green-600 text-white text-sm md:text-mase px-6 py-2 ${
                selectedSeats.length === 0 ||
                selectedSeats.length !== adultPassengers.length
                  ? "cursor-not-allowed bg-opacity-50"
                  : "cursor-pointer hover:bg-green-600"
              } rounded-md transition-colors duration-200`}
              disabled={
                selectedSeats.length === 0 ||
                selectedSeats.length !== adultPassengers.length
              }
            >
              Proceed
            </button>
          </div>
        </div>

        {/*  Second portion - the seats interface */}
        <div className="bg-gray-100 md:w-2/4 p-4 rounded-lg">
          {renderSeatMap()}
        </div>

        {/*  Third Portion to display the Identifiers*/}
        <div className="text-sm md:sticky md:top-0 md:self-start md:min-h-[550px] border-l-2 md:w-[20%] flex flex-col  items-center md:items-start  p-4">
          <h1 className="font-semibold">Seat Status</h1>
          <div className="w-max text-left grid grid-cols-2 gap-y-4 md:grid-cols-1 space-y-2 mt-2">
            <div className="flex justify-start items-start">
              <span className="inline-block w-4 h-4 bg-white border mr-2"></span>
              <p className="ml-4">Available</p>
            </div>
            <div className="flex justify-start items-start">
              <span className="inline-block w-4 h-4 bg-gray-400 mr-2"></span>
              <p className="ml-4">Booked</p>
            </div>
            <div className="flex justify-start items-start">
              <span className="inline-block w-4 h-4 bg-white border-t-8 border-t-green-500 border border-slate-100 mr-2"></span>
              <p className="ml-4">Extra Legroom</p>
            </div>
            <div className="flex justify-start items-start">
              <span className="inline-block w-4 h-4 bg-[#D7B56D] mr-2"></span>
              <p className="ml-4">Selected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatMap;
