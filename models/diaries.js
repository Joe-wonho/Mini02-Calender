const mongoose = require('mongoose');
const { Schema } = mongoose;

const DiariesSchema = new Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

DiariesSchema.virtual('diaryID').get(function () {
  return this._id.toHexString();
});

DiariesSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Diaries', DiariesSchema);
