const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config()

const clientRoutes = require('./routes/clientes');

const app = express();
const db = process.env.MONGODB_URL; 

mongoose.connect(db ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.json()); 
app.use(cors({
    /* origin: 'http://localhost:8080',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'] */
}));

/* app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-Width, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).json({});
    }
}); */

app.use('/clientes', clientRoutes);

app.use((req, res, next) =>{
    const error = new Error('Não encontrado');
    next(error);
});

app.use((error, req, res, next) =>{
    res.json({
        error: {
            message: error.message
        }
    })
});

app.listen(3000, () => { console.log('Server is running...') });