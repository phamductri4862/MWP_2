const { default: mongoose, Schema } = require("mongoose");

const qasSchema = new Schema({
  content: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("qa", qasSchema);
