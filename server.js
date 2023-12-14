const express = require("express");
const session = require("express-session");

const routes = require("./controllers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const exphbs = require("express-handlebars");
const path = require("path");

const hbs = exphbs.create({
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts')
});

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'mysecretstring',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up Handlebars.js engine with custom helpers
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
  });
