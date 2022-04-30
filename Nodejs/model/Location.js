const mongoose = require('mongoose');
const locationSchema = new mongoose.Schema({
    
    id : String,
    authtoken :String,
    latitude :String,
    logitude : String
        


});

module.exports = mongoose.model('location',locationSchema);