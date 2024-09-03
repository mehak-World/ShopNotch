const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = mongoose.Schema({
    userId: String,
    image:String,
    address: String,
    phone_no: String
});

userSchema.plugin(passportLocalMongoose)


module.exports = mongoose.model("User", userSchema)

