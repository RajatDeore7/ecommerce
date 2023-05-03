const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  subject: { type: String },
  feedback: { type: String, required: true },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
