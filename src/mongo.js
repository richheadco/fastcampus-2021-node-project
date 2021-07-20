// @ts-check

const { MongoClient } = require('mongodb')

const uri =
    'mongodb+srv://kevinyoo:Iron1109!@cluster0.s8kvo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

async function main() {
    await client.connect()

    const users = client.db('fc21').collection('users')

    // Reset
    await users.deleteMany({})
    await users.insertMany([{
            name: 'John',
            birthYear: 2000,
        },
        {
            name: 'Smith',
            birthYear: 1995,
        },
        {
            name: 'Kevin',
            birthYear: 1990,
        },
        {
            name: 'Ann',
            birthYear: 1993,
        },
    ])

    await users.deleteOne({
        name: 'John',
    })

    const courser = users.find({
        birthYear: {
            $gte: 1990,
        },
    }, {
        sort: {
            birthYear: 1,
        },
    })
    await courser.forEach(console.log)

    await client.close()
}

main()