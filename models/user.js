const mongoose               = require("mongoose"),
      passaportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
userSchema.plugin(passaportLocalMongoose);

module.exports = mongoose.model("User", userSchema);