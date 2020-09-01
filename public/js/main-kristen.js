//$(document).ready(() => {

const axios = require("axios");
require('dotenv').config();
//Need to require Jong's lat and long

//search from Zomato:
function restaurantSearch(lat, lon) {
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
      //all Restaurant Details
      //console.log(JSON.stringify(response.data.restaurants[0], null, 2));
      
      //${"#shop-name"}.text(JSON.stringify(response.data.restaurants[0].name, null, 2)) 
      console.log(JSON.stringify(response.data.restaurants[0].restaurant.name));
      //${"#shop-image"}
      console.log(JSON.stringify(response.data.restaurants[0].restaurant.featured_image));


      //${"#shop-details"}
      console.log(JSON.stringify(response.data.restaurants[0].restaurant.name)); //name
      console.log(JSON.stringify(response.data.restaurants[0].restaurant.location.locality)); //neighborhood
      console.log(JSON.stringify(response.data.restaurants[0].restaurant.location.address)); //address
      console.log(JSON.stringify(response.data.restaurants[0].restaurant.timings));// Hours
      console.log(JSON.stringify(response.data.restaurants[0].restaurant.average_cost_for_two));//average cost for two
      console.log(JSON.stringify(response.data.restaurants[0].restaurant.cuisines));//cuisines/type of food served
      console.log(JSON.stringify(response.data.restaurants[0].restaurant.highlights));//quick facts
      console.log(JSON.stringify(response.data.restaurants[0].restaurant.menu_url)); //url to menu

      console.log(JSON.stringify(response.data.restaurants[0].restaurant.all_reviews_count));//number of reviews
      console.log(JSON.stringify(response.data.restaurants[0].restaurant.all_reviews.reviews));//api reviews, will return an empty array if there are no reviews.

    })
    .catch((error)=>{
      console.log(error)
    })
}

let lat = 41.5487650000;
let lon = -8.4269580000;
restaurantSearch(lat, lon);