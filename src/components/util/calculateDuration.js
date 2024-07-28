const calculateDuration = (departure, arrival) => {
    // if (!departure, arrival) return "NAN"
    const departureTime = new Date(departure);
    const arrivalTime = new Date(arrival);
    const durationMs = arrivalTime - departureTime;

    const totalMinutes = Math.floor(durationMs / 1000 / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes}m`;
};

export default calculateDuration