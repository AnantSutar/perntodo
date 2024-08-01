const express =  require("express");
const app = express();
const cors = require("cors");

const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());


app.post("/todo",async(req,res)=>{
    try{
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );
        res.json(newTodo.rows[0]);
    }
    catch{
        console.log(err.message);
    }
});


app.get("/todo", async(req,res)=>{
    try{
        const alltodos = await pool.query("SELECT * FROM todo");
        res.json(alltodos.rows);
    }
    catch{
        console.log(err.message);
    }
})


app.get("/todo/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM  todo WHERE todo_id = $1",[id])
        res.json(todo.rows[0]);
    }
    catch (err){
        console.log(err.message);
    }
});


app.put("/todo/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const {description} = req.body;
        const updatetodo = await pool.query("UPDATE todo SET description = $1 where todo_id = $2",
            [description,id]);
            res.json("todo was updated")
    }   catch (err) {
        console.error(err.message)
    } 

})

app.delete("/todo/:id",async(req,res)=>{
    try{
        const {id} = req.params;
        const deletetodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id]);
        res.json("tod was deleted");
    } catch (err){
        console.error(err.message)
    }

})
//
app.listen(5000,()=>{
    console.log("server has started on port 5000")
})