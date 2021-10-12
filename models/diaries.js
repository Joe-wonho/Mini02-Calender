const mongoose = require("mongoose");
const { Schema } = mongoose;

const DiariesSchema = new Schema({
  userID: String,
  date: String,
  title: String,
  content: String,
  color: String,
});

DiariesSchema.virtual("diaryID").get(function () {
  return this._id.toHexString();
});

DiariesSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Diaries", DiariesSchema);
