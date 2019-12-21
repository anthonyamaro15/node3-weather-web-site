const request = require("request");

const geocode = (adress, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${adress}.json?access_token=pk.eyJ1IjoiYW1hcm8xNTEiLCJhIjoiY2s0N2l6a3MwMHV1ejNqcDUweTN5bmZzeCJ9.wdg3FxeNYz6_rXtwIDEjQw`;
  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("unable to connect to internet", undefined);
    } else if (response.body.features.length === 0) {
      callback("results not found", undefined);
    } else {
      const { place_name, center } = response.body.features[0];
      const [long, lat] = center;
      callback(undefined, {
        long,
        lat,
        place_name
      });
    }
  });
};

module.exports = geocode;
