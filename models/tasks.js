const mongoose = require("mongoose");

//=================================================================================
//                              Schema
const todoSchema = new mongoose.Schema(
    {
        name: String,
        author: {
            id:{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
            },
            username: String
        }
         

    });


module.exports = mongoose.model("Todos", todoSchema);