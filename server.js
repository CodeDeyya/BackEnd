const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

// routes
const books = require('./routes/api/books.js');
const relays = require('./routes/api/relays.js');
const userverification = require ('./routes/api/userverification.js')
const data = require('./routes/api/data.js')
const logger = require('./routes/api/logger.js')
const waterchange = require('./routes/api/waterchange.js')
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
app.use('/api/waterchange', waterchange)

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));