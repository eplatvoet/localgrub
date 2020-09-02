// This file just does a GET request to figure out which user is logged in
// and updates the HTML on the page

// getting the users name to display.
function getUserName() {
  $.get("/api/user_data").then((data) => {
    $(".member-name").text(data.name);
    $(".member-id").text(`Your ID is ${data.id}`);
    $(".member-id").attr("value", data.id);
    renderAllBookmark(data.id);
  });
  
}

$(".submit-button").on("click", function(event) {
  event.preventDefault();

  var cityInput = $("#city-input")
    .val()
    .trim();
  var stateInput = $("#state-input")
    .val()
    .trim();

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
  $("#map-render").empty();
  const apiKey = "6kkUl9f91C5XxAWQvi59a4QnmpZMljcM";
  const queryURL = `https://www.mapquestapi.com/staticmap/v5/map?key=${apiKey}&center=${city},${state}&size=400,200@2x`;
  var imgEl = document.createElement("img");
  imgEl.setAttribute(`src`, `${queryURL}`);
  $("#map-render").append(imgEl);
}

function getRestaurants(lat, lon) {
  axios({
    method: "GET",
    url: "https://developers.zomato.com/api/v2.1/search",
    headers: {
      "content-type": "application/octet-stream",
      user_key: "723c59fca106ce1599f751dc65a0c43f",
      useQueryString: true,
    },

    "params":{
    "lat": `${lat}`,
    "lon": `${lon}`
    }
    })
    .then((response)=>{
    console.log('list',response.data.restaurants[0]) // restaurant

    var resNameOne = response.data.restaurants[0].restaurant.name;
    var resultOne = response.data.restaurants[0].restaurant;
    displaySearch(response.data);
    // THIS FUNCTION DISPLAYS WHAT FIRST RES RESULT AND
    // IF YOU CLICK IT WILL STORE ITS OWN DATA INTO MYSQL
  })
  .catch((error) => {
    console.log(error);
  });
}

    function displaySearch(res) {
      // console.log('display search', res);
      console.log('length', res.restaurants);
    var displaySearchRestaurant = [];
    // for (i = 0; i < res.restaurants.length; i++) {
    for (i = 0; i < res.restaurants.length; i++) {
      displaySearchRestaurant.push(createNewDisplay(res.restaurants[i]));
    }
    $(".start-row").append(displaySearchRestaurant);
    }

    function createNewDisplay(data) {
      console.log('what the data each data is ', data);
      var newCol = $('<div class="col-md-3">');
      var newCard = $('<div class="card restaurant-card">');
      var newCardBody = $('<div class="card-body">');
      var restName = $("<h4>");
      var restAddress = $("<p>");
      var restCuisine = $("<p>");
      var newCardFooter = $("<div class='card-footer'>")
      var saveButton = $("<button>");

      restName.text(data.restaurant.name);
      restAddress.text(data.restaurant.location.address);
      restCuisine.text(data.restaurant.cuisines);
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

    // var hTag = $("<h4>");
    // var buttonOne = $("<button>").attr("class", "result-one").text("Save");
    // $(hTag).text(resNameOne);
    // $(".card-one").append(hTag);
    // $(hTag).append(buttonOne);

    // Click event on function
    $(".result-one").on("click", function() {
      $.post("/api/restaurant", {
        shop_name: response.data.restaurants[0].restaurant.name,
        address: response.data.restaurants[0].restaurant.location.address,
        latitude: response.data.restaurants[0].restaurant.location.latitude,
        longitude: response.data.restaurants[0].restaurant.location.longitude,
        shop_url: response.data.restaurants[0].restaurant.url,
        api_review:
          response.data.restaurants[0].restaurant.user_rating.rating_text,
        api_rating:
          response.data.restaurants[0].restaurant.user_rating
            .aggregate_rating,
        id: $(".member-id").attr("value"),
      })
      // .then(bookmarkRestaurant(response.data.restaurants[0].restaurant.name))
        .then(function() {
          console.log("You have succesfully stored this result.");
        })
        .catch((error) => {
          console.error(error);
        });
    });


// getting unique restaurant information
$(".bookmarks").on("click", "li", function () {
  var restaurantID = ($(this).attr("id"))
  $.get("/api/restaurant/" + restaurantID)
  .then(() => {
    console.log("successful")
  })
  .catch((error) => {
    console.log(error);
  });
})


// rendering all bookmarks using get method.
function renderAllBookmark(userId) {
  // console.log('userId', userId);
  $.get("/api/users/" + userId, function(data) {
    bookmarkRestaurant(data);
  })
}

// after getting datas from database, it is now looping thru all of it to create each list.
function bookmarkRestaurant(data) {
  $(".bookmarks").empty();
  var allRestaurantList = [];
  for (var i = 0; i < data.length; i++) {
    allRestaurantList.push(createNewList(data[i]));
  }
  $(".bookmarks").append(allRestaurantList);
}

// create <li> with what restaurant name is 
function createNewList(data) {
  var newliEl = $("<li>");
  $(newliEl).addClass("list-group-item").text(data.shop_name).attr("id", data.id);
  return newliEl;
}

getUserName();
