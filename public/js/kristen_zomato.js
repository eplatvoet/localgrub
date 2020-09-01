const axios = require("axios");
require('dotenv').config();

//search from Zomato:
function getCities(userSearch) {
axios({
    "method":"GET",
    "url":"https://developers.zomato.com/api/v2.1/search",
    "headers":{
    "content-type":"application/json",
    "user_key": "723c59fca106ce1599f751dc65a0c43f"
    },
    "params":{
    "query": userSearch
    }
    })
    .then((response)=>{
      console.log(JSON.stringify(response.data.restaurants[0], null, 2));
    })
    .catch((error)=>{
      console.log(error)
    })
}

let userSearch = "Toronto"
getCities(userSearch);
//Search button Onclick
// $("#city-search").on("click", function () {
//     let cityName = $("#search").val().trim();
//     getCities(cityName);
// });