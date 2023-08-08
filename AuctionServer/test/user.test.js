const User = require("../models/User");
const chai = require("chai");
const expect = chai.expect;
var should = require("chai").should();
const chaiHttp = require("chai-http");
const server = require("../server");
const assert = require("assert");

chai.use(chaiHttp);

describe("/Testing User API", () => {
  /*************** GET all users test **************/
  it("test user API", (done) => {
    chai
      .request(server)
      .get("/user")
      .end((err, res) => {
        res.should.have.status(200);

        done();
      });
  });

  /*********** Testing POSTing user **************/
  it("should POST a valid user", (done) => {
    let user = {
      name: "Bob",
      password: "12345",
      email: "d@test.com",
      isMember: true,
    };

    chai
      .request(server)
      .post("/user")
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("POST should return invalid due to missing data field", (done) => {
    let user = {
      name: "Bob",
      password: "12345",
      isMember: true,
    };

    chai
      .request(server)
      .post("/user")
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        const message = res.body.message;
        expect(message).to.be.equal("Missing data fields");
        done();
      });
  });

  it("should verify that there are 1 users in the DB", (done) => {
    chai
      .request(server)
      .get("/user")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(3);
        done();
      });
  });
});
/************ Testing deleting a user ************/
describe("Adding a User", () => {
  let user;
  beforeEach(() => {
    // user is an instance of User Model
    user = new User({ name: "Joe" });
    user.save();
  });

  it("Removes a user", (done) => {
    User.findOneAndRemove({ name: "Joe" })
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it("Removes a user using its id", (done) => {
    User.findByIdAndRemove(user._id)
      .then(() => User.findOne({ name: "Joe" }))
      .then((user) => {
        assert(user === null);
        done();
      });
  });
});
/**********  Test patching existing user data* ***************/
describe("adding a user", () => {
  let user;
  beforeEach((done) => {
    user = new User({ name: "Joe" });
    user.save().then(() => done());
  });

  // Handling Redundant Code
  function helperFunc(assertion, done) {
    assertion
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === "Updated Joe");
        done();
      });
  }

  it("Sets and saves a user using an instance", (done) => {
    // Not yet updated in MongoDb
    user.set("name", "Updated Joe");
    helperFunc(user.save(), done);
  });

  it("Update a user using instance", (done) => {
    helperFunc(user.update({ name: "Updated Joe" }), done);
  });
});
