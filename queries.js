const { Pool } = require("pg");
require("dotenv").config();
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    }
});
const getUsers = (req, res) => {
    pool.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.error('Error executing query', err.stack);
            res.status(500).send('Error executing query');
            return;
        }
        res.status(200).json(result.rows);
    });
};
const getUserByID = (req, res) => {
    const id = parseInt(req.body.id);
    console.log(id);
    pool.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
        if (err) {
            console.error("Error executing query", err.stack);
            res.status(500).send("Error executing query");
            return;
        }
        res.status(200).json(result.rows);
    });
};
const addUser=(req,res)=>{
    const n=req.body.name;
    const e=req.body.email;
    pool.query(`INSERT INTO users(name ,email) values ($1,$2)`,[n,e],(err,result)=>{
        if(err){
            console.error("Error executing the query",err.stack);
            res.send(500).send("Error executing the query");
            return;
        }
        res.status(201).send("Record added Successfully!")
    })
}
const updateUser=(req,res)=>{
    const i=req.body.id;
    const m=req.body.mail;
    pool.query("update users set email=$1 where id=$2",[m,i],(err,result)=>{
        if(err){
            console.error("Error Executing the Query",err.stack);
            res.send(500).send("Internal Server Error!")
            return;
        }
        res.status(200).send("Record Updates Successfully!");
    })
}
const deleteUser=(req,res)=>{
    const i=req.body.id;
    pool.query('delete from users where id=$1',[i],(err,result)=>{
        if(err){
            console.error("Error Executing the query",err.stack);
            res.status(500).send("Internal Server Error!");
            return;
        }
        res.status(200).send("Record Deleted Successfully!");
    })
}
module.exports = { getUsers ,
    getUserByID,
    addUser,
    updateUser,
    deleteUser
};