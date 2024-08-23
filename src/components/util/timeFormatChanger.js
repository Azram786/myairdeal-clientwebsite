const timeFormatChanger = (dateString) => {
    
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
};

export default timeFormatChanger;
