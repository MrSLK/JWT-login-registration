const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");
const cookieSession = require("cookie-session");

var corsOptions = {
  origin: "*"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.send("Server is running");
});

//Connect Database
db.mongoose
  .connect(`mongodb+srv://shiba:19981407@cluster0.zw05f.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  
  })
  .catch(err => {
    console.error("Connection error ", err);
    process.exit();
  });

  //routes
//   require("./Routes/user")(app);
//   require("./Routes/property")(app);
//   require("./Routes/agency")(app);
//   require("./Routes/buy")(app);
//   require("./Routes/rent")(app);
//   require("./Routes/calculator")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});