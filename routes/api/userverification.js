// routes/api/books.js

const express = require('express');
const router = express.Router();

// Load Book model
const Relay = require('../../models/relay.js');

// @route GET api/books/test
// @description tests books route
// @access Public
router.get('/test', (req, res) => res.send('book route testing!'));

// @route GET api/books
// @description Get all books
// @access Public
router.get('/', (req, res) => {
  console.log(req.query.q);
  console.log("GET");
  var search = {
    Email: ""
  }
  search.Email = req.query.q;

  Relay.find(search)
    .then(books => res.json(books))
    .catch(err => res.status(404).json({ norelaysfound: 'No Relays found' }));
});

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get('/:id', (req, res) => {
  console.log(req.params.id);
  Relay.findById(req.params.id)
    .then(book => res.json(book))
    .catch(err => res.status(404).json({ norelayfound: 'No Relay found' }));
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