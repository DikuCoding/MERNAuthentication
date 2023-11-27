const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//     // name:{
//     //     type: String,
//     //     required: true
//     // },
//     // email:{
//     //     type: email,
//     //     required: true
//     // }
// })
// const UserModel = mongoose.model("users", UserSchema)
// module.exports = UserModel;

const RegisterSchema = new mongoose.Schema({

    // for registration
    name: String,
    email: String,
    password: String
})


// for registration
const RegisterModel = mongoose.model("register", RegisterSchema)
module.exports = RegisterModel;