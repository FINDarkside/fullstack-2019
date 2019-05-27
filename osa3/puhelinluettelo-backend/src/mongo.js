const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

async function main() {
    if (process.argv.length < 3) {
        console.log('Too few arguments. Required arguments: password')
        process.exit(1);
    }
    const password = process.argv[2]
    const url = `mongodb+srv://fullstack:${password}@cluster0-5gozn.mongodb.net/test?retryWrites=true`
    await mongoose.connect(url, { useNewUrlParser: true })

    if (process.argv.length === 3) {
        const persons = await Person.find()
        console.log('puhelinluettelo:')
        persons.forEach(p => console.log(p.name + ' ' + p.number))
    } else {
        const name = process.argv[3]
        const number = process.argv[4]
        const person = new Person({
            name,
            number
        })
        await person.save()
    }
}

main().then(() => process.exit(0)).catch(err => {
    console.error(err)
    process.exit(1)
})