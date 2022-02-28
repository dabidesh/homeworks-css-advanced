// Плейсхолдер на Плей за да си създадем връзката и User да не гърми
const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
// Mongoose schema definition
const schema = new Schema({
  title: {
    type: String, required: [true, 'Title is required!']
  },
  description: { type: String, required: [true, 'Description is required!'], maxLength: [50, 'Max length of description is 50 symbols!'] },
  private: { type: String, required: [true, 'Private Description is required!'], maxLength: [50, 'Max length of private description is 50 symbols!'] },
  imageUrl: { type: String, required: [true, 'Image url is required!'] },
  public: { type: Boolean, default: false },
  // Ако не е функция, ще се интерпретира в момента на създаване на схемата
  // () => new Date() или Date.now (взима го по референция и го извиква в нужния момент)
  createdAt: { type: Date, default: () => new Date() },
  usersLiked: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  usersLikedLength: { type: Number, default: 0 },
});
// public, винаги го има; посл. 3 са служебни!

schema.plugin(mongoosePaginate);
const Play = model('Play', schema);


module.exports = Play;
// required и default са взаимно-изключващи се (логично)
// Ако не подадем стойност ще си има!

// default: [], за да не се налага да подаваме празен масив!

