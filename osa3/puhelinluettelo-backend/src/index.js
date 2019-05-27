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

app.put('/api/persons/:id', async (req, res) => {
    const personData = {
        name: req.body.name,
        number: req.body.number
    }
    if (typeof personData.name !== 'string')
        throw new Error('Name must be string')
    if (typeof personData.number !== 'string')
        throw new Error('Number must be string')
    const person = await Person.findByIdAndUpdate(req.params.id, personData, { new: true });
    if (!person)
        throw new Error('User does not exist')
    res.json(person.toJSON());
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

app.use((req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
})

app.use((error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
