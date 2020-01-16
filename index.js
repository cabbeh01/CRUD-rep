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
    // Convert to array
    data = JSON.parse(data);
    // Loop through and create html
    let html = data.map(function(guitar){
        return `
        <div>
            <h1>${guitar.name}</h1>
            <img src="${guitar.img}">
            <a href="/delete/${guitar.id}">Delete</a>
            <a href="/edit/${guitar.id}">Edit</a>
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
            <input type="text" name="img" placeholder="Image url">
            <input type="submit" value="Save Guitar">
        </form>
    `;

    res.send(render(form));
});

app.post("/create",function(req,res){

    let guitar = {...req.body, id: Date.now()};

    let data = fs.readFileSync(__dirname+"/data.json").toString();
    //Convert to array
    data = JSON.parse(data);
    data.push(guitar);
    data = JSON.stringify(data);
    
    fs.writeFileSync(__dirname+"/data.json", data);
    res.redirect("/");
    //req.send(req.body);
});

// Visa en gitarr
app.get("/:id",function(req,res){
    res.send("");
});

// Ta bort en gitarr
app.get("/delete/:id",function(req,res){
    let data = fs.readFileSync(__dirname+"/data.json").toString();
    //Convert to array
    data = JSON.parse(data);
    data = data.filter(function(g){
        return g.id != req.params.id
    })


    data = JSON.stringify(data);
    
    fs.writeFileSync(__dirname+"/data.json", data);

    res.redirect("/");
});


app.get("/edit/:id",function(req,res){
    let data = fs.readFileSync(__dirname+"/data.json").toString();
    //Convert to array
    data = JSON.parse(data);

    data = data.filter(function(g){
        return g.id == req.params.id
    })

    let form = `
        <form action="/update/${data[0].id}" method="post">
            <input value="${data[0].name}" type="text" name="name" placeholder="Guitar Name">
            <input value="${data[0].img}" type="text" name="img" placeholder="Image url">
            <input type="submit" value="Save Guitar">
        </form>
    `;

    res.send(render(form));

});

app.post("/update/:id",function(req,res){
    let data = fs.readFileSync(__dirname+"/data.json").toString();
    //Convert to array
    data = JSON.parse(data);

    for(git of data){
        if(git.id == req.params.id){
            git.name = req.body.name;
            git.img = req.body.img;
        }
    }

    data = JSON.stringify(data);
    
    fs.writeFileSync(__dirname+"/data.json", data);

    res.redirect("/");
    
    res.send("");
});


app.listen(3456,function(){
    console.log("Port öppen på 3456");
});