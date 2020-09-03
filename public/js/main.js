$(document).ready(() => {
    //GET THE USER NAME FROM DATABASE
  function getUserName() {
    $.get("/api/user_data").then((data) => {
      $(".member-name").text(data.name);
      $(".member-id").text(`Your ID is ${data.id}`);
      $(".member-id").attr("value", data.id);
      renderAllBookmark(data.id);
    });
  }

  // GETTING DATA USING GET METHOD AND PASSING DATA TO ANOTHER FUNCTION
  function renderAllBookmark(userId) {
    $.get("/api/users/" + userId, function(data) {
      bookmarkRestaurant(data);
    });
  }

  // RECEIVES DATA FROM ANOTHER FUNCTION AND IT LOOPS THRU THE ALL OF IT AND CREATE EACH DATA INTO LIST.
  function bookmarkRestaurant(data) {
    $(".bookmarks").empty();
    var allRestaurantList = [];
    for (var i = 0; i < data.length; i++) {
      allRestaurantList.push(createNewList(data[i]));
    }
    $(".bookmarks").append(allRestaurantList);
  }

  // CREATING <LI> TAG FOR EACH SAVED RESTAURANTS
  function createNewList(data) {
    var newliEl = $("<li>");
    $(newliEl)
      .addClass("list-group-item")
      .text(data.shop_name)
      .attr("id", data.id);
      var linebreak = $("<br>");
    newliEl.append(linebreak);

    var deleteBtn = $("<button>");
    deleteBtn.text("X");
    deleteBtn.attr("class", "delete btn btn-sm").attr("value", data.id);
    newliEl.append(deleteBtn);
    return newliEl;
  }

  // DELETE BUTTON FOR LIST
  $(document).on("click", "button.delete", function() {
    var resId = $(this).attr("value");
    deleteBookmark(resId);
  });

  // ON CLICK EVENT TO GET THE DATA FROM BACKEND.
  $(".bookmarks").on("click", "li", function() {
    var restaurantID = $(this).attr("id");
    console.log("id\n", $(this).attr("id"));
    getSelectedRestaurant(restaurantID);
});

// FUNCTION TO RECEIVE DATA USING GET METHOD AND RENDERS USING 3 DIFFERENT FUNCITONS
function getSelectedRestaurant(id) {
    $.get("/api/restaurant/" + id)
      .then((res) => {
        console.log("result \n", res);
        renderInfo(res.address, res.shop_name, res.shop_url, res.hours, res.cost_for_two, res.cuisines, res.highlights);
        renderImage(res.shop_image);
        renderReview(res.id, res.user_review, res.user_rating);
      })
      .catch((error) => {
        console.error(error);
      });

    }
 
// RENDERS INFORMATION OF RESTAURANTS

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

  // RENDERS RESTAURANTS REVIEW
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
        "width:400px; height:200px; text-align:center; border: none; width: 90%;"
      );
    if (review !== null) {
      $(reviewBody).append(review);
    }
    $(".review-form").append(reviewBody);

    var linebreak = $("<br>");
    $(".review-form").append(linebreak);

    var ratingDisplay = $("<p>");
    switch(rating) {
        case 5: 
        ratingDisplay.text("😍😍😍😍😍");
        break;
        
        case 4: 
        ratingDisplay.text("😍😍😍😍");
        break;
       
        case 3: 
        ratingDisplay.text("😍😍😍");
        break;
       
        case 2: 
        ratingDisplay.text("😍😍");
        break;
        
        case 1: 
        ratingDisplay.text("😍");
        break;
    }
    $(".review-form").append(ratingDisplay);

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
  
  // RENDERS IMAGE THAT ARE PROVIDED FROM API
  function renderImage(image) {
    if (image === "") {
        $("#shop-image").empty();
        var imgEl = $("<img>");
        $(imgEl).attr("src", "./images/background.gif");
        $(imgEl).attr("class", "card-img");
        $("#shop-image").append(imgEl);
    } else {
        $("#shop-image").empty();
        var imgEl = $("<img>");
        $(imgEl).attr("src", image);
        $(imgEl).attr("class", "card-img");
        $("#shop-image").append(imgEl);
    }
  }

  // DELETE BUTTON
  $(document).on("click", "button.delete-btn", function() {
    var resId = $(".delete-btn").attr("value");
    deleteBookmark(resId);
  });

  // FUNCTION WHEN DELETE BUTTON IS CLICKED
  function deleteBookmark(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/restaurant/del/" + id,
    })
      .then((res) => {
        getUserName();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // UPDATE BUTTON
  $(document).on("click", "button.update-btn", function() {
    var reviewInput = $("#user-review");
    var ratingInput = $('#user-rating option:selected').val();
    var resId = $(".update-btn").attr("value");
    var newReview = {
      user_review: reviewInput.val().trim(),
      user_rating: ratingInput
    };
    updateBookmark(resId, newReview);
  });

  // FUNCTION WHEN UPDATE BUTTON IS CLICKED
  function updateBookmark(id, review) {
    $.ajax({
      method: "PUT",
      url: "/api/restaurant/up/" + id,
      data: review,
    })
      .then(
          getSelectedRestaurant(id)
          )
    .catch((error) => {
    console.error(error);
    })  
      .catch((error) => {
        console.error(error);
      });
  }
  getUserName();
});
