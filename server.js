const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

// var corsOptions = {
//   origin: "http://localhost:8282"
// };

// app.use(cors(corsOptions));
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Awid Alnoor application." });
});

require("./app/routes/category.routes.js")(app);
require("./app/routes/service.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/article.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 9191;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
