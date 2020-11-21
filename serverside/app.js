const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
//specify where to find the schema
const Review = require('./models/review')
// connect and display the status 
//mongoose.connect('mongodb://localhost:27017/Reviews', { useNewUrlParser: true })
mongoose.connect('mongodb+srv://ddiallo1:getana@cluster0.cqyls.azure.mongodb.net/book-app?retryWrites=true&w=majority', { useNewUrlParser: true })
   .then(() => { console.log("connected"); })
   .catch(() => { console.log("error connecting"); });

// use the following code on any request that matches the specified mount path
app.use((req, res, next) => {
   console.log('This line is always called');
   res.setHeader('Access-Control-Allow-Origin', '*'); //can connect from any host
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS,DELETE'); //allowable methods
   res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
   next();
});
app.get('/reviews', (req, res, next) => {
   //call mongoose method find (MongoDB db.Review.find())
   Review.find()
      //if data is returned, send data as a response 
      .then(data => res.status(200).json(data))
      //if error, send internal server error
      .catch(err => {
         console.log('Error: ${err}');
         res.status(500).json(err);
      });
});


//to use this middleware in other parts of the application
module.exports = app;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// serve incoming post requests to /reviews
app.post('/reviews', (req, res, next) => {
  // create a new review variable and save request’s fields 
  const review = new Review({
   username: req.body.username,
   email: req.body.email,
   rating: req.body.rating,
   comment: req.body.comment
   
 });
 //send the document to the database 
 review.save()
   //in case of success
   .then(() => { console.log('Success');})
   //if error
   .catch(err => {console.log('Error:' + err);});

});

//:id is a dynamic parameter that will be extracted from the URL
app.delete("/reviews/:id", (req, res, next) => {
   Review.deleteOne({ _id: req.params.id }).then(result => {
     console.log(result);
     res.status(200).json("Deleted!");
   });
 });

 // serve incoming put requests to /students
 app.put('/reviews/:id', (req, res, next) => {
   console.log("id: " + req.params.id)
   // check that the parameter id is valid 
   if (mongoose.Types.ObjectId.isValid(req.params.id)) {
     //find a document and set new first and last names
     Review.findOneAndUpdate({_id: req.params.id},
       {$set:{username : req.body.username,
         email : req.body.email, 
         rating : req.body.rating ,
         comment : req.body.comment}},{new:true}) 
      .then((review) => {
         if (review) { //what was updated
           console.log(review);
         } else {
           console.log("no data exist for this id");
         }
      })
     .catch((err) => {
       console.log(err);
      });
  } else {
    console.log("please provide correct id");
  }
   
 });  

 
