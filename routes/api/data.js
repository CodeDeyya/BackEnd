// routes/api/books.js

const express = require('express');
const router = express.Router();

// Load data model
const data = require('../../models/data');
const log = require('../../models/log');
const Relay = require('../../models/Relay');
// @route GET api/books/test
// @description tests books route
// @access Public
router.get('/test', (req, res) => res.send('data route testing!'));

// @route GET api/books
// @description Get all books
// @access Public
router.get('/', (req, res) => {
  data.find()
    .then(books => res.json(books))
    .catch(err => res.status(404).json({ nobooksfound: 'No Books found' }));
});

router.get('/logs', (req, res) => {
  

  log.aggregate([
    {
       $project:
         {
           year: { $year: "$updated_date" },
           month: { $month: "$updated_date" },
           day: { $dayOfMonth: "$updated_date" },
           hour: {$hour: "$updated_date"},
           _id: "$id",
           Atemp: "$Atemp",
           Wtemp: "$Wtemp",
           Rhumidity: "$Rhumidity",
           WaterLevel: "$WaterLevel"
         }
    },
    {
      $group:
        {
         "_id":{ year: "$year",
          month: "$month",
              day: "$day",
            hour:"$hour"},
              avgAtemp: { $avg: "$Atemp" },
              avgWtemp: { $avg: "$Wtemp"},
              avgWaterLevel:{$avg: "$WaterLevel"},
              avgRhumidity:{$avg: "$Rhumidity"}
            }
       }
    
    ],function(err,  apartments) {
      if (err) res.send(err);
      res.json(apartments);
  });


});

router.get('/title', (req, res) => {
  

  log.aggregate([
    {
       $project:
         {
           year: { $year: "$updated_date" },
           month: { $month: "$updated_date" },
           day: { $dayOfMonth: "$updated_date" },
           _id: "$id",
           Status: "$Status",
           Data: "$Status"
         }
    },
    {
      $group:
        {
         "_id":{ Status: "$Status",
                 Year:"$year",
                Month: "$month",
              Day: "$day"},
          Count: {$sum: 1}
            }
       },
       {
        $group:
          {
           "_id":{ Status: "$_id.Status",
                   Year:"$_id.year",
                  Month: "$_id.month",
                Day: "$_id.day"},
            Count: {$sum: 1}
              }
       },   
       {
        $sort: { _id: 1}

       }  
    
    ],function(err,  apartments) {
      if (err) res.send(err);
      res.json(apartments);
  });


});

// @route GET api/books/:id
// @description Get single data by id
// @access Public
router.get('/:id', (req, res) => {
  data.findById(req.params.id)
    .then(data => res.json(data))
    .catch(err => res.status(404).json({ nobookfound: 'No data found' }));
});

// @route GET api/books
// @description add/save data
// @access Public
router.post('/', (req, res) => {
  log.create(req.body)
  .then(data => res.json({ msg: 'Updated successfully' }))
  .catch(err =>
    res.status(400).json({ error: 'Unable to update the Database' })
  );
  
  data.findOneAndUpdate(req.body.DeviceID, req.body)
  .then(data => res.json({ msg: 'Updated successfully' }))
  .catch(err =>
    res.status(400).json({ error: 'Unable to update the Database' })
  );
});

// @route GET api/books/:id
// @description Update data
// @access Public
router.put('/:id', (req, res) => {
  console.log(req.body);
  data.findByIdAndUpdate(req.params.id, req.body)
    .then(data => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
    Relay.findByIdAndUpdate(req.params.id, req.body)
    .then(data => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );    

});

// @route GET api/books/:id
// @description Delete data by id
// @access Public
router.delete('/:id', (req, res) => {
  data.findByIdAndRemove(req.params.id, req.body)
    .then(data => res.json({ mgs: 'data entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a data' }));
});





module.exports = router;