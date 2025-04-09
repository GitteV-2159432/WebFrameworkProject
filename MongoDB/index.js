const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();

const dbURI = 'mongodb+srv://'+process.env.DBUSERNAME+':'+process.env.DBPASSWORD+'@'+process.env.CLUSTER+'.mongodb.net/'+process.env.DB+'?retryWrites=true&w=majority';
mongoose.connect(dbURI).then((result) => {
    console.log('Connected to MongoDB');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}).catch((err) => {
    console.log(err);
});


const Book = require('./models/Books');
/*
const newBook = new Book({
    title: 'To Sir With Love',
    author: 'Braithwaite',
    genre: 'Fiction',
    pages: 197,
    publisher: 'Penguin Books',
});

newBook.save().then((result) => {
    console.log('Book saved:', result);
}).catch((err) => {
    console.log(err);
});
*/

// Try/catch manner
/*
Book.find().then((result) => {
    console.log('Books found:', result);
}).catch((err) => {
    console.log(err);
});
*/

//async/await manner
const getAll = async() => {
    try{
        const result = await Book.find();
        console.log('Books found:', result);
    }catch (err){
        console.log(err);
    }
}
getAll();

//API routes
app.get('/books', async (req, res) => {
    try{
        const result = await Book.find();
        res.json(result);
    }catch (err){
        console.log(err);
    }
});

app.get('/books/:id', async (req, res) => {
    try{
        const result = await Book.findById(req.params.id);
        res.json(result);
    }catch (err){
        console.log(err);
    }
});

