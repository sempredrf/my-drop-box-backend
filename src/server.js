const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

//cria app express
const app = express();

//habilita cors
app.use(cors());

//servidor http
const server = require("http").Server(app);

//servidor websocket
const io = require("socket.io")(server);

//cria sala unica por box
io.on("connection", socket => {
  socket.on("connectRoom", box => {
    socket.join(box);
  });
});

//database
mongoose.connect(
  "mongodb+srv://diego:diego@cluster0-xn6pp.mongodb.net/mydropbox?retryWrites=true",
  {
    useNewUrlParser: true
  }
);

// MIDDLEWARES
// criar variavel global io nos objetos req
app.use((req, res, next) => {
  req.io = io;

  return next();
});

//add suporte json
app.use(express.json());

//add suporte para envio de arquivos
app.use(express.urlencoded({ extended: true }));

//redireciona para uma pasta estatica
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

//rotas
app.use(require("./routes"));

//porta do servidor
server.listen(3333);
