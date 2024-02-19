const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  class:Number,
  marks: Number,
  attendance: Number,
  gender: String

}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

module.exports = { Student };