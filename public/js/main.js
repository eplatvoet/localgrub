

function getUserName() {
    $.get("/api/user_data").then((data) => {
      $(".member-name").text(data.name);
      $(".member-id").text(`Your ID is ${data.id}`);
      $(".member-id").attr("value", data.id);
      renderAllBookmark(data.id);
    });
  }

// rendering all bookmarks using get method.
function renderAllBookmark(userId) {
  // console.log('userId', userId);
  $.get("/api/users/" + userId, function(data) {
    bookmarkRestaurant(data);
  });
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
  $(newliEl)
    .addClass("list-group-item")
    .text(data.shop_name)
    .attr("id", data.id);
  return newliEl;
}

$(".bookmarks").on("click", "li", function () {
    var restaurantID = ($(this).attr("id"));
    console.log('id\n',$(this).attr("id"));
    $.get("/api/restaurant/" + restaurantID)
    .then((res) => {
    console.log("result \n",res);
    renderInfo(res.address, res.shop_name, res.shop_url);
    renderImage(res.shop_image);
    }).catch((error) => {
        console.error(error);
      });
  })

function renderInfo(address, name, url) {
    $("#shop-details").empty();
    var title = $("<h4>");
    var pElOne = $("<p>");
    var pElTwo = $("<p>");

    $(title).text(name);
    $(pElOne).text(address);
    $(pElTwo).text(url);

    $("#shop-details").append(title);
    $("#shop-details").append(pElOne);
    $("#shop-details").append(pElTwo);
}

function renderImage(image) {
    $("#shop-image").empty();
    var imgEl = $("<img>");
    $(imgEl).attr("src", image);
    $(imgEl).attr("class", "card-img");
    $("#shop-image").append(imgEl);
}

getUserName();