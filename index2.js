const { nextISSTimesForMyLocation } = require('./iss_promised');

const printPassTimes = (body) => {
  const passes = JSON.parse(body).response;

  passes.forEach(pass => {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(pass.risetime);
    
    const duration = pass.duration;
    console.log(`Next pass at ${dateTime} for ${duration} seconds!`);
  });
};

nextISSTimesForMyLocation()
  .then(body => {
    printPassTimes(body);
  })
  .catch(error => {
    console.log("The request failed.");
    console.log("Error:", error);
  });