const express=require("express");
const app=express();
const cors=require("cors");
const PORT=3000;
app.use(cors());
require("dotenv").config();
app.get("/",(req,res)=>{
    res.json({
        info:"it worked!"
    })
})
app.get("/users",db.getUSers);
app.get("/user",db.getUserById);
app.post("/create-user",db.addUser);
app.delete("/delete-user",db.deleteUser);
app.listen(PORT ,()=>{
    console.log("server listening on port 3000");
})