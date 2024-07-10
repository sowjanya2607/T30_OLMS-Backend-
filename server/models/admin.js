const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Admin Schema
const AdminSchema = new Schema({
  adminId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create Admin model
const Admin = mongoose.model("Admin", AdminSchema);

module.exports = Admin;
