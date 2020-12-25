//1-mongoose
//2-schema
//3-export model 

const { strict } = require("assert")
const { Double } = require("mongodb")
const mongoose = require ("mongoose")
const { slotNumber, slotDay, slotType } = require("../api/constants/enums")

const enums = require('../api/constants/enums')


let slotSchema= new mongoose.Schema({
   
    slotID: {type:String , required:true , unique:true}, // (sa-su-mo-tu-we-th)(1-2-3-4-5)(location) ex.tu3c3201

    slotNumber : {type:String,
    required:true,
    enums:slotNumber},

    slotDay: {type :String,
    enums:slotDay,
    required :true
    },

    slotType: {type: String, required : true,
    enums:slotType},

    acID: {type: String , default:"Unassigned"},
    courseID:{type: String},
    location: {type: String} 
    

},
  
{
    strict : false,
    timestamps : true
})
  

module.exports = mongoose.model("slot", slotSchema)