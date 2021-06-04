// routes/api/books.js

const express = require('express');
const router = express.Router();

// Load Book model
const Relay = require('../../models/relay.js');
const Data = require('../../models/data.js');
const log = require('../../models/log.js');
const logger = require('../../models/logger.js');
const data = require('../../models/data.js');

var setDays = 0
var Days = 0
var Status = 0
var Germination = 0
var EarlyVeg = 0
var MidVeg = 0
var LateVeg = 0
var Transition = 0
var Flower = 0
var Flush = 0


// @route GET api/books/test
// @description tests books route
// @access Public
router.get('/test', (req, res) => res.send('book route testing!'));

// @route GET api/books
// @description Get all books
// @access Public
router.get('/', (req, res) => {
  Relay.find()
  .then(books => res.json(books))
  .catch(err => res.status(404).json({ norelaysfound: 'No Relays found' }));
 
});

router.get('/:id', (req, res) => {
  Data.findById(req.params.id)
  .then((data) => {
    console.log (data.Status)
    Status = data.Status
  })
});
// @route GET api/books
// @description add/save book
// @access Public
router.post('/', (req, res) => {
  Relay.create(req.body)
    .then(book => res.json({ msg: 'Relay added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this relay' }));
});

// @route GET api/books/:id
// @description Update book
// @access Public
router.put('/:id', (req, res) => {
  Relay.findByIdAndUpdate(req.params.id, req.body)
    .then(book => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete('/:id', (req, res) => {
  Relay.findByIdAndRemove(req.params.id, req.body)
    .then(book => res.json({ mgs: 'relay entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a relay' }));
});

module.exports = router;