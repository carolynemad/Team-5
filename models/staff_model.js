//1-mongoose
//2-schema
//3-export model 

const { strict } = require("assert")
const { Double } = require("mongodb")
const mongoose = require ("mongoose")

const enums = require('../api/constants/enums')

// var attendancelogModel = require('./attendanceLog_model')
//var leaveLog = require('./leavelog_model.js')

let staffSchema= new mongoose.Schema({
    firstName: {type:String, minLength:3},
    lastName: {type:String, minLength:3},
    memberId: {type:String , required:true , unique:true},

    gender: {type:String,
    required:true,
    enum:enums.gender},

    birthDate:{type:Date},
    address: {type:String},
    salary: {type:Number},

    type: {type:String,
        //required:true,
        $in : ["Academic","HR"]},

    staffMemberType:{type:String,
    required:true,
    enum: enums.staffMemberType
    },

    daysOff:{type:Array , default: []},

    email : {type: String,
          required: true,
        unique:true},

    password : {type: String,
          required: true},
    
    officeLocation : {type:String}, //to be changed and import subschema
 
    // attendanceLog:{type: mongoose.Schema.Types.ObjectId, ref:"attendanceLog"},
    // leaveLog:[{type: mongoose.Schema.Types.ObjectId, ref:'leaveLog'}],
    
    annualLeaveBalance: {type:Number},
    accidentalLeaveBalance: {type:Number , default: 6},


    loggedIn: {type:Boolean ,
    default:false},

    requestLog: {type:Array , default:[]},
    
    notifications:{type:Array , default:[]}
     
},
  
{
    strict: false,
    timestamps : true
})
  

module.exports = mongoose.model("staff", staffSchema)