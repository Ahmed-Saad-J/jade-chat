const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//home page
router.get("/", (req, res) => {
  res.render("index.pug", {
    title: "welcome to chatApp",
    message: "Please login",
    emessage: "",
    showSocialAuth: true,
  });
});

//GET /products
router.get("/products", (req, res) => {
  Product.find({}, (err, products) => {
    if (err) {
      console.log(err);
      res.status(500).send("An error occurred", err);
    } else {
      res.render("products.ejs", { products: products, user: req.user });
    }
  });
});

// router.get("/addtocart/:id", (req, res) => {
//   let productId = req.params.id;
//   let cart = [];
//   console.log(req.session.cart);
//   req.session.cart
//   // if (req.session.cart) {
//   //   console.log("hmada");
//   //   let cart = req.session.cart;
//   // } else {
//   //   req.session.cart = [];
//   //   let cart = req.session.cart;
//   // }

//   // if (cart.includes(productId)) {
//   //   console.log(cart);
//   // } else {
//   //   cart.push(productId, productId);
//   //   req.session.cart = cart;
//   //   console.log("item added");
//   //   console.log(req.session.cart);
//   // }
// });

module.exports = router;
