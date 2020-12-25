//1-mongoose
//2-schema
//3-export model 

const { strict } = require("assert")
const { Double } = require("mongodb")
const mongoose = require ("mongoose")

var slot = require('./slot_model.js')
var request = require('./request_model.js')

let annualLeaveSchema= new mongoose.Schema({
   
    status: {type:String,
    required:true,
    $in : ["accept","reject","pending"]},
    targetDay: {type : Date},
    slot:[{type: mongoose.Schema.Types.ObjectId, ref:'slot'}],
    request:[{type: mongoose.Schema.Types.ObjectId, ref:'request'}]

},
  
{
    strict : false,
    timestamps : true
})
  

module.exports = mongoose.model("annualLeave", annualLeaveSchema)