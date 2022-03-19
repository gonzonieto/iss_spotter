const request = require('request-promise-native');

const fetchMyIP = () => {
  return request('https://api.ipify.org/?format=json');
};

const fetchCoordsByIP = (body) => {
  const ip = JSON.parse(body).ip;
  return request(`https://api.freegeoip.app/json/${ip}?apikey=a132a880-a752-11ec-adf2-73450cb58a54`);
};

const fetchISSFlyOverTimes = (body) => {
  const { latitude, longitude } = JSON.parse(body);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(body => fetchCoordsByIP(body))
    .then(body => fetchISSFlyOverTimes(body));
};

module.exports = { nextISSTimesForMyLocation };