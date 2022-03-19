// will require and run our main fetch function

const nextISSTimesForMyLocation = () => {
  const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require('./iss');

  fetchMyIP((fetchIPError, ip) => {
    if (fetchIPError) return console.log("Unable to fetch IP. Error:", fetchIPError);

    fetchCoordsByIP(ip, (fetchCoordsError, geoData) => {
      if (fetchCoordsError) return console.log("Unable to fetch coordinates. Error: " + fetchCoordsError);

      console.log("IP:", ip);
      console.log();
      console.log("Latitude:", geoData.latitude);
      console.log("Longitude:", geoData.longitude);
      console.log();

      fetchISSFlyOverTimes(geoData, (flyOverError, flyOverTimes) => {
        if (flyOverError) return console.log(flyOverError);

        flyOverTimes.forEach((pass) => {
          const dateTime = new Date(0);
          dateTime.setUTCSeconds(pass.risetime);
          
          const duration = pass.duration;
          console.log(`Next pass at ${dateTime} for ${duration} seconds!`);
          // console.log(`Next pass at ${dateTime.toLocaleString('en-GB', { timezone: "America/Toronto"})} for ${duration} seconds!`);
        });

        // console.log("\nIslamic calendar:");
        // flyOverTimes.forEach((pass) => {
        //   const dateTime = new Date(0);
        //   dateTime.setUTCSeconds(pass.risetime);
          
        //   const duration = pass.duration;
        //   console.log(`Next pass at ${dateTime.toLocaleString('en-GB-u-ca-islamic', { timezone: "America/Toronto"})} for ${duration} seconds!`);
        // });
      });
    });
  });
};

nextISSTimesForMyLocation();