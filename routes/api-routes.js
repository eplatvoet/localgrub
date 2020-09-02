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
  
  app.get("/api/users/:id", function(req,res) {
    // console.log(req);
    db.Restaurant.findAll({
      where: {
        // userId: req.user.id
        userId: req.params.id
      },
      // include: [db.User]
      // req.params.id comes out undefined.
    }).then(function(data) {
      res.json(data);
    })
  })

  app.post("/api/restaurant", (req, res) => {
    // console.log(req.body)
    console.log('array\n',req.body.highlights);
    var highlightsStr = req.body.highlights.toString();
    console.log('string\n',highlightsStr);
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
        // res.json(res);
        res.redirect(201, "/home");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  app.get("/api/restaurant/:id", (req, res) => {
    console.log("get /api/restaurant/")
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

};
