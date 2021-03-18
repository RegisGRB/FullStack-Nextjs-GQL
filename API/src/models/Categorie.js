const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorieSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Products: [{
        type: Schema.Types.ObjectId, ref:'Product'
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Categorie", categorieSchema);
