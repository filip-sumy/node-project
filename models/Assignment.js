const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  name: String,
  subject: String,
  score: Number
});

module.exports = mongoose.model('Assignment', assignmentSchema);

