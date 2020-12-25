//1-mongoose
//2-schema
//3-export model 

const { strict } = require("assert")
const { Double } = require("mongodb")
const mongoose = require ("mongoose")
const { requestType, requestStatus } = require("../api/constants/enums")

let requestModelSchema = new mongoose.Schema({
   
    senderID : {type:String,},
    recieverID : {type:String,},
    requestDate: {type: Date, default: Date.now },
    activeDate: {type: Date},
    endDate:{type: Date},
    slotID : {type:String,},
    status: {type:String, enum:requestStatus, default: requestStatus.PENDING},
    requestType: {type: String, enum:requestType},  
    brief: {type: String}, //Reason For This Request
    comments:{type: String},
    requestID : {type : String, required : true, unique : true},

    
},
  
{
    strict : false,
    timestamps : true
})
  

module.exports = mongoose.model("request", requestModelSchema)