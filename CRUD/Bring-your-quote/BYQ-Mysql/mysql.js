const express = require('express')
const app = express()
const assert = require('assert')
const path = require('path')
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'quotes'
});

// connect to database
connection.connect((err) => {
    assert.equal(null, err)
    console.log('Connected to database ...')
});

global.connection = connection;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true}));
app.use(express.json())

app.get('/', (req, res) => {
    res.render('index')
});

app.post('/quotes', (req, res) => {
    let author = req.body.name;
    let quote = req.body.quote;

    let query = "INSERT INTO `Proverbs` (author, quote) VALUES ('"+author+"', '"+quote+"')";
    connection.query(query, (err, result) => {
        assert.equal(null, err);
        console.log('items inserted');
    })
    res.redirect('/') 
});

app.get('/quotes', (req, res) => {
    let query = "SELECT * FROM `Proverbs`";
    connection.query(query, (err, docs) => {
        assert.equal(null, err);
        console.log('Items found')
        res.send(docs)
    })
})


app.listen(5000, () => console.log("App running ..."))
