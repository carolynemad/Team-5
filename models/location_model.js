//1-mongoose
//2-schema
//3-export model 

const { strict } = require("assert")
const { number } = require("joi")
const { Double } = require("mongodb")
const mongoose = require ("mongoose")

let locationSchema = new mongoose.Schema({
   
    // locationBuilding : {type:String,
    //     required:true},
        
    // locationFloor : {type:Number,
    //     required:true},
    // locationRoom: {type:Number,
    //     required:true},
    locationName:{type: String , required: true},
    locationType: {type :String,
      $in: ["lecture", "lab", "tutorial", "TAoffice", "DRoffice", "Exam Hall"],
       required :true}, 
   capacity: {type: Number, required :true},
   staff: {type: Array , required:false}
   },
  
{
    strict : false,
    timestamps : true
})
  

module.exports = mongoose.model("location", locationSchema)