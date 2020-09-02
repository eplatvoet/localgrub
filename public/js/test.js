

function deleteBookmark (event) {
  //add deletebutton on click event here  
    event.stopPropagation();
    var restaurantID = ($(this).attr("id"));
    $.delete("/api/restaurant/" + restaurantID)
    .then((res) => {
        console.log("result ", res);

    }).catch((error) => {
        console.error(error);
    })
}

//
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
