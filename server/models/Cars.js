const mongoose = require('mongoose');

const carSchema= new mongoose.Schema({
  
     brand:{
        type: String,
        required: true
     },
     model:{
        type: Number,
        required : true
     }
})


const Cars = mongoose.model("Cars", carSchema);
module.exports = Cars;