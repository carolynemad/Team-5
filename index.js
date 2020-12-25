const {app} = require('./app')
const mongoose = require("mongoose")
const { insertMany } = require('./models/staff_model')
const staff_model = require('./models/staff_model')
require ('dotenv').config() //to have access to your configurations
mongoose.connect(process.env.DB_URL, {useNewUrlParsers:true , useUnifiedTopology:true},()=>{
    insert();
}) //calls for the url in the env file
app.listen(process.env.PORT)
