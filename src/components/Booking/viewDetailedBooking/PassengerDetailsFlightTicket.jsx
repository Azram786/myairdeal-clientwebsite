import React from "react";

const PassengerDetailsTable = ({ passengerDetails }) => {
  console.log("psg", passengerDetails);
  return (
    <div className="p-4 bg-white shadow rounded-lg ">
      <h2 className="text-base md:text-lg font-bold mb-4">
        Passenger Details ({passengerDetails.length})
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Sl.no</th>

              <th className="text-left p-2">
                Name,
                <br /> DOB ,<br />
                Passport & FF
              </th>
              <th className="text-left p-2">
                PNR,
                <br /> Ticket No. <br />& Status
              </th>
              <th className="text-left p-2">
                Meal,
                <br /> Baggage, <br />
                Seat & Other Preference
              </th>
              {/* <th className="text-left p-2">Document Id</th> */}
            </tr>
          </thead>
          <tbody>
            {passengerDetails.map((passenger, index) => (
              <tr key={index} className="border-b w-full text-sm">
                <td className="p-2">{index + 1}</td>

                <td className="p-2  w-1/3">
                  {passenger?.ti} {passenger?.fN.toUpperCase()}{" "}
                  {passenger.lN.toUpperCase()} ({passenger?.pt[0]})
                  <br />
                  <span className="text-gray-600 text-[.8rem]">
                    {passenger?.dob && `DOB: ${passenger.dob}`}
                    {passenger?.dob && passenger?.pNum && " | "}
                    {passenger?.pNum && `PM: ${passenger.pNum}`}
                  </span>
                  <span className="block text-gray-600 text-[.8rem]">
                    {" "}
                    {passenger?.pNat && `N:${passenger.pNat}`}{" "}
                    {passenger?.pid && `| Id: ${passenger.pid}`}
                    {passenger?.eD && ` | ED : ${passenger.eD}`}
                  </span>
                </td>
                <td className="p-2">
                  {Object.keys(passenger?.pnrDetails).map((segment) => (
                    <div key={segment}>
                      {segment}:{" "}
                      <span className="text-green-500">
                        {passenger?.pnrDetails[segment]}
                      </span>{" "}
                      {passenger?.ticketNumberDetails?.[segment] || ""}
                    </div>
                  ))}
                </td>
                {(passenger?.ssrMealInfos && (
                  <td className="p-2  flex ">
                    {Object?.keys(passenger.ssrMealInfos)?.map((segment) => (
                      <div key={segment}>
                        {segment}:{" "}
                        <span className="text-gray-500">
                          {passenger?.ssrMealInfos[segment].desc}
                        </span>{" "}
                        , Seat:{" "}
                        <span className="text-gray-500">
                          {segment === "CCU-IXZ" ? "25C" : "N/A"}
                        </span>
                      </div>
                    ))}
                  </td>
                )) || <td className="p-2">NA</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PassengerDetailsTable;
