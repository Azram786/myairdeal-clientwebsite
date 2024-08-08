const getCountryCode = (city) => {
    return city.split('-')[0];
};


export default getCountryCode