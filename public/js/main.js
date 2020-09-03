$(document).ready(() => {
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

  $(".bookmarks").on("click", "li", function() {
    var restaurantID = $(this).attr("id");
    console.log("id\n", $(this).attr("id"));
    $.get("/api/restaurant/" + restaurantID)
      .then((res) => {
        console.log("result \n", res);
        renderInfo(res.address, res.shop_name, res.shop_url, res.hours, res.cost_for_two, res.cuisines, res.highlights);
        renderImage(res.shop_image);
        renderReview(res.id, res.user_review, res.user_rating);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  function renderInfo(address, name, url, hours, costForTwo, cuisines, highlights) {
    $("#shop-details").empty();
    var title = $("<h4>");
    var pElOne = $("<p>");
    var pElTwo = $("<a>");
    var pElThree = $("<p>");
    var pElFour = $("<p>");
    var pElFive = $("<p>");
    var pElSix = $("<p>");

    $(title).text(name);
    $(pElOne).text(address);
    $(pElTwo).attr("href", url).text(`Link to Restaurant`)
    $(pElThree).text(hours);
    $(pElFour).text(`Average cost for two: $${costForTwo}`);
    $(pElFive).text(`Cuisine: ${cuisines}`);
    $(pElSix).text(highlights.split(", "));

    $("#shop-details").append(title);
    $("#shop-details").append(pElOne);
    $("#shop-details").append(pElThree);
    $("#shop-details").append(pElFour);
    $("#shop-details").append(pElFive);
    $("#shop-details").append(pElSix);
    $("#shop-details").append(pElTwo);
  }

  function renderReview(id, review, rating) {
    $(".review-form").empty();
    var deleteBtn = $("<button>");
    var updateBtn = $("<button>");
    $(deleteBtn)
      .attr("value", id)
      .attr("class", "delete-btn buttons")
      .text("Delete");
    $(updateBtn)
      .attr("value", id)
      .attr("class", "update-btn buttons")
      .text("Update");
    $(".review-form").append(updateBtn);
    $(".review-form").append(deleteBtn);

    var reviewBody = $("<textarea>");
    $(reviewBody)
      .attr("id", "user-review")
      .attr("name", "review")
      .attr("placeholder", "Write Your Review")
      .attr(
        "style",
        "width:400px; height:200px; text-align:center; border: none;"
      );
    if (review !== null) {
      $(reviewBody).append(review);
    }
    $(".review-form").append(reviewBody);
    var ratingBody = $("<select>");
    $(ratingBody)
      .attr("name", "rating")
      .attr("id", "user-rating");
    var rateOne = $("<option>")
      .attr("value", 1)
      .text("1");
    var rateTwo = $("<option>")
      .attr("value", 2)
      .text("2");
    var rateThree = $("<option>")
      .attr("value", 3)
      .text("3");
    var rateFour = $("<option>")
      .attr("value", 4)
      .text("4");
    var rateFive = $("<option>")
      .attr("value", 5)
      .text("5");
    ratingBody.append(rateFive);
    ratingBody.append(rateFour);
    ratingBody.append(rateThree);
    ratingBody.append(rateTwo);
    ratingBody.append(rateOne);
    $(".review-form").append(ratingBody);
  }

  function renderImage(image) {
    $("#shop-image").empty();
    var imgEl = $("<img>");
    $(imgEl).attr("src", image);
    $(imgEl).attr("class", "card-img");
    $("#shop-image").append(imgEl);
  }

  // Delete Button
  $(document).on("click", "button.delete-btn", function() {
    var resId = $(".delete-btn").attr("value");
    deleteBookmark(resId);
  });

  function deleteBookmark(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/restaurant/del/" + id,
    })
      .then((res) => {
        console.log("result ", res);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  // var ratingInput = Need one
  // Update Button
  $(document).on("click", "button.update-btn", function() {
    var reviewInput = $("#user-review");
    var resId = $(".update-btn").attr("value");
    var newReview = {
      user_review: reviewInput.val().trim(),
      // user_rating: ratingInput
      //   .val()
      //   .trim(),
    };
    updateBookmark(resId, newReview);
  });

  function updateBookmark(id, review) {
    $.ajax({
      method: "PUT",
      url: "/api/restaurant/up/" + id,
      data: review,
    })
      .then(function() {
        window.location.href = "/main";
      })
      .catch((error) => {
        console.error(error);
      });
  }

  getUserName();
});
