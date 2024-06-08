const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const {getUsers,getUserByID,addUser, updateUser,deleteUser} = require("./queries");
require("dotenv").config();

// Middleware 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get("/users", getUsers);
app.post("/user", getUserByID);
app.post("/add",addUser);
app.patch("/updateUser",updateUser)
app.delete("/remove",deleteUser);
// Start the server
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
