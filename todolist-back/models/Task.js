const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaName = new Schema(
  {
    timestamp: Date,
    name: String,
    done: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

const Model = mongoose.model("Task", schemaName);
module.exports = Model;
