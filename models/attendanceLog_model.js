//1-mongoose
//2-schema
//3-export model 

const { strict } = require("assert")
const { string, array } = require("joi")
const { Double } = require("mongodb")
const mongoose = require ("mongoose")

// var staffModel = require('./staff_model')


let attendanceLogSchema= new mongoose.Schema({
    
    signIn: {type:String},
    signOut: {type:String},
    requiredMinutesPerDay: {type:Number , default: 504},
    minutesAttendedPerMonth: {type:Number , default: 0},
    missingMinutesPerDay: {type:Number},
    missingMinutesPerMonth: {type:Number},
    missingDays: {type:Array},
    totalSalaryDeductionPrevMonth: {type: Number},
    extraMinutes:{type:Number},
    attendedDays: {type:Array},
    memberId:{type: String , unique: true},
    log: {type:Array}
     
},
  
{
    strict : false,
    timestamps : true
})
  

module.exports = mongoose.model("attendanceLog", attendanceLogSchema)