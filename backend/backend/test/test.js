var supertest = require("supertest");
var should = require("should");

const queryProducts = require('../controller/connection');
var server = supertest.agent("http://localhost:3001");

describe("Get product details", function () {
  it("should return product details", function (done) {
    // queryProducts().then(r => console.log("ds", r))
    queryProducts().then(r => console.log("ds", r)).catch(err => console.log(err))
  });
});

describe("Get favorite user details", function () {
  it("should return items favorited for a given user", function (done) {
    // calling fav page api with right userid
    server
      .post("/favorite")
      .send({
        "UserID": "12"
      })
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        res.status.should.equal(200);
        res.body.should.deepEqual([
          {
            ProductID: 1,
            Name: 'Bag',
            Description: 'Vintage',
            Price: '100.00',
            ID: 75
          },
          {
            ProductID: 2,
            Name: 'Soap',
            Description: 'Coconut',
            Price: '10.00',
            ID: 76
          },
          {
            ProductID: 3,
            Name: 'Fork',
            Description: 'Silver',
            Price: '500.00',
            ID: 77
          },
          {
            ProductID: 4,
            Name: 'Bag',
            Description: 'Vintage',
            Price: '100.00',
            ID: 78
          }
        ])
        done();
      });
  });

  it("should return items empty array if no favs", function (done) {
    // calling fav page api with right userid
    server
      .post("/favorite")
      .send({
        "UserID": "100"
      })
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        res.status.should.equal(200);
        res.body.should.deepEqual([])
        done();
      });
  });
});

describe("Get store details", function () {
  it("should return store details", function (done) {
    server
      .post("/storeDetails")
      .send({
        "StoreID": "10"
      })
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        res.status.should.equal(200);
        res.body.should.deepEqual({
            StoreID: 10,
            UserID: 19,
            StoreName: 'vank',
            ts: '2022-03-23T11:42:34.000Z',
            Name: 'vank',
            Email: 'vank@gmail.com',
            PhoneNumber: null,
            Password: 'vank',
            City: null,
            BirthdayDate: null,
            BirthdayDay: null,
            About: null,
            Address: 'vank',
            Country: null,
            ProfilePicture: null
          }
        )
        done();
      });
  });
});

describe("Get category", function () {
  it("should return categories (both basic and custom if added)", function (done) {
    server
      .get("/category")
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        res.status.should.equal(200);
        res.body.should.deepEqual([
            {CategoryID: 1, CatName: 'Clothing'},
            {CategoryID: 2, CatName: 'Jewellery'},
            {CategoryID: 3, CatName: 'Entertainment'},
            {CategoryID: 4, CatName: 'Home Decor'},
            {CategoryID: 5, CatName: 'Art'},
            {CategoryID: 6, CatName: 'Other'},
            {CategoryID: 10, CatName: 'dummycolumn'},
            {CategoryID: 12, CatName: 'Entertainment'},
            {CategoryID: 13, CatName: 'fdgdfg'}
          ]
        )
        done();
      });
  });
});

describe("Get store name", function () {
  it("should if storename is available or not", function (done) {
    server
      .post("/getStoreName")
      .send({
        Name: 'randomname'
      })
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        res.status.should.equal(200);
        res.body.should.deepEqual({available: true})
        done();
      });
  });
});
