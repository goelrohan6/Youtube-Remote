var express = require("express");
var http = require("http");
var https = require("https");
var app = express();
var server = http.createServer(app).listen(3000);
var io = require("socket.io")(server);
var spawn = require('child_process').spawn;

app.use(express.static("./public"));

io.on("connection", function(socket) {

    socket.on("chat", function(message) {
        socket.broadcast.emit("message", message);
        // spawn('xdg-open', ['http://www.facebook.com']);
    });

    socket.on("speech", function(speech) {
        // socket.broadcast.emit("message", speech);
        console.log(speech);
        // spawn('xdg-open', ['http://www.facebook.com']);
    });

    socket.on("youtube", function(hello){
    	var obj = JSON.parse(hello);
    	var firstVideoId = obj["items"][0]["id"]["videoId"];

    	console.log(obj["items"][0]["id"]["videoId"]);
        spawn('killall',['chrome']);
    	spawn('xdg-open', [`https://www.youtube.com/watch?v=${firstVideoId}`]);
    });

    socket.emit("message", "History");

});

console.log("Starting Socket App - http://localhost:3000");