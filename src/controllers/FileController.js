const File = require("../models/File");
const Box = require("../models/Box");

class FileController {
  async store(req, res) {
    //recupera box
    const box = await Box.findById(req.params.id);

    //cria novo file
    const file = await File.create({
      title: req.file.originalname,
      path: req.file.key
    });

    //add arquivo no box
    box.files.push(file);
    await box.save();

    //retorna broadcast com informacoes do arquivo ao socket
    req.io.sockets.in(box._id).emit("file", file);

    return res.json(file);
  }
}

module.exports = new FileController();
