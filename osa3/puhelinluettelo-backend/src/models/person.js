'use strict';
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const url = `mongodb+srv://fullstack:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}`
mongoose.connect(url, { useNewUrlParser: true }).then(() => {
    console.log('Mongoose connected');
}).catch(err => {
    console.error(err);
})

const personSchema = new mongoose.Schema({
    id: String,
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
