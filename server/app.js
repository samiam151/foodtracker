const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 5105;
dotenv.config();

// Middleware
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    saveUninitialized: true,
    resave: false,
    secret: process.env.SESSION_KEY,
    // secret: [req.user.name, req.user.password].join(),
    cookie: {
        httpOnly: false,
        maxAge: 2419200000
    }
}));
app.use(express.static(__dirname +'./../'));

// Authentication
const Auth = require("../conifg/authentication");
Auth.init(app);

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "../../index.html"));
});
app.use("/login", require("./routes/LoginRoutes"));
app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});
app.use("/signup", require("./routes/SignupRoutes"))

// Initialize application
app.listen(PORT, () => console.log(`App started on port ${PORT}`));