const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

// routes
const books = require('./routes/api/books');
const relays = require('./routes/api/relays');
const userverification = require ('./routes/api/userverification')
const data = require('./routes/api/data')
const logger = require('./routes/api/logger')
const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/books', books);
app.use('/api/relays', relays);
app.use('/api/userverification',userverification);
app.use('/api/data', data);
app.use('/api/logger', logger);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));