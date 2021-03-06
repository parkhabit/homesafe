const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./routes/routes.js');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();
const helpers = require('./views/helpers/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(session({
   secret: process.env.SECRET,
   saveUninitialized: false,
   resave: false,
   cookie: {maxAge: 3 * 60 * 60 * 1000}
 }))

 app.use((req, res, next)=>{
   res.locals.success = req.flash('success');
   res.locals.error_msg = req.flash('error_msg');
   res.locals.name = req.flash('name');
   next();
 })

app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views','partials'),
    defaultLayout: 'main',
    helpers: helpers
  })
);

app.set('port', process.env.PORT || 3000);
app.use("/public", express.static(path.join(__dirname, '..', 'public')));
app.use("/build", express.static(path.join(__dirname, '..', 'build')));
app.use(routes);

module.exports = app;
