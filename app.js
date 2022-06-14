const express = require("express");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const path = require("path");
const MongoStore = require("connect-mongo");
const connectDB = require("./config/db");


//load config
dotenv.config({ path: "./config/config.env" });
require("./config/passport")(passport);

connectDB();

const app = express();

const Server = require("http").createServer(app);
require("./config/socket")(Server);

app.set("view engine", "pug");
//body parser
app.use(express.urlencoded({ extended: true }));

//sessions
app.use(
  session({
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//set glopal variables
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

//static folder
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/", require("./routes/index"));
app.use("/", require("./routes/auth"));

//socket();
const PORT = process.env.PORT;

Server.listen(PORT, console.log(`app is running on  http:/localhost/${PORT} `));
module.exports = app;
