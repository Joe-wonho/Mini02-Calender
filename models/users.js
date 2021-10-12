const mongoose = require("mongoose");
const { Schema } = mongoose;

const UsersSchema = new Schema({
  userID: String,
  PW: String,
  confirmPW: String,
});

module.exports = mongoose.model("Users", UsersSchema);
