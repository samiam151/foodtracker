const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const PORT = process.env.PORT || 5105;
const RedisStore = require("connect-redis")(session);
const enforce = require("express-sslify");

const UserService = require("./services/userService");
const RssFeedService = require("./services/rssFeedService");
const isProduction = process.env.environment === "production";

if (!isProduction) {
    dotenv.config();
}

// Middleware
const app = express();
app.use(compression());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'localhost');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
if (isProduction) {
    app.use(enforce.HTTPS({
        trustProtoHeader: true
    }))
}
app.use(bodyParser());
app.use(bodyParser.json());
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: process.env.SESSION_KEY,
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
    if (!req.isAuthenticated()) {
        res.json({});
        return;
    }
    UserService.getInitInfo(req.session.passport.user.id)
    .then(data => {
        let returnData = data;
        res.json(returnData);
    })
    .catch(err => {
        console.log(err);
        return err;
    });

});
app.use("/api/signup", require("./routes/SignupRoutes"))
app.use("/api/food", require("./routes/LoggingRoutes"))
app.use("/api/login", require("./routes/LoginRoutes"));
app.use("/api/weight", require("./routes/WeightRoutes"));
app.use("/api/userinfo", require("./routes/UserInfoRoutes"));
app.post('/api/rss', (req, res) => {
    RssFeedService.getFromUrl(req.body.url)
        .then(data => res.json(data))
        .catch(err => res.json([]))
});
app.post("/api/logout", (req, res) => {
    req.session.destroy(() => {
        req.logout();
        res.redirect("/");
    });
});

app.get('*/**', (req,res) => res.sendFile(path.join(__dirname + "../../index.html")))

// Initialize application
app.listen(PORT, () => console.log(`App started on port ${PORT}`));