const mongooseConnection = require('./connection')
//Create a SomeModel model just by requiring the module
var SomeModel = require('./models/product')



// Use the SomeModel object (model) to find all SomeModel records
SomeModel.find({}, (err, people) =>{
    if (err) console.log("sadfdsf")

    // send the list of all people in database with name of "John James" and age of 36
    // Very possible this will be an array with just one Person object in it.
    console.log("Response", people)
});

// var book1 = new SomeModel({
//     Name: String,
//     Price: Number,
//     number: Number
//   });

// book1.save(function (err, book) {
// if (err) return console.error(err);
// console.log(book.name + " saved to bookstore collection.");
// });
