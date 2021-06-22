// routes/api/books.js

const express = require("express");
const router = express.Router();

// Load Book model
const Relay = require("../../models/relay.js");
const Data = require("../../models/data.js");
const log = require("../../models/log.js");
const logger = require("../../models/logger.js");
const Light = require("../../models/lightcontroller.js");

const getState = async (data) => {
  try {
    await Data.findById(req.params.id);
    console.log(data.Status);
    Status = data.Status;
    state = data;
    res.json(data);
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
};

// @route GET api/books/test
// @description tests books route
// @access Public
router.get("/test", (req, res) => res.send("book route testing!"));

// @route GET api/books
// @description Get all books
// @access Public
router.get("/", (req, res) => {
  Relay.find()
    .then((books) => res.json(books))
    .catch((err) => res.status(404).json({ norelaysfound: "No Relays found" }));
});

router.get("/:id", (req, res) => {
  //update Light Code
  Data.findOne({ DeviceID: req.params.id })
    .then((data) => {
      var Type;
      console.log("Status", data.Status);
      Status = data.Status;
      console.log("Time", Date.now());
      var today = new Date();
      var time = today.getHours();
      console.log("Hours", time);
      Light.findOne({ DeviceID: req.params.id })
        .then(async (data) => {
          console.log("Type", data.Type);
          console.log("Device", req.params.id);
          Type = data.Type;
          if (Type === 0) {
            switch (Status) {
              case 0:
              case 1:
              case 2:
              case 3:
                // Germination
                if (time >= 6) {
                  console.log("Light On Type0");
                  await Relay.findOneAndUpdate(
                    { _id: req.params.id },
                    { R11: "ON" }
                  );
                } else {
                  console.log("Light Off Type0");
                  await Relay.findOneAndUpdate(
                    { _id: req.params.id },
                    { R11: "OFF" }
                  );
                }
                break;
              case 4:
              case 5:
              case 6:
                // Transition
                if (6 <= time && time < 18) {
                  console.log("Light On Type0");
                  await Relay.findOneAndUpdate(
                    { _id: req.params.id },
                    { R11: "ON" }
                  ).catch((error) => {
                    console.log(error);
                  });
                } else {
                  console.log("Light Off Type0");
                  await Relay.findOneAndUpdate(
                    { _id: req.params.id },
                    { R11: "OFF" }
                  );
                }
                break;
              default:
              //default option
            }
          }
          if (Type === 1) {
            if (time >= 6) {
              console.log("Light On Type1");
              await Relay.findOneAndUpdate(
                { _id: req.params.id },
                { R11: "ON" }
              ).catch((error) => {
                console.log(error);
              });
            } else {
              console.log("Light Off Type1");
              await Relay.findOneAndUpdate(
                { _id: req.params.id },
                { R11: "OFF" }
              );
            }
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    })
    .catch((error) => {
      console.log("error", error);
    });

  //response Code
  Data.findOne({ DeviceID: req.params.id }).then((data) => {
    console.log(data.Status);
    Status = data.Status;

    logger.findOne({ DeviceID: req.params.id }).then((book) => {
      Germination = book.Germination;
      EarlyVeg = book.EarlyVeg;
      MidVeg = book.MidVeg;
      LateVeg = book.LateVeg;
      Transition = book.Transition;
      Flower = book.Flower;
      Flush = book.Flush;

      if (Status === 0) {
        setDays = Germination;
        log.aggregate(
          [
            {
              $project: {
                year: { $year: "$updated_date" },
                month: { $month: "$updated_date" },
                day: { $dayOfMonth: "$updated_date" },
                _id: "$id",
                Status: "$Status",
                Data: "$Status",
              },
            },
            {
              $group: {
                _id: {
                  Status: "$Status",
                  Year: "$year",
                  Month: "$month",
                  Day: "$day",
                },
                Count: { $sum: 1 },
              },
            },
            {
              $group: {
                _id: {
                  Status: "$_id.Status",
                  Year: "$_id.year",
                  Month: "$_id.month",
                  Day: "$_id.day",
                },
                Count: { $sum: 1 },
              },
            },
            {
              $sort: { _id: 1 },
            },
          ],
          function (err, apartments) {
            apartments.forEach(function (object) {
              console.log(object);
              if (object._id.Status === 0) {
                Days = object.Count;
              }
            });

            if (Days < setDays) {
              Relay.findById(req.params.id).then((book) => {
                res.json(book);
              });
            } else {
              var message = JSON.parse(`{"Status": 1}`);
              findOne({ DeviceID: req.params.id }).then((data) => {
                Relay.findByIdAndUpdate(req.params.id, message).then((data) => {
                  Relay.findById(req.params.id).then((book) => {
                    res.json(book);
                  });
                });
              });
            }
          }
        );
      }

      if (Status === 1) {
        setDays = EarlyVeg;
        log.aggregate(
          [
            {
              $project: {
                year: { $year: "$updated_date" },
                month: { $month: "$updated_date" },
                day: { $dayOfMonth: "$updated_date" },
                _id: "$id",
                Status: "$Status",
                Data: "$Status",
              },
            },
            {
              $group: {
                _id: {
                  Status: "$Status",
                  Year: "$year",
                  Month: "$month",
                  Day: "$day",
                },
                Count: { $sum: 1 },
              },
            },
            {
              $group: {
                _id: {
                  Status: "$_id.Status",
                  Year: "$_id.year",
                  Month: "$_id.month",
                  Day: "$_id.day",
                },
                Count: { $sum: 1 },
              },
            },
            {
              $sort: { _id: 1 },
            },
          ],
          function (err, apartments) {
            apartments.forEach(function (object) {
              console.log(object);
              if (object._id.Status === 1) {
                Days = object.Count;
              }
            });

            if (Days < setDays) {
              Relay.findById(req.params.id).then((book) => {
                res.json(book);
              });
            } else {
              var message = JSON.parse(`{"Status": 2}`);
              findOne({ DeviceID: req.params.id }).then((data) => {
                Relay.findByIdAndUpdate(req.params.id, message).then((data) => {
                  Relay.findById(req.params.id).then((book) => {
                    res.json(book);
                  });
                });
              });
            }
          }
        );
      }

      if (Status === 2) {
        setDays = MidVeg;
        log.aggregate(
          [
            {
              $project: {
                year: { $year: "$updated_date" },
                month: { $month: "$updated_date" },
                day: { $dayOfMonth: "$updated_date" },
                _id: "$id",
                Status: "$Status",
                Data: "$Status",
              },
            },
            {
              $group: {
                _id: {
                  Status: "$Status",
                  Year: "$year",
                  Month: "$month",
                  Day: "$day",
                },
                Count: { $sum: 1 },
              },
            },
            {
              $group: {
                _id: {
                  Status: "$_id.Status",
                  Year: "$_id.year",
                  Month: "$_id.month",
                  Day: "$_id.day",
                },
                Count: { $sum: 1 },
              },
            },
            {
              $sort: { _id: 1 },
            },
          ],
          function (err, apartments) {
            apartments.forEach(function (object) {
              console.log(object);
              if (object._id.Status === 2) {
                Days = object.Count;
              }
            });

            if (Days < setDays) {
              Relay.findById(req.params.id).then((book) => {
                res.json(book);
              });
            } else {
              var message = JSON.parse(`{"Status": 3}`);
              findOne({ DeviceID: req.params.id }).then((data) => {
                Relay.findByIdAndUpdate(req.params.id, message).then((data) => {
                  Relay.findById(req.params.id).then((book) => {
                    res.json(book);
                  });
                });
              });
            }
          }
        );
      }

      if (Status === 3) {
        setDays = LateVeg;
        log.aggregate(
          [
            {
              $project: {
                year: { $year: "$updated_date" },
                month: { $month: "$updated_date" },
                day: { $dayOfMonth: "$updated_date" },
                _id: "$id",
                Status: "$Status",
                Data: "$Status",
              },
            },
            {
              $group: {
                _id: {
                  Status: "$Status",
                  Year: "$year",
                  Month: "$month",
                  Day: "$day",
                },
                Count: { $sum: 1 },
              },
            },
            {
              $group: {
                _id: {
                  Status: "$_id.Status",
                  Year: "$_id.year",
                  Month: "$_id.month",
                  Day: "$_id.day",
                },
                Count: { $sum: 1 },
              },
            },
            {
              $sort: { _id: 1 },
            },
          ],
          function (err, apartments) {
            apartments.forEach(function (object) {
              console.log(object);
              if (object._id.Status === 3) {
                Days = object.Count;
              }
            });

            if (Days < setDays) {
              Relay.findById(req.params.id).then((book) => {
                res.json(book);
              });
            } else {
              var message = JSON.parse(`{"Status": 4}`);
              findOne({ DeviceID: req.params.id }).then((data) => {
                Relay.findByIdAndUpdate(req.params.id, message).then((data) => {
                  Relay.findById(req.params.id).then((book) => {
                    res.json(book);
                  });
                });
              });
            }
          }
        );
      }

      if (Status === 4) {
        setDays = Transition;
        log.aggregate(
          [
            {
              $project: {
                year: { $year: "$updated_date" },
                month: { $month: "$updated_date" },
                day: { $dayOfMonth: "$updated_date" },
                _id: "$id",
                Status: "$Status",
                Data: "$Status",
              },
            },
            {
              $group: {
                _id: {
                  Status: "$Status",
                  Year: "$year",
                  Month: "$month",
                  Day: "$day",
                },
                Count: { $sum: 1 },
              },
            },
            {
              $group: {
                _id: {
                  Status: "$_id.Status",
                  Year: "$_id.year",
                  Month: "$_id.month",
                  Day: "$_id.day",
                },
                Count: { $sum: 1 },
              },
            },
            {
              $sort: { _id: 1 },
            },
          ],
          function (err, apartments) {
            apartments.forEach(function (object) {
              console.log(object);
              if (object._id.Status === 4) {
                Days = object.Count;
              }
            });

            if (Days < setDays) {
              Relay.findById(req.params.id).then((book) => {
                res.json(book);
              });
            } else {
              var message = JSON.parse(`{"Status": 5}`);
              findOne({ DeviceID: req.params.id }).then((data) => {
                Relay.findByIdAndUpdate(req.params.id, message).then((data) => {
                  Relay.findById(req.params.id).then((book) => {
                    res.json(book);
                  });
                });
              });
            }
          }
        );
      }

      if (Status === 5) {
        setDays = Flower;
        log.aggregate(
          [
            {
              $project: {
                year: { $year: "$updated_date" },
                month: { $month: "$updated_date" },
                day: { $dayOfMonth: "$updated_date" },
                _id: "$id",
                Status: "$Status",
                Data: "$Status",
              },
            },
            {
              $group: {
                _id: {
                  Status: "$Status",
                  Year: "$year",
                  Month: "$month",
                  Day: "$day",
                },
                Count: { $sum: 1 },
              },
            },
            {
              $group: {
                _id: {
                  Status: "$_id.Status",
                  Year: "$_id.year",
                  Month: "$_id.month",
                  Day: "$_id.day",
                },
                Count: { $sum: 1 },
              },
            },
            {
              $sort: { _id: 1 },
            },
          ],
          function (err, apartments) {
            apartments.forEach(function (object) {
              console.log(object);
              if (object._id.Status === 5) {
                Days = object.Count;
              }
            });

            if (Days < setDays) {
              Relay.findById(req.params.id).then((book) => {
                res.json(book);
              });
            } else {
              var message = JSON.parse(`{"Status": 6}`);
              findOne({ DeviceID: req.params.id }).then((data) => {
                Relay.findByIdAndUpdate(req.params.id, message).then((data) => {
                  Relay.findById(req.params.id).then((book) => {
                    res.json(book);
                  });
                });
              });
            }
          }
        );
      }
      if (Status === 6) {
        setDays = Flower;
        log.aggregate(
          [
            {
              $project: {
                year: { $year: "$updated_date" },
                month: { $month: "$updated_date" },
                day: { $dayOfMonth: "$updated_date" },
                _id: "$id",
                Status: "$Status",
                Data: "$Status",
              },
            },
            {
              $group: {
                _id: {
                  Status: "$Status",
                  Year: "$year",
                  Month: "$month",
                  Day: "$day",
                },
                Count: { $sum: 1 },
              },
            },
            {
              $group: {
                _id: {
                  Status: "$_id.Status",
                  Year: "$_id.year",
                  Month: "$_id.month",
                  Day: "$_id.day",
                },
                Count: { $sum: 1 },
              },
            },
            {
              $sort: { _id: 1 },
            },
          ],
          function (err, apartments) {
            apartments.forEach(function (object) {
              console.log(object);
              if (object._id.Status === 6) {
                Days = object.Count;
              }
            });

            if (Days < setDays) {
              Relay.findById(req.params.id).then((book) => {
                res.json(book);
              });
            } else {
              var message = JSON.parse(`{"Status": 7}`);
              findOne({ DeviceID: req.params.id }).then((data) => {
                Relay.findByIdAndUpdate(req.params.id, message).then((data) => {
                  Relay.findById(req.params.id).then((book) => {
                    res.json(book);
                  });
                });
              });
            }
          }
        );
      }
    });
  });
});
// @route GET api/books
// @description add/save book
// @access Public
router.post("/", (req, res) => {
  Relay.create(req.body)
    .then((book) => res.json(book))
    .catch((err) =>
      res.status(400).json({ error: "Unable to add this relay" })
    );
});

// @route GET api/books/:id
// @description Update book
// @access Public
router.put("/:id", (req, res) => {
  Relay.findByIdAndUpdate(req.params.id, req.body)
    .then((book) => res.json({ msg: "Updated successfully" }))
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
});

// @route GET api/books/:id
// @description Delete book by id
// @access Public
router.delete("/:id", (req, res) => {
  Relay.findByIdAndRemove(req.params.id, req.body)
    .then((book) => res.json({ mgs: "relay entry deleted successfully" }))
    .catch((err) => res.status(404).json({ error: "No such a relay" }));
});

module.exports = router;
