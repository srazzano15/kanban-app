const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

// GET Todos list
router.get('/', async (req, res) => {
    const todos = await loadTodoCollection()
    res.send(await todos.find({}).toArray())
})

// POST a Todo
router.post('/', async (req, res) => {
    const todos = await loadTodoCollection();
    await todos.insertOne({
        text: req.body.text,
        createdAt: new Date()
    })
    res.status(201).send()
})

// DELETE a Todo
router.delete('/:id', async (req, res) => {
    const todos = await loadTodoCollection()
    await todos.deleteOne({_id: new mongodb.ObjectID(req.params.id)})
    res.status(200).send()
})

async function loadTodoCollection() {
    const client = await mongodb.MongoClient
        .connect(`mongodb+srv://steve:hunting789@todo-app-mrehc.mongodb.net/test?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        return client.db('todo-app').collection('todos')
}

module.exports = router