router.get('/:id', (req, res) => {

    Data.findById(req.params.id)
      .then((data) => {
  
    console.log(data.Status);
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
  
        apartments.forEach(function(object){
          if(object._id.Status ===0){
            Days = object.Count
            if (Days<setDays){
  
              Relay.findById(req.params.id)
              .then((book) => {
                                res.json(book)
                              })
  
  
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
  
  
                })
  
  
  
  
  
  
                })
  
  
  
  
  
            }
          }else {
            Relay.findById(req.params.id)
              .then((book) => {
                                res.json(book)
                              })
  
          }
        })
    });
  }
  
  if(Status === 1){
  
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
  
  
                })
  
  
  
  
  
  
                })
  
  
              }
            }else {
              Relay.findById(req.params.id)
                .then((book) => {
                                  res.json(book)
                                })
  
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
  
            apartments.forEach(function(object){
              if(object._id.Status ===2){
                Days = object.Count
                if (Days<setDays){
  
                  Relay.findById(req.params.id)
                  .then((book) => {
                                    res.json(book)
                                  })
  
  
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
  
  
                })
  
  
  
  
  
                })
  
  
                }
              }else {
                Relay.findById(req.params.id)
                  .then((book) => {
                                    res.json(book)
                                  })
  
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
  
              apartments.forEach(function(object){
                if(object._id.Status ===3){
                  Days = object.Count
                  if (Days<setDays){
  
                    Relay.findById(req.params.id)
                    .then((book) => {
                                      res.json(book)
                                    })
  
  
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
  
  
                })
  
  
  
  
  
  
                })
  
  
                  }
                }else {
                  Relay.findById(req.params.id)
                    .then((book) => {
                                      res.json(book)
                                    })
  
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
  
                apartments.forEach(function(object){
                  if(object._id.Status ===4){
                    Days = object.Count
                    if (Days<setDays){
  
                      Relay.findById(req.params.id)
                      .then((book) => {
                                        res.json(book)
                                      })
                      ;
  
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
  
  
                })
  
  
  
  
  
  
                })
  
  
                    }
                  }else {
                    Relay.findById(req.params.id)
                      .then((book) => {
                                        res.json(book)
                                      })
  
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
  
                  apartments.forEach(function(object){
                    if(object._id.Status ===5){
                      Days = object.Count
                      if (Days<setDays){
  
                        Relay.findById(req.params.id)
                        .then((book) => {
                                          res.json(book)
                                        })
  
  
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
  
  
                        })
  
  
  
  
  
  
                        })
  
  
                      }
                    }else {
                      Relay.findById(req.params.id)
                        .then((book) => {
                                          res.json(book)
                                        })
  
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
  
                    apartments.forEach(function(object){
                      if(object._id.Status ===6){
                        Days = object.Count
                        if (Days<setDays){
  
                          Relay.findById(req.params.id)
                          .then((book) => {
                                            res.json(book)
                                          })
  
  
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
  
  
                })
  
  
  
  
  
  
                })
  
  
  
                        }
                      }else {
                        Relay.findById(req.params.id)
                          .then((book) => {
                                            res.json(book)
                                          })
  
                      }
                    })
                });
              }
  
  
  
  })
  })
  });