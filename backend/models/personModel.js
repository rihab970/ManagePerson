const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    lastName: {
        type: String,
        required: true
     },
     firstName: {
        type: String,
        required: true
     },
     email: {
        type: String,
        required: true,
        unique: true
     },
     age: {
        type: Number,
        default:15
     },

}, {
    timestamps: true,
});


const Person = mongoose.model('person',personSchema);
module.exports= Person;