const mongoose = require('mongoose');
const { Schema } = mongoose;

const UsersSchema = new Schema(
  {
    userID: {
      type: String,
      required: true,
      unique: true,
      min: 4,
    },
    PW: {
      type: String,
      required: true,
      min: 4,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model('Users', UsersSchema);
