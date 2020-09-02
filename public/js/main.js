

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
     
    }).catch((error) => {
        console.error(error);
      });
  })

getUserName();