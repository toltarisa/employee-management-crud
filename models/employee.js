const mongoose = require('mongoose');
let empSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    surname:{
        type:String,
        required:true
    },
    job:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    }

},{collection:'myapp'});

let Employee = module.exports = mongoose.model('Employee',empSchema);