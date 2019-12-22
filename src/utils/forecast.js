const request = require("request");

const forecast = (long, lat, callback) => {
  const url = `https://api.darksky.net/forecast/a3dd7647a87af518202324c32cf5f93b/${lat},${long}`;
  request({ url: url, json: true }, (error, response) => {
    console.log(response.body);
    if (error) {
      callback("theres been a problem", undefined);
    } else if (response.body.error) {
      callback("not results found", undefined);
    } else {
      const {
        temperature,
        precipProbability,
        summary
      } = response.body.currently;
      callback(
        undefined,
        `it is currently ${summary} and ${temperature} degrees out. there is a ${precipProbability}% chance of rain`
      );
    }
  });
};

module.exports = forecast;
