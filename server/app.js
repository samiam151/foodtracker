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
    resave: false,
    secret: process.env.SESSION_KEY,
    // secret: [req.user.name, req.user.password].join(),
    store: new RedisStore({
        url: "redis://h:p53dd2d91831f7b24ba59dc59ac73a290e0418b29fe8a680f16257d164fdae379@ec2-3-208-33-137.compute-1.amazonaws.com:14139"
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
// app.get("/api/", (req, res) => {
    //     res.sendFile(path.join(__dirname + "../../index.html"));
    // });
app.use((req, res, next) => {
    if (req.isAuthenticated()) {
        
    }
    console.log(req.session);
    next();
})
app.post("/api/initlogin", (req, res) => {
    res.json(req.session.passport.user);
});
app.use("/api/login", require("./routes/LoginRoutes"));
app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});
app.use("/api/signup", require("./routes/SignupRoutes"))
app.use("/api/food", require("./routes/LoggingRoutes"))

app.get('*', (req,res) => res.sendFile(path.join(__dirname + "../../index.html")))

// Initialize application
app.listen(PORT, () => console.log(`App started on port ${PORT}`));