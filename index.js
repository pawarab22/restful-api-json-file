var express = require("express");
var fs = require("fs");
var app = express();
app.use(express.json());
app.get("/",(req,res)=>{
     res.end("Welcome to NodeJS CRUD Operation with JSON File...!");
});

app.get("/listUsers",(req,res)=>{
fs.readFile(__dirname + "/users.json",(err,data)=>{
    if(err)
    {
        res.end(JSON.stringify({status:"failed", data:err}));
    }
    let users = JSON.parse(data.toString());
    res.end(JSON.stringify({status:"success",data:users}));
});
});

app.post("/addUser",(req,res)=>{
    // console.log(req);
    // res.end("hello");
    let body = req.body;

    fs.readFile(__dirname + "/users.json",(err,data)=>{
        if(err)
        {
            res.end(JSON.stringify({status:"failed", data:err}));
        }

        let users = JSON.parse(data.toString());
        users["user" + body.id] = body;
        fs.writeFileSync(__dirname + "/users.json" , JSON.stringify(users));
        res.end(JSON.stringify({status:"success"}));
    });

});

app.get("/getUser/:id",(req,res)=>{
    let id = req.params.id;
    // console.log(id);
    fs.readFile(__dirname + "/users.json",(err,data)=>{
        if(err)
        {
            res.end(JSON.stringify({status:"failed", data:err}));
        }
        let users = JSON.parse(data.toString());

        res.end(JSON.stringify({status:"success", data:users["user" + id]}));

    });
});

app.delete("/deleteUser/:id",(req,res)=>{
    let id = req.params.id;
    // console.log(id);
    fs.readFile(__dirname + "/users.json", (err, data)=>{
        if(err)
        {
            res.end(JSON.stringify({status:"failed", data:err}));
        }
        let users = JSON.parse(data.toString());
        delete users["user" + id];
        fs.writeFileSync(__dirname + "/users.json", JSON.stringify(users));
        res.end(JSON.stringify({status:"success"}));
    });
});

app.listen(8081,()=>{
    console.log("Api running on http://localhost:8081/");
});