$(document).ready(() => {
  //GET THE USER NAME FROM DATABASE
  function getUserName() {
    $.get("/api/user_data").then(data => {
      $(".member-name").text(data.name);
      $(".member-id").text(`Your ID is ${data.id}`);
      $(".member-id").attr("value", data.id);
      renderAllBookmark(data.id);
    });
  }

  // GETTING DATA USING GET METHOD AND PASSING DATA TO ANOTHER FUNCTION
  function renderAllBookmark(userId) {
    $.get("/api/users/" + userId, data => {
      bookmarkRestaurant(data);
    });
  }

  // RECEIVES DATA FROM ANOTHER FUNCTION AND IT LOOPS THRU THE ALL OF IT AND CREATE EACH DATA INTO LIST.
  function bookmarkRestaurant(data) {
    $(".bookmarks").empty();
    const allRestaurantList = [];
    for (let i = 0; i < data.length; i++) {
      allRestaurantList.push(createNewList(data[i]));
    }
    $(".bookmarks").append(allRestaurantList);
  }

  // CREATING <LI> TAG FOR EACH SAVED RESTAURANTS
  function createNewList(data) {
    const newliEl = $("<li>");
    $(newliEl)
      .addClass("list-group-item")
      .text(data.shop_name)
      .attr("id", data.id);
    const linebreak = $("<br>");
    newliEl.append(linebreak);

    const deleteBtn = $("<button>");
    deleteBtn.text("X");
    deleteBtn
      .attr("class", "delete btn btn-sm mt-2")
      .attr("value", data.id)
      .attr("style", "border-color: gray;");
    newliEl.append(deleteBtn);
    return newliEl;
  }

  // DELETE BUTTON FOR LIST
  $(document).on("click", "button.delete", function() {
    const resId = $(this).attr("value");
    deleteBookmark(resId);
  });

  // ON CLICK EVENT TO GET THE DATA FROM BACKEND.
  $(".bookmarks").on("click", "li", function() {
    const restaurantID = $(this).attr("id");
    getSelectedRestaurant(restaurantID);
  });

  // FUNCTION TO RECEIVE DATA USING GET METHOD AND RENDERS USING 3 DIFFERENT FUNCITONS
  function getSelectedRestaurant(id) {
    $.get("/api/restaurant/" + id)
      .then(res => {
        renderInfo(
          res.address,
          res.shop_name,
          res.shop_url,
          res.hours,
          res.cost_for_two,
          res.cuisines,
          res.highlights
        );
        renderImage(res.shop_image);
        renderReview(res.id, res.user_review, res.user_rating);
      })
      .catch(error => {
        console.error(error);
      });
  }

  // RENDERS INFORMATION OF RESTAURANTS

  function renderInfo(
    address,
    name,
    url,
    hours,
    costForTwo,
    cuisines,
    highlights
  ) {
    $("#shop-details").empty();
    const title = $("<h4>");
    const pElOne = $("<p>");
    const aEl = $("<a>");
    const pElThree = $("<p>");
    const pElFour = $("<p>");
    const pElFive = $("<p>");
    const pElSix = $("<p>");

    $(title).html(`<strong>${name}</strong>`);
    $(pElOne).text(address);
    $(aEl)
      .attr("href", url)
      .text("Link to Restaurant");
    $(pElThree).html(hours.split(",").join(", "));
    $(pElFour).html(`<strong>Average cost for two:</strong> $${costForTwo}`);
    $(pElFive).html(`<strong>Cuisine:</strong> ${cuisines}`);
    $(pElSix).html(
      `<strong>Highlights:</strong><br>${highlights.split(",").join(", ")}`
    );

    $("#shop-details").append(title);
    $("#shop-details").append(pElOne);
    $("#shop-details").append(pElThree);
    $("#shop-details").append(pElFour);
    $("#shop-details").append(pElFive);
    $("#shop-details").append(pElSix);
    $("#shop-details").append(aEl);
  }

  // RENDERS RESTAURANTS REVIEW
  function renderReview(id, review, rating) {
    $(".review-form").empty();
    // CREATING INPUT FIELD FOR REVIEW
    const reviewBody = $("<textarea>");
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

    const linebreak = $("<br>");
    $(".review-form").append(linebreak);

    // CREATING RATING
    const ratingDisplay = $("<p>");
    // ratingDisplay.attr("class", "col-md-6");
    switch (rating) {
      case 5:
        ratingDisplay.text("Your Rating: 😍😍😍😍😍");
        break;

      case 4:
        ratingDisplay.text("Your Rating: 😍😍😍😍");
        break;

      case 3:
        ratingDisplay.text("Your Rating: 😍😍😍");
        break;

      case 2:
        ratingDisplay.text("Your Rating: 😍😍");
        break;

      case 1:
        ratingDisplay.text("Your Rating: 😍");
        break;
    }
    $(".review-form").append(ratingDisplay);

    // RATING DROPDOWN CREATING
    const ratingBody = $("<select>");
    $(ratingBody)
      .attr("name", "rating")
      .attr("id", "user-rating");
    // .attr("class", "form-control");
    const rateOne = $("<option>")
      .attr("value", 1)
      .text("😍");
    const rateTwo = $("<option>")
      .attr("value", 2)
      .text("😍😍");
    const rateThree = $("<option>")
      .attr("value", 3)
      .text("😍😍😍");
    const rateFour = $("<option>")
      .attr("value", 4)
      .text("😍😍😍😍");
    const rateFive = $("<option>")
      .attr("value", 5)
      .text("😍😍😍😍😍");
    ratingBody.append(rateFive);
    ratingBody.append(rateFour);
    ratingBody.append(rateThree);
    ratingBody.append(rateTwo);
    ratingBody.append(rateOne);
    $(".review-form").append(ratingBody);

    const linebreakTwo = $("<br>");
    $(".review-form").append(linebreakTwo);

    // CREATING BUTTON
    const updateBtn = $("<button>");
    $(updateBtn)
      .attr("value", id)
      .attr("class", "update-btn buttons")
      .text("Update");
    $(".review-form").append(updateBtn);
    $(".review-form").append(deleteBtn);
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

  // FUNCTION WHEN DELETE BUTTON IS CLICKED
  function deleteBookmark(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/restaurant/del/" + id
    })
      .then(
        event.preventDefault(),
        getRandomId() // I NEED TO CHANGE THIS FUNCTION TO GET THE FIRST ONE
      )
      .catch(error => {
        console.error(error);
      });
  }

  // UPDATE BUTTON
  $(document).on("click", "button.update-btn", () => {
    const reviewInput = $("#user-review");
    const ratingInput = $("#user-rating option:selected").val();
    const resId = $(".update-btn").attr("value");
    const newReview = {
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
      data: review
    })
      .then(
        event.preventDefault(),
        getSelectedRestaurant(id),
      )
      .catch(error => {
        console.error(error);
      })
      .catch(error => {
        console.error(error);
      });
  }

  // GET RANDOM ID FROM MYSQL AND PASSING THAT VALUE TO RENDER IT
  function getRandomId() {
    const userId = $(".member-id").attr("value");
    $.get("/api/restid/" + userId)
      .then(res => {
        const rndIndex = Math.floor(Math.random() * res.length);
        getSelectedRestaurant(res[rndIndex].id);
        getUserName();
      })
      .catch(error => {
        console.error(error);
      });
  }

  getUserName();
});
