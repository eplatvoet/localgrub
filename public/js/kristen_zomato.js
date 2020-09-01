const axios = require("axios");
require('dotenv').config();

//search from Zomato:
function getCities(lat, lon) {
axios({
    "method":"GET",
    "url":"https://developers.zomato.com/api/v2.1/search",
    "headers":{
    "content-type":"application/json",
    "user_key": "723c59fca106ce1599f751dc65a0c43f"
    },
    "params":{
    "lat": lat,
    "lon": lon
    }
    })
    .then((response)=>{

      console.log(JSON.stringify(response.data.restaurants[0], null, 2));
    })
    .catch((error)=>{
      console.log(error)
    })
}

let lat = 41.5487650000;
let lon = -8.4269580000;
getCities(lat, lon);


//Search button Onclick
// $("#city-search").on("click", function () {
//     let cityName = $("#search").val().trim();
//     getCities(cityName);
// });