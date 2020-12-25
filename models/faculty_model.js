//1-mongoose
//2-schema
//3-export model 

const { strict } = require("assert")
const { Double } = require("mongodb")
const mongoose = require ("mongoose")

let facultySchema= new mongoose.Schema({
    facultyName: {type:String, unique:true},
    departments:{type:Array},
    // facultyHead : {type:String},

     
},
  
{
    strict : false,
    timestamps : true
})
  

module.exports = mongoose.model("faculty", facultySchema)