const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone_number: { type: String },
    address: { type: String },
    role: {
      type: String,
      enum: ["client", "contractor", "both"],
      default: "client",
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { versionKey: false }
); // __vフィールドを無効化

module.exports = mongoose.model("User", userSchema);
