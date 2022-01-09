require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Phone = require('./models/phone')


app.use(express.json())
app.use(cors())
app.use(express.static('build'))




app.get('/api/persons', (request, response) => {

    Phone.find({}).then(entry => {
        response.json(entry)
    })



})
app.get('/api/persons/:id', (request, response) => {

    Phone.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            }
            else {
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({ error: 'malformatted id' })
        })


})

app.put('/api/persons/:id', (req, res) => {

    const updates = req.body

    Phone.findByIdAndUpdate(req.params.id, updates, { new: true })
        .then(updatedPhone => res.json(updatedPhone))
        .catch(err =>
            console.error(err.message))

})


app.post('/api/persons', (request, response, next) => {

    const body = request.body
    if (body.name === undefined) {
        return response.status(400).json({ error: 'name missing' })
    }


    const person = new Phone({
        name: body.name,
        number: body.number,

    })

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))



})








app.delete('/api/persons/:id', (request, response) => {
    Phone.findById(request.params.id).then(person => {
        person.remove()
    })

})



app.get('/info', async (request, response) => {
    const data = await Phone.find({})
    return response.end(`Phonebook has info for ${data.length} people \n\n ${Date()}`)


})





// const generateId = () => {

//     const maxId = data.length > 0 ? Math.max(...data.map(n => n.id))
//         : 0
//     return maxId + 1

// }

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    next(error)
}



app.use(errorHandler)





const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})