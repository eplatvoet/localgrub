// This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  // getting the users name to display.
  function getUserName() {
    $.get("/api/user_data").then((data) => {
      $(".member-name").text(data.name);
      console.log("whatisthis", data);
    });
  }

  $(".submit-button").on("click", function(event) {
    event.preventDefault();

    var cityInput = $("#city-input").val().trim();
    var stateInput = $("#state-input").val().trim();
    console.log(cityInput, stateInput);
    
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
        console.log("data", data);
        console.log("latitute", data.results[0].locations[0].latLng.lat); // latitude of city
        console.log("longitude", data.results[0].locations[0].latLng.lng); // longitude of city
        
        let lat = data.results[0].locations[0].latLng.lat;
        let lon = data.results[0].locations[0].latLng.lng;
        getRestaurants(lat, lon);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // bring out static map. didn't work on pinned locations
  //   function getStaticMap(city, state) {
  //     const apiKey = "6kkUl9f91C5XxAWQvi59a4QnmpZMljcM";
  //     const queryURL = `https://www.mapquestapi.com/staticmap/v5/map?key=${apiKey}&center=${city},${state}&size=600,400@2x`;
  //     $.ajax({
  //         url: queryURL,
  //         method: "GET",
  //     }).then((res) => {
  //         // console.log(res) // displays map.
  //         var data = res;
  //         $("#map-render").html(`<img src='${data}'>`);
  //         console.log("done") .catch((error) => {
  //             console.error(error);
  //           });
  //   })
  //   }

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
    console.log('response',response.data);
    console.log('list',response.data.restaurants[0]) // restaurant

        // render to html placeholders.
    })
    .catch((error) => {
      console.log(error)
    })
}




  getUserName();
