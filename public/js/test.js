//DELETE 
//add to front-end JS file
function deleteBookmark (event) {
  //add deletebutton on click event here  
    event.stopPropagation();
    var restaurantID = ($(this).attr("id"));
    $.get("/api/restaurant/" + restaurantID)
    .then((res) => {
        console.log("result ", res);

    }).catch((error) => {
        console.error(error);
    })
}

//add to API-routes
app.delete("/api/restaurant/:id", (req, res) => {
    console.log("get /api/restaurant/")
    db.Restaurant.destroy({
      where: {
        id: req.params.id
      },
      include: [db.User]
    })
    .then(function(results) {
      res.json(results);
    }).catch(err => {
      res.status(404).json(err);
    });
  })

//---------------------------------------------------
//UPDATE
//add to front-end JS file
function updateReview() {
    //add button on click update 
    var restaurantReview = ($(this).attr("id"));
    $.put("/api/restaurant/" + restaurantReview)
    .then((res) => {
        console.log("update ", res);
    }).catch((error) => {
        console.error(error);  
    })
}

//Update Route
app.put("/api/restaurant/:id", (req, res) => {
    console.log("put /api/restaurant/")
    db.Restaurant.update({
      where: {
        id: req.params.id
      },
      include: [db.User]
    })
    .then(function(results) {
      res.json(results);
    }).catch(err => {
      res.status(404).json(err);
    });
  })

