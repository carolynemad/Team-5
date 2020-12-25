//1-mongoose
//2-schema
//3-export model 

const { strict } = require("assert")
const { Double } = require("mongodb")
const mongoose = require ("mongoose")

let leaveLogSchema= new mongoose.Schema({
   
    leaveType: {type:String,
    required:true,
    $in : ["compensation","annual","accident","sick","maternity" ]},

    annualLeaveBalance: {type:Number},          
     
},
  
{
    strict : false,
    timestamps : true
})
  

module.exports = mongoose.model("leaveLog", leaveLogSchema)