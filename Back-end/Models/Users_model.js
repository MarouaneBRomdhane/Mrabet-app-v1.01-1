const mongoose = require('mongoose')

const usersSchema= new mongoose.Schema(
    {
        Name: { type:String, required:true},
        Password:String,
        Role:{type:String, default:"User"}
    },
    {timestamps:true}
)

module.exports = mongoose.model("Users", usersSchema);
