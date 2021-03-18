const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    Url: {
      type: String,
      required: true,
    },
    Description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
