const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const helmet = require('helmet');
const pgConnect = require('connect-pg-simple');

// Make all variables from our .env file available in our process
require('dotenv').config();

// Init express
const app = express();

// set view engine
app.set('view engine', 'ejs');

// setup middleware and configs
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());

// setup static files
app.use(express.static('./public'));

// session set up
app.use(session({
    store: new (pgConnect(session))({ conString: process.env.DATABASE_URL }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },//30 days
}));
// setup routes
app.use(require('./routes'));

/* Listen on the port for requests */
app.listen(process.env.PORT || 3000, () => {
    console.log('Express server listening on port %d in %s mode', process.env.PORT, app.settings.env);
});

module.exports = app;