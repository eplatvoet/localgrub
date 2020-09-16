$(document).ready(() => {
  //GET THE USER NAME FROM DATABASE.
  function getUserName() {
    $.get("/api/user_data").then(data => {
      const memberName = document.querySelector(".member-name").textContent = data.name;
      const memberId = document.querySelector(".member-id").setAttribute("value", data.id);
      // $(".member-name").text(data.name);
      // $(".member-id").text(`Your ID is ${data.id}`);
      // $(".member-id").attr("value", data.id);
    });
  }

  // CLICKON EVENT TO RECEIVE CITY/STATE WHAT USER INPUT.
  const sumbitButton = document.querySelector(".submit-button");
  sumbitButton.addEventListener("click", event => {
    // $(".submit-button").on("click", event => {
    event.preventDefault()

    const cityInput = document.querySelector("#city-input").value.trim();
    const stateInput = document.querySelector("#state-input").value.trim();
  
    getSearch(cityInput, stateInput);
    // getStaticMap(cityInput, stateInput);
    // save users input to backend.
  });

  // GETTING THE CITY LATITUDE AND LONGITUDE USING USERS INPUT
  function getSearch(city, state) {
    $.ajax({
      url: "/api/search/",
      method: "GET",
      data: {
        city: city,
        state: state
      }
    }).then(data => {
      const lat = data[0].locations[0].latLng.lat;
      const lon = data[0].locations[0].latLng.lng;
      getRestaurants(lat, lon);
    })
    .catch(error => {
      console.error(error);
    });
  }

  // CURRENTLY NOT USING, BUT POSSIBLY USE FOR FUTRE
  // PRINTS OUT THE STATIC MAP 
  // function getStaticMap(city, state) {
  //   $("#map-render").empty();
  //    const apiKey = "";
  //   const queryURL = `https://www.mapquestapi.com/staticmap/v5/map?key=${apiKey}&center=${city},${state}&size=400,200@2x`;
  //   var imgEl = document.createElement("img");
  //   imgEl.setAttribute(`src`, `${queryURL}`);
  //   $("#map-render").append(imgEl);
  //   $(".hide").show();
  // }

  // GETTING THE ARRAYS OF RESTAURANTS USING AXIOS.
  function getRestaurants(lat, lon) {
    $.ajax({
      url: "/api/zomato/search/",
      method: "GET",
      data: {
        lat: lat,
        lon: lon
      }
    })
      .then(response => {
        displaySearch(response);
        getPinnedMap(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // LOOK FOR LAT/LON FOR EACH RESTAURANT AND USE THOSE TO MARK MAP AND PRINT STATIC MAP.
  function getPinnedMap(data) {
    $("#map-render").empty();
    let emptyStr = "";
    for (i = 0; i < data.restaurants.length; i++) {
      emptyStr += `${data.restaurants[i].restaurant.location.latitude},${data.restaurants[i].restaurant.location.longitude}||`;
    }
    const apiKey = "6kkUl9f91C5XxAWQvi59a4QnmpZMljcM";
    const queryURL = `https://www.mapquestapi.com/staticmap/v5/map?locations=${emptyStr}&size=400,200@2x&key=${apiKey}&defaultMarker=marker-9df2f0-ff073a-sm&`;
    const imgEl = document.createElement("img");
    imgEl.setAttribute(`src`, `${queryURL}`);
    $("#map-render").append(imgEl);
    $(".hide").show();
  }

  // DISPLAYS THE SEARCH WITH CARDS DYNAMICALLY CREATE
  // WILL ALSO FILTER OUT THE CHAIN-RESTAURANTS THAT ARE LISTED ON ARRAY.
  function displaySearch(res) {
    $(".start-row").empty();
    const displaySearchRestaurant = [];
    const removeArr = [
      "Wawa",
      "KFC",
      "Red Lobster",
      "Panera Bread",
      "Taco Bell",
      "Pizza Hut",
      "McDonald's",
      "Subway",
      "Domino's Pizza",
      "Papa John's Pizza",
      "Burger King",
      "Starbucks",
      "Dunkin' Donuts",
      "Dunkin'",
      "Olive Garden",
      "Dairy Queen"
    ];
    for (i = 0; i < res.restaurants.length; i++) {
      if (removeArr.indexOf(res.restaurants[i].restaurant.name) === -1) {
        displaySearchRestaurant.push(createNewDisplay(res.restaurants[i]));
      }
    }
    $(".start-row").append(displaySearchRestaurant);
  }

  // FUNCTION TO CREATE CARDS TO FILL OUT SEARCH RESULTS
  function createNewDisplay(data) {
    const newCol = $("<div class='col-md-3'>");
    const newCard = $("<div class='card restaurant-card'>");
    const newCardBody = $("<div class='card-body'>");
    const restName = $("<h4>");
    const restAddress = $("<p>");
    const restCuisine = $("<p>");
    const newCardFooter = $("<div class='card-footer'>");
    const saveButton = $("<button>");

    restName.text(data.restaurant.name);
    restAddress.text(data.restaurant.location.address);
    restCuisine.text(data.restaurant.cuisines);
    saveButton.attr("id", data.restaurant.R.res_id);
    saveButton.attr("class", "btn btn-primary btn-sm");
    saveButton.text("Save This Restaurant");

    $(newCol).append(newCard);
    $(newCard).append(newCardBody);
    $(newCardBody).append(restName);
    $(newCardBody).append(restAddress);
    $(newCardBody).append(restCuisine);
    $(newCardFooter).append(saveButton);
    $(newCard).append(newCardFooter);
    return newCol;
  }

  // CLICK ONEVENT FUNCTION WHICH WILL SAVES THE DATA INTO MYSQL
  $(".start-row").on("click", "button", function() {
    const resId = $(this).attr("id");
    $.ajax({
      url: "/api/zomato/searchbyone",
      method: "GET",
      data: {
        resId: resId
      }
    })
    .then(res => {
      // console.log('current work',res);
      saveRestaurant(res);
    })
    .catch(error => {
      console.log(error);
    })
  });

  function saveRestaurant(data) {
    // console.log(data);
    $.post({
      url: "/api/restaurant",
      method: "POST",
      data: {
        shop_name: data.name,
        latitude: data.location.latitude,
        longitude: data.location.longitude,
        address: data.location.address,
        hours: data.timings,
        cost_for_two: data.average_cost_for_two,
        shop_url: data.url,
        cuisines: data.cuisines,
        highlights: data.highlights,
        shop_image: data.featured_image,
        id: $(".member-id").attr("value")
      }
    })
    .then(res => {
      console.log('after post',res);
    })
    .catch(err => {
      console.log(err);
    })
  }

  // moved axios calls to the backend.
  // axios({
  //   method: "GET",
  //   url: "https://developers.zomato.com/api/v2.1/restaurant",
  //   headers: {
  //     "content-type": "application/octet-stream",
  //     user_key: "723c59fca106ce1599f751dc65a0c43f",
  //     useQueryString: true
  //   },
  //   params: {
  //     res_id: resId
  //   }
  // }).then(res => {
  //   $.post("/api/restaurant", {
  //     shop_name: res.data.name,
  //     latitude: res.data.location.latitude,
  //     longitude: res.data.location.longitude,
  //     address: res.data.location.address,
  //     hours: res.data.timings,
  //     cost_for_two: res.data.average_cost_for_two,
  //     shop_url: res.data.url,
  //     cuisines: res.data.cuisines,
  //     highlights: res.data.highlights,
  //     shop_image: res.data.featured_image,
  //     id: $(".member-id").attr("value"),
  //   })
  //     .then(
  //       console.log("You have succesfully saved the restaurant.\n", res.data)
  //     )
  //     .catch(error => {
  //       console.error(error);
  //     });
  // });
  
  getUserName();
});