$(document).ready(() => {
  // getting the users name to display.
  function getUserName() {
    $.get("/api/user_data").then((data) => {
      $(".member-name").text(data.name);
    });
  }

  $(".submit-button").on("click", function(event) {
    event.preventDefault();

    var cityInput = $("#city-input").val().trim();
    var stateInput = $("#state-input").val().trim();
    
    getSearch(cityInput, stateInput);
    getStaticMap(cityInput, stateInput);
    // save users input to backend.
  });

  // getting the lat and lon for the user's searched city.
  function getSearch(city, state) {
    const apiKey = "6kkUl9f91C5XxAWQvi59a4QnmpZMljcM";
    const queryURL = `https://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${city},${state}`;
    $.ajax({
      url: queryURL,
      method: "GET",
    })
      .then((data) => {
        // console.log("latitute", data.results[0].locations[0].latLng.lat); // latitude of city
        // console.log("longitude", data.results[0].locations[0].latLng.lng); // longitude of city
        
        let lat = data.results[0].locations[0].latLng.lat;
        let lon = data.results[0].locations[0].latLng.lng;
        getRestaurants(lat, lon);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // bring out static map. didn't work on pinned locations
  function getStaticMap(city, state) {
    const apiKey = "6kkUl9f91C5XxAWQvi59a4QnmpZMljcM";
    const queryURL = `https://www.mapquestapi.com/staticmap/v5/map?key=${apiKey}&center=${city},${state}&size=400,200@2x`;
    var imgEl = document.createElement("img");
    imgEl.setAttribute(`src`, `${queryURL}`);
    $("#map-render").append(imgEl);
  }

  function getRestaurants(lat, lon) {
  axios({
    "method":"GET",
    "url":"https://developers.zomato.com/api/v2.1/search",
    "headers":{
    "content-type":"application/octet-stream",
    "user_key": "723c59fca106ce1599f751dc65a0c43f",
    "useQueryString":true
    },
    "params":{
    "lat": `${lat}`,
    "lon": `${lon}`
    }
    })
    .then((response)=>{
    console.log('list',response.data.restaurants[0]) // restaurant
    // all Restaurant Details
    //console.log(JSON.stringify(response.data.restaurants[0], null, 2));
    //
    $("#shop-name").text((response.data.restaurants[0].name, null, 2));

    $("#shop-image").html(`<img src=${response.data.restaurants[0].restaurant.featured_image}`)
  
    //${"#shop-details"}
    console.log(JSON.stringify(response.data.restaurants[0].restaurant.name)); //name
    console.log(JSON.stringify(response.data.restaurants[0].restaurant.location.locality)); //neighborhood
    console.log(JSON.stringify(response.data.restaurants[0].restaurant.location.address)); //address
    console.log(JSON.stringify(response.data.restaurants[0].restaurant.timings));// Hours
    console.log(JSON.stringify(response.data.restaurants[0].restaurant.average_cost_for_two));//average cost for two
    

    console.log(
      JSON.stringify(response.data.restaurants[0].restaurant.cuisines)
    ); //cuisines/type of food served
    console.log(
      JSON.stringify(response.data.restaurants[0].restaurant.highlights)
    ); //quick facts
    
    //url to menu
    $("#menu-preview").attr("src", (response.data.restaurants[0].restaurant.menu_url));
   

    // var resName = response.data.restaurants[0].restaurant.name;
    // var resCuisines = response.data.restaurants[0].restaurant.cuisines;
    // var resAddress = response.data.restaurants[0].restaurant.location.address ;
    // var resUrl = response.data.restaurants[0].restaurant.url;
    // var resPhotoUrl = response.data.restaurants[0].restaurant.featured_image;
    // console.log(resPhotoUrl);
    // // thumb = thumbnails
    // // featured_image = image

    // $(".content-one-a").text(`Restaurant Name: ${resName}`);
    // $(".content-one-b").text(`Type of cuisine: ${resCuisines}`);
    // // $(".content-one-c").text(resAddress);
    // var aEl = $("<a>");
    // $(aEl).attr("href",resUrl);
    // $(aEl).text("Link to Website");
    // $(".content-one-b").append(aEl);
    // $(".content-one-c").text(`Address: ${resAddress}`);
    // var imgEl = $("<img>");
    // $(imgEl).attr("src",resPhotoUrl).attr("alt","restaurant-photo");
    // $(".content-one-c").append(imgEl);
    // $(".content-one-d").text(resUrl);
        // render to html placeholders.
    })
    .catch((error) => {
      console.log(error)
    })
}


  getUserName();
});