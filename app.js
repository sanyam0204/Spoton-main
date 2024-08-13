const exp = require("constants");
const express = require("express");
const app = express();
const http = require("http");
const path = require("path");

const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);
app.set("view engine", "ejs"); // set the view engine to ejs
app.use(express.static(path.join(__dirname, "public"))); // set the path for static files
io.on("connection", function (socket) {
  socket.on("sendLocation", function (data) {
    io.emit("receive-location", { id: socket.id, ...data });
  });
  socket.on("disconnect", function () {
    io.emit("user-disconnected", socket.id);
  });
});

app.get("/", (req, res) => {
  res.render("index");
});
server.listen(process.env.PORT || 3000);
