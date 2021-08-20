//class definition and function model
const { Schema, model } = require('mongoose');

const schema = new Schema({
  username: { type: String, required: true },
  hashedPassword: { type: String, required: true },
  likedPlays: [{ type: Schema.Types.ObjectId, ref: 'Play', default: [] }],
  gender: { type: String },
  ganre: { type: String },
});

module.exports = model('User', schema);