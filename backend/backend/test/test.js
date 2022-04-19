var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3001");

describe("Get products", function () {
  it("return all products", function (done) {
    // calling fav page api with right userid
    server
      .get("/products")
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        res.status.should.equal(200);
        res.body.should.not.equal(null);
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
