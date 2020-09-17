const exphbs = require('express-handlebars');
const express = require('express');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

module.exports = (sequelize) => {
  const models = require('./models')(sequelize);
  const services = require('./services')(sequelize, models);
  const hbs = exphbs.create({helpers: require('./helpers')(services)});
  const middleware = require('./middleware')(services);
  const routes = require('./routes')(services, middleware);

  app.use(
    session({
      secret: 'This is secret?',
      cookie: {maxAge: 1000 * 60 * 60}, // 60 minute sessions
      resave: false,
      saveUninitialized: true,
      store: new SequelizeStore({db: sequelize}),
    })
  );
  app.use(express.urlencoded({extended: true}));
  app.use(express.json());
  app.use(express.static(path.join(__dirname, 'static')));
  app.use(express.static(path.join(__dirname, 'dist')));
  app.use(routes);

  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');

  return app;
};
