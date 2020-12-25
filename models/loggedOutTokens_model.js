//1-mongoose
//2-schema
//3-export model 

const { strict } = require("assert")
const { Double } = require("mongodb")
const mongoose = require ("mongoose")

const enums = require('../api/constants/enums')

let deletedTokensSchema = new mongoose.Schema({
    deletedToken: {type:String},

},
  
{
    strict: false,
    timestamps : true
})
  

module.exports = mongoose.model("deletedTokens", deletedTokensSchema)