const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: String,
  phone: Number,
  subject: String,
  
}, { timestamps: true });

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = { Teacher };