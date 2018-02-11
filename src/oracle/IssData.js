const request = require('request-promise');

const getData = async (place) => {
    const response = await request(`https://api.wheretheiss.at/v1/satellites/${place}`);
    const altitude = JSON.parse(response).altitude.toString();
    console.log("altitude=", altitude);
    return altitude;
};

module.exports = getData;
