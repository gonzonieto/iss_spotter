// will contain most of the logic for fetching the data from each API endpoint

const request = require('request');

const fetchMyIP = (callback) => {
  request('https://api.ipify.org/?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}.`;
      return callback(Error(msg), null);
    }

    if (body) {
      callback(null, JSON.parse(body).ip);
    }
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://api.freegeoip.app/json/${ip}?apikey=a132a880-a752-11ec-adf2-73450cb58a54`, (error, response, geoData) => {
    if (error) return callback(error, null);
    
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates. Response: ${geoData}.`;
      return callback(Error(msg), null);
    }

    callback(null, JSON.parse(geoData));
  });
};

const fetchISSFlyOverTimes = (geoData, callback) => {
  const lat = geoData.latitude;
  const lon = geoData.longitude;
  request(`https://iss-pass.herokuapp.com/json/?lat=${lat}&lon=${lon}`, (error, response, flyOver) => {
  
    if (error) {
      console.log("In here!");
      return callback(error, null);
    };

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching flyover times. Response: ${flyOver}.`;
      return callback(Error(msg), null);
    }
    
    callback(null, JSON.parse(flyOver).response);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };