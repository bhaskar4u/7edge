const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  }
});

// userSchema.methods.hashpassword = password => {
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// };

module.exports = mongoose.model("users", userSchema);
