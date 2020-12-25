//1-mongoose
//2-schema
//3-export model 

const { strict } = require("assert")
const { Double } = require("mongodb")
const mongoose = require ("mongoose")

var staff = require('./staff_model.js')

let acMemberSchema= new mongoose.Schema({

    position: {type:String,
        required:true,
        $in : ["assistant","instructor"]},
    extraPosition: {type:String,
         required:true,
         $in : ["hod","coordinator"]},
        
   // schedule: {type: [slots], minlength = 1 },              //NOT SURE

    staff:[{type: mongoose.Schema.Types.ObjectId, ref:'staff'}],        //NOT SURE
              
    
},
  
{
    strict : false,
    timestamps : true
})
  

module.exports = mongoose.model("acMember", acMemberSchema)