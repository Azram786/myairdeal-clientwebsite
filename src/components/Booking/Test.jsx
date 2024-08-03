<div>
  <div className="space-y-6 bg-yellow-300">
    <div className="bg-yellow-700">
      <div>
        <div>
          <b>Source</b>: nithin
        </div>
        <div>
          <b>Destination</b>: nithin
        </div>
        <div>
          <b>Departure Date</b>: {/* Add departure date here */}
        </div>
        <div>
          <b>Flight Numbers</b>: {/* Add flight numbers here */}
        </div>
        <div>
          <b>Airlines</b>: {/* Add airlines here */}
        </div>
      </div>
      <div className="amendment-category-container">
        <div className="amendment-category">
          <h4></h4>
          <div>
            <b>Amendment Charges</b>: {/* Add amendment charges here */}
          </div>
          <div>
            <b>Refund Amount</b>: {/* Add refund amount here */}
          </div>
          <div>
            <b>Total Fare</b>: {/* Add total fare here */}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="mt-8">
    <h3 className="text-xl font-bold mb-4">
      Select the Trips and Passengers to Cancel
    </h3>
    {fullBookingData?.itemInfos?.AIR?.tripInfos?.map(
      (trip, tripIndex) => {
        console.log({ trip });
        return (
          <div key={tripIndex} className="space-y-4">
            <div>
              <div className="selected-trips-container">
                <div className="p-2 rounded-lg flex flex-col">



                </div>
              </div>
            </div>
          </div>
        );
      }
    )