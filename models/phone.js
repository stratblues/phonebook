const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const url = process.env.MONGODB_URI

console.log('connecting to', url)



mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })



const phoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
    },
    number: {
        type: Number,
        required: true,
        minLength: 8,
    }

}, {
    writeConcern: {
        w: 'majority',
        j: true,
        wtimeout: 1000
    }
});

phoneSchema.plugin(uniqueValidator);



phoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})


module.exports = mongoose.model('Phone', phoneSchema)