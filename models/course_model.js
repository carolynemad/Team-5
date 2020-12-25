//1-mongoose
//2-schema
//3-export model 

const { strict } = require("assert")
const { Double } = require("mongodb")
const mongoose = require ("mongoose")

let courseSchema= new mongoose.Schema({
    departmentName: {type:String, required : true},
    courseName: {type:String, required:true},
    courseID:{type:String,required:true, unique:true},
    courseCoordinator : {type:String},
    courseInstructors: {type: Array},
    courseAssistant : {type:Array},
    slots: {type:Array, },              //array of slotsID
    courseCoverage :{type: Number}

     
},
  
{
    strict : false,
    timestamps : true
})
  

module.exports = mongoose.model("course", courseSchema)