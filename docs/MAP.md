# How this is layed out

- api/
  - API route modules

---

- controllers/
  - UI routes for handlebars templates

---

- db/
  - .sql files and scripts related to the database
    - schema.sql initializes the database
    - seed.js will (eventually) be a script that populates the site with some dummy data

---

- dist/
  - output folder for compiled .scss file(s)

---

- helpers/
  - express-handlebars helpers go here (TODO: should probably split into multiple files)

---

- middleware/
  - express middleware

---

- models/
  - sequelize models

---

- sass/
  - scss style templates

---

- services/
  - service wrappers for sequelize models (this is where input validation and other "business logic" type stuff should go, sequelize models and routes should avoid having any complicated logic in them)

---

- static/
  - static assets that can be served to the client as-is

---

- src/index.js
  - webpack uses this to figure out what needs to be compiled

---

- views/
  - handlebars templates
    - layouts/main.handlebars default container for main views (not sure if we'll wind up needing more than just one layout, it should have the header/footer on it)
    - partials/
      - \$module/
        - handlebars partials
    - \$module/
      - handlebars views
    - index.handlebars
      - main content for the homepage

---

- app.js, routes.js, server.js outer application glue (main entry point is server.js)
