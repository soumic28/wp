const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
    console.log("post recvd");



    const q =req.body.cityNames;
    const apid = "951f3591cc23d7c87caa09090d4bbc80";
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+ q +"&appid="+apid+"&units=metric";
    https.get(url,function(response){
        console.log(response.statusCode)

        response.on("data",function(data){
            
            const wd=JSON.parse(data);
            console.log(wd);
            const temp = wd.main.temp;
            console.log(temp);
            const description = wd.weather[0].description;
            console.log(description);
            const icon = wd.weather[0].icon;
            console.log(icon);
            const imgUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            res.write("<p>Todays forecaste is - </p>"+ description);
            res.write("<h1>Todays temp in"+" "+q+" "+"is</h1> "+ temp+ +" "+"Degree celcius");
            res.write("<img src="+ imgUrl +">");
            res.send();

        })

    })
    

});
app.listen(3000,function(req,res){
    console.log("port is working on 3000");

});