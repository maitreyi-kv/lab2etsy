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
});

describe("Auth", function () {
  it("should register new user", function (done) {
    server
      .post("/auth/register")
      .send({
        "Email": "abssc@gmail.com",
        "Password": "pass"
      })
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        res.status.should.equal(200);
        res.body.should.deepEqual({message: "Created User"})
        done();
      });
  });

  it("should not register an already present user", function (done) {
    server
      .post("/auth/register")
      .send({
        "Email": "abssc@gmail.com",
        "Password": "pass"
      })
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        res.status.should.equal(200);
        res.body.should.deepEqual({message: "Created User"})
        done();
      });
  });

  it("should login user with right creds", function (done) {
    server
      .post("/auth/login")
      .send({
        "Email": "abssc@gmail.com",
        "Password": "pass"
      })
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        res.status.should.equal(200);
        res.body.should.deepEqual({
          "message": "LoggedIn"
        })
        done();
      });
  });

  it("should not login user with wrong creds", function (done) {
    server
      .post("/auth/login")
      .send({
        "Email": "abssc@gmail.com",
        "Password": "password"
      })
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        res.status.should.equal(200);
        res.body.should.deepEqual( { message: 'Invalid Creds' })
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
