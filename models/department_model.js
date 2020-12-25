//1-mongoose
//2-schema
//3-export model 

const { strict } = require("assert")
const { Double } = require("mongodb")
const mongoose = require ("mongoose")

let departmentSchema= new mongoose.Schema({
    departmentName: {type:String, unique:true},
    courses:{type:Array}, //courseID
    departmentHead : {type:String}, 
    staff: {type:Array}
     
},
  
{
    strict : false,
    timestamps : true
})
  

module.exports = mongoose.model("department", departmentSchema)