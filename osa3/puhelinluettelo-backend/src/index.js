const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Person = require('./models/person');

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(express.static('build'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(bodyParser.json());

app.get('/info', async (req, res) => {
    res.send(`Puhelinluettelossa on ${await Person.count({})} henkilön tiedot. <br/> ${new Date()}`);
});

app.get('/api/persons', async (req, res, next) => {
    try {
        const persons = await Person.find();
        res.json(persons.map(p => p.toJSON()));
    } catch (err) {
        next(err);
    }
});

app.get('/api/persons/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const person = await Person.findOne({ _id: id });
        if (!person)
            res.status(404).end();
        else
            res.json(person.toJSON());
    } catch (err) {
        next(err);
    }
});

app.put('/api/persons/:id', async (req, res, next) => {
    try {
        const personData = {
            name: req.body.name,
            number: req.body.number
        };
        const person = await Person.findByIdAndUpdate(req.params.id, personData, { new: true });
        if (!person)
            return next(new Error('User does not exist'));
        res.json(person.toJSON());
    } catch (err) {
        next(err);
    }
});

app.delete('/api/persons/:id', async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        await Person.deleteOne(id);
        res.status(204).end();
    } catch (err) {
        next(err);
    }
});

app.post('/api/persons', async (req, res, next) => {
    try {
        const name = req.body.name;
        const number = req.body.number;
        let person = await new Person({ name, number }).save();
        res.json(person.toJSON());
    } catch (err) {
        next(err);
    }
});

app.use((req, res) => {
    res.status(404).send({ error: 'unknown endpoint' });
});

app.use((error, request, response, next) => {
    console.error(error.message);
    if (response.headersSent) {
        return next(error);
    }
    if (error.name === 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === 'ValidatorError') {
        return response.status(400).send({ error: error.message });
    } else {
        return response.status(500).send({ error: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
