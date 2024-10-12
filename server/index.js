require("dotenv").config({ path: ".env" });
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./router/authRoutes/authRoutes.js");
const passport = require("passport");
const questionsRouter = require("./router/questionRoutes/questionRoutes.js");
const postRouter = require("./router/postRoutes/postRoutes.js");
const homepageFeed = require("./controller/homepageFeed/homepageFeed.js");
const userProfileRouter = require("./router/userProfileRoutes/userProfileRoutes.js");
require("./connection/conn");
require("./config/googleStrategy.js");

// Middlewares:
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: true,
    // methods: ["GET", "POST", "PUT", "PATCH"],
    allowedHeaders:
      "Content-Type,Authorization,Origin,X-Auth-Token,Accept,Referer",
    preflightContinue: true,
    credentials: true,
  })
);
// Passport Middleware
app.use(passport.initialize());

// Another Routes
app.use(userProfileRouter);
app.use(authRoutes);
app.use(questionsRouter);
app.use(postRouter);

// Homepage Feed Route
app.get("/feed", homepageFeed);

// Google Auth Routes
app.get(
  "/auth/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.FRONTEND_HOST}login`,
  }),
  (req, res) => {
    // Access user object and tokens from req.user
    const { _id } = req.user.user;
    // Successful authentication, redirect home.
    const token = jwt.sign({ UID: _id }, process.env.SECRET_KEY);
    return res
      .cookie("UID", token, {
        expires: new Date(Date.now() + 258920000),
        sameSite: "none",
        secure: true,
      })
      .cookie("userId", _id, {
        expires: new Date(Date.now() + 258920000),
        sameSite: "none",
        secure: true,
      })
      .redirect(`${process.env.FRONTEND_HOST}`);
  }
);
const PORT = process.env.PORT || 8080;
// Server listening:
try {
  app.listen(PORT, () => {
    console.log(`server started at PORT: ${PORT}`);
  });
} catch (e) {
  console.log("some error Occured: " + e);
}
