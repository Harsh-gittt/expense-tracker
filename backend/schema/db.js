const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  email: {type: String, unique: true},
  password: String,
  name: String
});

const expenseSchema = new Schema({
  title: String,
  note: String,
  amount: Number,
  date: Date,
  category: String,
  userId: {type: ObjectId, ref: 'user'}
});

const userModel = mongoose.model('user', userSchema);
const expenseModel = mongoose.model('expense', expenseSchema);

module.exports = {
  userModel: userModel,
  expenseModel: expenseModel
}