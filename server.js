const express = require("express");
const exphbs = require('express-handlebars');
const app = express();

const dotenv = require('dotenv');
dotenv.config();

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// DB connection
const db = require("./app/server/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


// Static files
const path = require('path');

// Templating engine
app.engine('hbs', exphbs({ 
    extname: 'hbs',
    layoutsDir: "./app/views/layouts/",
    defaultLayout: 'main'    
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/app/views'));

// simple route
app.get("/ping", (req, res) => {
  res.json({ message: "Simple API system working." });
});

// current routes used for app
require("./app/server/routes/main.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
