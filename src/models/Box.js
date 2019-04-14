const mongoose = require("mongoose");

const Box = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }]
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJson: { virtuals: true }
  }
);

module.exports = mongoose.model("Box", Box);
