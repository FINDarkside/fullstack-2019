'use strict';
const mongoose = require('mongoose')
const dotenv = require('dotenv')
var uniqueValidator = require('mongoose-unique-validator');

mongoose.set('useFindAndModify', false)
dotenv.config()
const url = `mongodb+srv://fullstack:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}`
mongoose.connect(url, { useNewUrlParser: true }).then(() => {
    console.log('Mongoose connected');
}).catch(err => {
    console.error(err);
})

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    number: {
        type: String,
        required: true,
        minlength: 8
    }
})
personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
