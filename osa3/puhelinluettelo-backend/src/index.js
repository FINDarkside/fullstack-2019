const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const Person = require('./models/person');

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(bodyParser.json())

app.get('/info', async (req, res) => {
    res.send(`Puhelinluettelossa on ${await Person.count({})} henkilön tiedot. <br/> ${new Date()}`)
})

app.get('/api/persons', async (req, res) => {
    const persons = await Person.find();
    res.json(persons.map(p => p.toJSON()))
})

app.get('/api/persons/:id', async (req, res) => {
    const id = req.params.id
    const person = await Person.findOne({ _id: id })
    if (!person)
        res.status(404).end()
    else
        res.json(person.toJSON())
})

app.delete('/api/persons/:id', async (req, res) => {
    const id = Number(req.params.id)
    await Person.deleteOne(id);
    res.status(204).end()
})

app.post('/api/persons', async (req, res) => {

    const name = req.body.name
    const number = req.body.number

    if (typeof name !== 'string') {
        res.status(400).json({ error: 'name must be string' })
        return
    }
    if (typeof number !== 'string') {
        res.status(400).json({ error: 'number must be string' })
        return
    }
    /*if (persons.some(p => p.name === person.name)) {
        res.status(400).json({ error: 'name must be unique' })
        return
    }*/
    let person = await new Person({ name, number }).save();
    res.json(person.toJSON());
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
