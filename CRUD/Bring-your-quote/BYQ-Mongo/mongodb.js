const express = require('express');
const app = express();
const path = require('path')
const assert = require('assert'); //nodeJs module to for code assertions & test
const mongoose = require('mongoose')
const url = "mongodb://127.0.0.1:27017/quotes";


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true}));
app.use(express.json())

app.get('/', (req, res) => {
    res.render('index')
});

app.post('/quotes', (req, res) => {
    const item = {
        author: req.body.name,
        quote: req.body.quote
    }
    mongoose.connect(url, (err, db) => {
        assert.equal(null,err);
        db.collection('quote-data').insertOne(item, (err, result) => {
            assert.equal(null,err)
            console.log('Item inserted')
            db.close()
        })
    })
    res.redirect('/')
})

app.get('/quotes', (req, res) => {
    mongoose.connect(url, (err, db) => {
        assert.equal(null, err)
        let data = db.collection('quote-data').find({}).toArray((err, docs) => {
            assert.equal(null, err)
            console.log('Found the following records')
            res.send(docs)
            db.close()
        })
    })
})


app.listen(5000, () => console.log('App is running ...'))
