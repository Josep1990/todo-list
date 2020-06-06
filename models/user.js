const mongoose               = require("mongoose"),
      passaportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: {type: String, unique: true, required: true},
    resetPasswordToken: String,
    resetPasswordExpires: Date
});
userSchema.plugin(passaportLocalMongoose);

module.exports = mongoose.model("User", userSchema);