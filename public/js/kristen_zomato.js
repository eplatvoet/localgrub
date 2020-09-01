const axios = require("axios");

//Use userSearch to get:
//cities
//

//getCities from Zomato:
function getCities(userSearch) {
axios({
    "method":"GET",
    "url":"https://developers.zomato.com/api/v2.1/locations?query=newyork",
    "headers":{
    "content-type":"application/octet-stream",
    "user_key": MisterJayKayZomato,
    "useQueryString":true
    },
    "params":{
    "query": userSearch
    }
    })
    .then((response)=>{
    //console.log(response.data)
      var data = JSON.stringify(response.data, null, 2);
      console.log('what data is ',data);
      //grab city ID
      var cityID = response[0].id;

    })
    .catch((error)=>{
      console.log(error)
    })
}

//Use City ID to get:
//establishment type like bar, cafe, casual dining, etc.
//cuisine type
//
//
function getReviews() {

}




//Search button Onclick
$("#city-search").on("click", function () {
    let cityName = $("#search").val().trim();

    getCities(cityName);

});