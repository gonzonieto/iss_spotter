// will require and run our main fetch function

const nextISSTimesForMyLocation = () => {
  const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

  fetchMyIP((fetchIPError, ip) => {
    if (fetchIPError) return console.log("Unable to fetch IP. Error:", fetchIPError);

    fetchCoordsByIP(ip, (fetchCoordsError, geoData) => {
      if (fetchCoordsError) return console.log("Unable to fetch coordinates. Error: " + fetchCoordsError);

      fetchISSFlyOverTimes(geoData, (flyOverError, flyOverTimes) => {
        if (flyOverError) return console.log(flyOverError);

        console.log("IP:", ip);

        flyOverTimes.forEach((pass) => {
          const dateTime = new Date(0);
          dateTime.setUTCSeconds(pass.risetime);
          
          const duration = pass.duration;
          console.log(`Next pass at ${dateTime} for ${duration} seconds!`);
        });
      });
    });
  });
};

nextISSTimesForMyLocation();