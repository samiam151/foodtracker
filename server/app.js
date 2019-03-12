const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const PORT = process.env.PORT || 5105;
const RedisStore = require("connect-redis")(session);

    dotenv.config();

    
// Middleware
const app = express();
app.use(compression());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'localhost');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
app.use(bodyParser());
app.use(bodyParser.json());
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: process.env.SESSION_KEY,
    // secret: [req.user.name, req.user.password].join(),
    store: new RedisStore({
        url: process.env.REDIS_URL
    }),
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
app.post("/api/initlogin", (req, res) => {
    let user = null;
    console.log("isAuth", req.isAuthenticated());
    if (req.isAuthenticated()) {
        console.log("inUser");
        user= req.session.passport.user;
    }
    console.log("user", user);
    res.json(user);
    // res.json(req.session.passport.user || {});
});
app.use("/api/login", require("./routes/LoginRoutes"));
app.post("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});
app.use("/api/signup", require("./routes/SignupRoutes"))
app.use("/api/food", require("./routes/LoggingRoutes"))

app.get('*', (req,res) => res.sendFile(path.join(__dirname + "../../index.html")))

// Initialize application
app.listen(PORT, () => console.log(`App started on port ${PORT}`));