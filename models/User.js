const { default: mongoose, Schema } = require("mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: {
    type: String,
  },
  resetTokenExpirationDate: {
    type: Date,
  },
});

module.exports = mongoose.model("user", userSchema);
