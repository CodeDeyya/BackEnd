// routes/api/books.js

const express = require('express');
const router = express.Router();

// Load Book model
const Relay = require('../../models/Relay');
const Data = require('../../models/data');
const log = require('../../models/log');
const logger = require('../../models/logger');

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

// @route GET api/books/:id
// @description Get single book by id
// @access Public
router.get('/:id', (req, res) => {
 
  Data.findById(req.params.id)
    .then((data) => {
  Status = data.Status

  logger.findById(req.params.id)
  .then((book) => {
                    Germination = book.Germination
                    EarlyVeg = book.EarlyVeg
                    MidVeg = book.MidVeg
                    LateVeg = book.LateVeg
                    Transition = book.Transition
                    Flower = book.Flower
                    Flush = book.Flush


console.log(EarlyVeg);

if(Status === 0){

setDays = Germination  
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
      apartments.forEach(function(object){
        if(object._id.Status ===0){
          Days = object.Count
          if (Days<setDays){

            Relay.findById(req.params.id)
            .then((book) => {
                              res.json(book)
                            })
            .catch(err => res.status(404).json({ norelayfound: 'No Relay found' }));

          }else{
            var message = JSON.parse(`{"Status": 1}`);
            Data.findByIdAndUpdate(req.params.id, message)
              .then((data) => { 
                Relay.findByIdAndUpdate(req.params.id, message)
                .then((data) => {
                  Relay.findById(req.params.id)
                  .then((book) => {
                                    res.json(book)
                                  })
                  .catch(err => res.status(404).json({ norelayfound: 'No Relay found' }));
              
              })
                  .catch(err =>
                  res.status(400).json({ error: 'Unable to update the Database' })
              );   




                
              })
               .catch(err =>
                res.status(400).json({ error: 'Unable to update the Database' })
            );
            
   


          }
        }else {
          Relay.findById(req.params.id)
            .then((book) => {
                              res.json(book)
                            })
            .catch(err => res.status(404).json({ norelayfound: 'No Relay found' }));
        }
      })
  });
}

if(Status === 1){
  console.log("im in")
  setDays = EarlyVeg  
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
        apartments.forEach(function(object){
          
          if(object._id.Status ===1){
            Days = object.Count
            console.log(Days);
            console.log(setDays);
            if (Days<setDays){
              console.log("in")
              Relay.findById(req.params.id)
              .then((book) => {
                                res.json(book)
                              })
              .catch(err => res.status(404).json({ norelayfound: 'No Relay found' }));
  
            }else{
              var message = JSON.parse(`{"Status": 2}`);
              Data.findByIdAndUpdate(req.params.id, message)
              .then((data) => { 
                Relay.findByIdAndUpdate(req.params.id, message)
                .then((data) => {
                  Relay.findById(req.params.id)
                  .then((book) => {
                                    res.json(book)
                                  })
                  .catch(err => res.status(404).json({ norelayfound: 'No Relay found' }));
              
              })
                  .catch(err =>
                  res.status(400).json({ error: 'Unable to update the Database' })
              );   




                
              })
               .catch(err =>
                res.status(400).json({ error: 'Unable to update the Database' })
            );
            
            }
          }else {
            Relay.findById(req.params.id)
              .then((book) => {
                                res.json(book)
                              })
              .catch(err => res.status(404).json({ norelayfound: 'No Relay found' }));
          }
        })
    });
  }


  if(Status === 2){

    setDays = MidVeg  
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
          apartments.forEach(function(object){
            if(object._id.Status ===2){
              Days = object.Count
              if (Days<setDays){
    
                Relay.findById(req.params.id)
                .then((book) => {
                                  res.json(book)
                                })
                .catch(err => res.status(404).json({ norelayfound: 'No Relay found' }));
    
              }else{
                var message = JSON.parse(`{"Status": 3}`);
                Data.findByIdAndUpdate(req.params.id, message)
              .then((data) => { 
                Relay.findByIdAndUpdate(req.params.id, message)
                .then((data) => {
                  Relay.findById(req.params.id)
                  .then((book) => {
                                    res.json(book)
                                  })
                  .catch(err => res.status(404).json({ norelayfound: 'No Relay found' }));
              
              })
                  .catch(err =>
                  res.status(400).json({ error: 'Unable to update the Database' })
              );   




                
              })
               .catch(err =>
                res.status(400).json({ error: 'Unable to update the Database' })
            );
            
              }
            }else {
              Relay.findById(req.params.id)
                .then((book) => {
                                  res.json(book)
                                })
                .catch(err => res.status(404).json({ norelayfound: 'No Relay found' }));
            }
          })
      });
    }

    if(Status === 3){

      setDays = LateVeg  
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
            apartments.forEach(function(object){
              if(object._id.Status ===3){
                Days = object.Count
                if (Days<setDays){
      
                  Relay.findById(req.params.id)
                  .then((book) => {
                                    res.json(book)
                                  })
                  .catch(err => res.status(404).json({ norelayfound: 'No Relay found' }));
      
                }else{
                  var message = JSON.parse(`{"Status": 4}`);
                  Data.findByIdAndUpdate(req.params.id, message)
              .then((data) => { 
                Relay.findByIdAndUpdate(req.params.id, message)
                .then((data) => {
                  Relay.findById(req.params.id)
                  .then((book) => {
                                    res.json(book)
                                  })
                  .catch(err => res.status(404).json({ norelayfound: 'No Relay found' }));
              
              })
                  .catch(err =>
                  res.status(400).json({ error: 'Unable to update the Database' })
              );   




                
              })
               .catch(err =>
                res.status(400).json({ error: 'Unable to update the Database' })
            );
            
                }
              }else {
                Relay.findById(req.params.id)
                  .then((book) => {
                                    res.json(book)
                                  })
                  .catch(err => res.status(404).json({ norelayfound: 'No Relay found' }));
              }
            })
        });
      }

      if(Status === 4){

        setDays = Transition  
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
              apartments.forEach(function(object){
                if(object._id.Status ===4){
                  Days = object.Count
                  if (Days<setDays){
        
                    Relay.findById(req.params.id)
                    .then((book) => {
                                      res.json(book)
                                    })
                    .catch(err => res.status(404).json({ norelayfound: 'No Relay found' }));
        
                  }else{
                    var message = JSON.parse(`{"Status": 5}`);
                    Data.findByIdAndUpdate(req.params.id, message)
              .then((data) => { 
                Relay.findByIdAndUpdate(req.params.id, message)
                .then((data) => {
                  Relay.findById(req.params.id)
                  .then((book) => {
                                    res.json(book)
                                  })
                  .catch(err => res.status(404).json({ norelayfound: 'No Relay found' }));
              
              })
                  .catch(err =>
                  res.status(400).json({ error: 'Unable to update the Database' })
              );   




                
              })
               .catch(err =>
                res.status(400).json({ error: 'Unable to update the Database' })
            );
            
                  }
                }else {
                  Relay.findById(req.params.id)
                    .then((book) => {
                                      res.json(book)
                                    })
                    .catch(err => res.status(404).json({ norelayfound: 'No Relay found' }));
                }
              })
          });
        }

        if(Status === 5){

          setDays = Flower  
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
                apartments.forEach(function(object){
                  if(object._id.Status ===5){
                    Days = object.Count
                    if (Days<setDays){
          
                      Relay.findById(req.params.id)
                      .then((book) => {
                                        res.json(book)
                                      })
                      .catch(err => res.status(404).json({ norelayfound: 'No Relay found' }));
          
                    }else{
                      var message = JSON.parse(`{"Status": 6}`);
                      Data.findByIdAndUpdate(req.params.id, message)
                      .then((data) => { 
                        Relay.findByIdAndUpdate(req.params.id, message)
                        .then((data) => {
                          Relay.findById(req.params.id)
                          .then((book) => {
                                            res.json(book)
                                          })
                          .catch(err => res.status(404).json({ norelayfound: 'No Relay found' }));
                      
                      })
                          .catch(err =>
                          res.status(400).json({ error: 'Unable to update the Database' })
                      );   
        
        
        
        
                        
                      })
                       .catch(err =>
                        res.status(400).json({ error: 'Unable to update the Database' })
                    );
                    
                    }
                  }else {
                    Relay.findById(req.params.id)
                      .then((book) => {
                                        res.json(book)
                                      })
                      .catch(err => res.status(404).json({ norelayfound: 'No Relay found' }));
                  }
                })
            });
          }

          if(Status === 6){

            setDays = Flush  
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
                  apartments.forEach(function(object){
                    if(object._id.Status ===6){
                      Days = object.Count
                      if (Days<setDays){
            
                        Relay.findById(req.params.id)
                        .then((book) => {
                                          res.json(book)
                                        })
                        .catch(err => res.status(404).json({ norelayfound: 'No Relay found' }));
            
                      }else{
                        var message = JSON.parse(`{"Status": 6}`);
                        Data.findByIdAndUpdate(req.params.id, message)
              .then((data) => { 
                Relay.findByIdAndUpdate(req.params.id, message)
                .then((data) => {
                  Relay.findById(req.params.id)
                  .then((book) => {
                                    res.json(book)
                                  })
                  .catch(err => res.status(404).json({ norelayfound: 'No Relay found' }));
              
              })
                  .catch(err =>
                  res.status(400).json({ error: 'Unable to update the Database' })
              );   




                
              })
               .catch(err =>
                res.status(400).json({ error: 'Unable to update the Database' })
            );
            

                      }
                    }else {
                      Relay.findById(req.params.id)
                        .then((book) => {
                                          res.json(book)
                                        })
                        .catch(err => res.status(404).json({ norelayfound: 'No Relay found' }));
                    }
                  })
              });
            }



})
  .catch(err => res.status(404).json({ ID: 'Not Found' }));                    











})
    .catch(err => res.status(404).json({ nobookfound: 'No data found' }));
  

 
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