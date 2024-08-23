function totalflightDurationChecking(flightData) {
    let totalDuration = 0;
    let layoverTime = 0;
    let flightDetails = [];

    flightData.forEach((journey, journeyIndex) => {
        let journeyDuration = 0;
        let journeyLayover = 0;

        journey.sI.forEach((segment, index) => {
            journeyDuration += segment.duration;

            if (index < journey.sI.length - 1) {
                const currentArrival = new Date(segment.at);
                const nextDeparture = new Date(journey.sI[index + 1].dt);
                const layover = (nextDeparture - currentArrival) / (1000 * 60); // Convert to minutes
                journeyLayover += layover;
            }

            flightDetails.push({
                flightNumber: segment.fD.fN,
                from: segment.da.city,
                to: segment.aa.city,
                duration: segment.duration
            });
        });

        totalDuration += journeyDuration + journeyLayover;
        layoverTime += journeyLayover;

    

        flightDetails = []; // Reset for next journey
    });

    
}

// Use the function
export default totalflightDurationChecking