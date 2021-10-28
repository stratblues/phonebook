
const express = require('express')
const app = express()
const cors = require('cors')



app.use(express.json())
app.use(cors())




let data = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]





app.get('/api/persons', (request, response) => {

    response.json(data)


})
app.get('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id)
    const person = data.find(p => p.id === id)

    response.json(person)


})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    data = data.filter(data => data.id !== id)

    response.status(204).end()
})



app.get('/info', (request, response) => {

    return response.end(`Phonebook has info for ${data.length} people \n\n ${Date()}`)


})


const generateId = () => {

    const maxId = data.length > 0 ? Math.max(...data.map(n => n.id))
        : 0
    return maxId + 1

}





app.post('/api/persons', (request, response) => {

    const body = request.body
    console.log(body)

    if (data.find(n => n.name === body.name)) {
        return response.status(400).json({
            error: 'name taken'
        })

    }
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),

    }


    data = data.concat(person)

    response.json(person)




})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})