const mongoose = require("mongoose");

const File = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    path: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJson: { virtuals: true }
  }
);

//monta campo virtual (calculado)
File.virtual("url").get(function() {
  return `http://localhost:3333/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongoose.model("File", File);
