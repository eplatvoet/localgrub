


var authKey = process.env.MisterJayKayMap;
var cityName = "Denver";
var stateInitials = "CO";
var numOfMatches = parseInt(4);
var radius = parseInt(1);


var queryOne = `https://www.mapquestapi.com/search/v2/radius?origin=${cityName},+${stateInitials}&radius=${radius}maxMatches=${numOfMatches}&ambiguities=ignore&hostedData=mqap.ntpois|group_sic_code=?|581208&outFormat=json&key=${authKey}`;

var queryTwo = `https://www.mapquestapi.com/staticmap/v5/map?key=${authKey}&center=${cityName},${stateInitials}&size=600,400@2x`


runCurrentQuery(queryOne);
//Gather restaruant data in a search radius
function runCurrentQuery(queryURL) {
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    console.log(response);
  });
}

//produce static map
function produceMap (queryTwo) {
  $.ajax({
    url: queryTwo,
    method: "GET",
  }).then(function(response) {
    console.log(response);
  });
}



//SEARCH BUTTON ON CLICK
// $("#city-search").on("click", function () {
//   let cityName = $("#search").val().trim();
//   let stateInitials = $("#search").val().trim();
//   let radius = $("#search").val().trim();
//   let numOfMatches = parseInt(10);
//   let poi = $("#search").val().trim();

//   //Mapquest AJAX
