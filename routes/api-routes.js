// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      name: req.body.name,
      zipcode: req.body.zipcode,
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        name: req.user.name,
        zipcode: req.user.zipcode,
        email: req.user.email,
        id: req.user.id
      });
    }
  });
  
  // GET ROUTE , IT GIVE YOU ALL DATA WITHIN USER
  app.get("/api/users/:id", function(req,res) {
    db.Restaurant.findAll({
      where: {
        userId: req.params.id
      },
    }).then(function(data) {
      res.json(data);
    })
  })

  // POST ROUTE, WHICH STORES A NEW DATA USER WISHES TO SAVE.
  app.post("/api/restaurant", (req, res) => {
    var highlightsStr = req.body.highlights.toString();
    db.Restaurant.create({
      shop_name: req.body.shop_name,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      address: req.body.address,
      hours: req.body.hours,
      cost_for_two: req.body.cost_for_two,
      shop_url: req.body.shop_url,
      cuisines: req.body.cuisines,
      highlights: highlightsStr,
      shop_image: req.body.shop_image,
      UserId: req.body.id
    })
      .then(() => {
        res.redirect(201, "/home");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // GET ROUTE , BUT GETS ONLY ONE PIECE OF DATA.
  app.get("/api/restaurant/:id", (req, res) => {
    db.Restaurant.findOne({
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

  // DELETE ROUTE
  app.delete("/api/restaurant/del/:id", (req, res) => {
    db.Restaurant.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(results) {
      res.json(results);
    }).catch(err => {
      res.status(404).json(err);
    });
  })

  // UPDATE ROUTE
  app.put("/api/restaurant/up/:id", (req, res) => {
    console.log('WHAT IS THIS REQ BODY',req.body);
    db.Restaurant.update(
      {
        user_review: req.body.user_review,
        user_rating: req.body.user_rating
      },
      {
      where: {
        id: req.params.id
      }
    })
    .then(function(results) {
      console.log(results);
      res.json(results);
    })
    .catch(err => {
      res.status(404).json(err);
    });
  })

  app.get("/api/restid/:id", (req, res) => {
    db.Restaurant.findAll({
      where: {
        userId: req.params.id
      },
      attributes: ['id']
    })
    .then(function(results) {
      res.json(results);
    }).catch(err => {
      res.status(404).json(err);
    });
  })

};

