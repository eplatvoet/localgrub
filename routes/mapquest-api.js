const axios = require("axios");
require('dotenv').config();

module.exports = function(app) {
  app.get("/api/search/", (req, res) => {

    axios.get(
      "https://www.mapquestapi.com/geocoding/v1/address", {
      params: {
        key: process.env.MQ_KEY,
        city: req.query.city,
        state: req.query.state
      }
    })
      .then(function(response) {
        res.json(response.data.results);
      })
      .catch((err) => {
        res.status(404).json(err);
        console.log('error message:\n',err);
      });
  });
};
