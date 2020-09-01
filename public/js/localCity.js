$(document).ready(function () {

//VARIABLES/Parameters
var authKey = "";
var citySearch = "";

//DYNAMICALLY CREATE BUTTONS BASED ON SEARCH
  function createButton(citySearch) {
    var newButton = $("<button>");
    newButton.addClass("btn btn-secondary");
    newButton.attr("type", "button");
    newButton.html(citySearch);
    $("#btn-group").prepend(newButton);

    newButton.on("click", function () {
      citySearch = newButton.html();
      newCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${authKey}`;
      runCurrentQuery(newCurrentWeather);
      $(".card").removeClass("hide");
      $(".future-forecast").removeClass("hide");
    });
  }

  //
  function runCurrentQuery(queryURL) {
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {


    });

  }

});