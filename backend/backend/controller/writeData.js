//Create a ProductModel model just by requiring the module
const ProductModel = require('../../kafka-backend/mongodb/models/Product');


const queryProducts = async () => {
    const post = new ProductModel({
        Name: "name",
        Price: "243",
        number: 34
    })
    return post.save();
}


const findProducts = async () => {
    const pro = await queryProducts();
    console.log(pro)
}

findProducts().then(r => console.log("res", r));

// book1.save(function (err, book) {
// if (err) return console.error(err);
// console.log(book.name + " saved to bookstore collection.");
// });
