const express = require("express");
const app = express();

// Use file system
const fs = require("fs");

const render = require("./template.js");


app.use(express.urlencoded({extended:false}));

// Routes
// Visa allt
app.get("/",function(req,res){

    // Get data from filesystem
    let data = fs.readFileSync(__dirname+"/data.json").toString();
    //Convert to array
    data = JSON.parse(data);
    //Loop through and create html
    let html = data.map(function(guitar){
        return `
        <div>
            <h1>${guitar.name}</h1>
            <img src="${guitar.img}">
            <a href="/delete/${guitar.id}">Delete</a>
        </div>
        `;
    });

    res.send(render(html.join("")));
    //res.send(data);

});

// Skapa en gitarr
app.get("/create",function(req,res){

    let form = `
        <form action="/create" method="post">
            <input type="text" name="name" placeholder="Guitar Name">
            <input type="text" name="img" placeholder="Image">
            <input type="submit" value="Save Guitar">
        </form>
    `;

    res.send(render(form));
});

// Visa en gitarr
app.get("/:id",function(req,res){

});

// Ta bort en gitarr
app.get("/delete/:id",function(req,res){

});



app.post("/create",function(req,res){

});

app.get("/edit/:id",function(req,res){

});

app.post("/update",function(req,res){

});


app.listen(3456,function(){
    console.log("Port öppen på 3456");
});