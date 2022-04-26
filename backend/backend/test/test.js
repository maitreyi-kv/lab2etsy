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
        res.body.should.deepEqual({ message: 'Email already registered' })
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
        res.body.message.should.equal("Logged In Successfully")
        res.body.should.have.property('token');
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
      .get("/products/category")
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6InVzZXI0IiwiVXNlcklEIjoiNjI2Nzc2NDczMzcyMDg1NWJlNzIwMGI5IiwiaWF0IjoxNjUwOTQ4NDgxLCJleHAiOjE2NTEwMzQ4ODF9.YMVkTcc13xFuplSBeTwLuTWtzD6Dfg2GPdySt4HVR_E')
      .expect("Content-type", /json/)
      .expect(200) // THis is HTTP response
      .end(function (err, res) {
        console.log("Res", res.body)
        res.body.should.deepEqual(['Clothing',
          'Jewellery',
          'Entertainment',
          'Home Decor',
          'Art',
          'Other'])
        done();
      });
  });
});
