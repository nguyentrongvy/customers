const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { saveDataCSV } = require('./services/csv.service');

const app = express();

app.use(cors({
    origin: '*',
}));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/read-file-csv', async (req, res) => {
    try {
        await saveDataCSV();
        res.status(200).json({
            status: 'success',
        });
    } catch (error) {
        console.log(error);
    }
});

app.get('/ping', (req, res) => {
    res.send('pong')
})

app.use(bodyParser.json())

app.listen(4000, () => {
    console.log('Server started on port 4000');
    mongoose.set("strictQuery", false);
    mongoose.connect('mongodb://127.0.0.1:27017/test11').then(() => console.log('Connected!'));
});