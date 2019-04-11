const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

morgan.token('body',  (req, res) => JSON.stringify(req.body))

app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(bodyParser.json())

let persons = [
    {
        id: 1,
        name: 'Matti Puu',
        number: '003-123123123'
    },
    {
        id: 2,
        name: 'Jarkko Koivu',
        number: '003-4444444'
    },
    {
        id: 3,
        name: 'Heikki Mänty',
        number: '003-555555'
    }

]

app.get('/info', (req, res) => {
    res.send(`Puhelinluettelossa on ${persons.length} henkilön tiedot. <br/> ${new Date()}`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(n => n.id === id);
    if (!person)
        res.status(404).end()
    else
        res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(n => n.id !== id);
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const person = req.body
    if (typeof person.name !== 'string') {
        res.status(400).json({ error: 'name must be string' })
        return
    }
    if (typeof person.number !== 'string') {
        res.status(400).json({ error: 'number must be string' })
        return
    }
    if (persons.some(p => p.name === person.name)) {
        res.status(400).json({ error: 'name must be unique' })
        return
    }
    person.id = Math.round(Math.random() * Number.MAX_SAFE_INTEGER)
    persons.push(person);
    res.json(person);
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
