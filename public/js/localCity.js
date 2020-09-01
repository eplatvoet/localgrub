$(document).ready(function () {

$("#city-search")
//VARIABLES/Parameters
var authKey = "MisterJayKayMap";

//DYNAMICALLY CREATE BUTTONS BASED ON SEARCH
  function createButton(citySearch) {
    var newButton = $("<button>");
    newButton.addClass("btn btn-secondary");
    newButton.attr("type", "button");
    newButton.html(citySearch);
    $("#btn-group").prepend(newButton);

    newButton.on("click", function () {
      citySearch = newButton.html();
      newCurrentWeather = ``;
      runCurrentQuery(newCurrentWeather);
      $(".card").removeClass("hide");
      //$(".future-forecast").removeClass("hide");
    });
  }

  //Calling Map
  function runCurrentQuery(queryURL) {
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {


    });

  }

});


//SEARCH BUTTON ON CLICK
$("#city-search").on("click", function () {
  let cityName = $("#search").val().trim();
  let stateInitials = $("#search").val().trim();
  let radius = $("#search").val().trim();
  let numOfMatches = $("#search").val().trim();
  let poi = $("#search").val().trim();
  
  var latestQuery = `https://www.mapquestapi.com/search/v2/radius?origin=${cityName},+${stateInitials}&radius=${radius}maxMatches=${numOfMatches}&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|581208&outFormat=json&key=${authKey}`;
})

