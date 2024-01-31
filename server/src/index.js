const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require('./routers');
const app = express();
const port = process.env.PORT || 3001;

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's origin
    credentials: true,
  })
);

routes(app)

const URL = process.env.MONGODB;

const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

connectDB();

// handle error
app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});


const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

let onlineUser = {}

io.on('connection', (socket) => {
  console.log('A user connected: ' + socket.id);
  socket.on('add-user', (data) => {
    onlineUser[data] = socket.id;
  });
  socket.on('sendMessage', (data) => {
    const {from, to, message} = data
    if(onlineUser[to]) {
      io.to(onlineUser[to]).emit('message-receive', {to, message})
    }
  })
});


server.listen(port, () => {
  console.log("Server is running on port:", port);
});
