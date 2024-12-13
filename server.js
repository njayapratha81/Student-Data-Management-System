const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const uri = 'mongodb+srv://njayapratha81:Jaya%40123@cluster0.r5ckb9v.mongodb.net/';
let studentsCollection;

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
        const db = client.db('dbs');
        studentsCollection = db.collection('students');
        console.log('Connected to MongoDB');
    })
    .catch(error => console.error('MongoDB connection error:', error));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/add-student', (req, res) => {
    studentsCollection.insertOne(req.body)
        .then(result => {
            res.json({ message: 'added successfully' });
        })
        .catch(error => {
            res.status(500).json({ error: 'Error adding student' });
        });
});

app.post('/update-student', (req, res) => {
    const { id, name, total } = req.body;
    studentsCollection.updateOne({ id }, { $set: { name, total } })
        .then(result => {
            res.json({ message: 'updated successfully' });
        })
        .catch(error => {
            res.status(500).json({ error: 'Error updating student' });
        });
});

app.post('/delete-student', (req, res) => {
    const { id } = req.body;
    studentsCollection.deleteOne({ id })
        .then(result => {
            res.json({ message: 'deleted successfully' });
        })
        .catch(error => {
            res.status(500).json({ error: 'Error deleting student' });
        });
});

app.get('/students', (req, res) => {
    studentsCollection.find()
        .sort({ total: -1 }) // Sort by 'total' in descending order
        .toArray()
        .then(students => {
            res.json(students);
        })
        .catch(error => {
            res.status(500).json({ error: 'Error fetching students' });
        });
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
