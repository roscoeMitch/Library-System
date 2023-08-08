const Ticket = require("../models/Ticket");
const chai = require("chai");
const expect = chai.expect;
var should = require("chai").should();
const chaiHttp = require("chai-http");
const server = require("../server");
const assert = require("assert");

chai.use(chaiHttp);

describe("/Testing Ticket API", () => {
  /*************** GET all users test **************/
  it("test GET request for ticket API", (done) => {
    chai
      .request(server)
      .get("/tickets")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  /*********** Testing POSTing user **************/
  it("should POST a valid ticket", (done) => {
    let ticket = {
      fixture: "Hillhead",
      tier: "Upper",
      section: "G8",
      seat: "44",
    };

    chai
      .request(server)
      .post("/tickets")
      .send(ticket)
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });

  it("should POST a invalid ticket due to missing data field", (done) => {
    let ticket = {
      tier: "Upper",
      section: "G8",
      seat: "44",
    };

    chai
      .request(server)
      .post("/ticket")
      .send(ticket)
      .end((err, res) => {
        res.should.have.status(400);
        const message = res.body.message;
        expect(message).to.be.equal("All fields required");
        done();
      });
  });

  it("should verify that there are 1 users in the DB", (done) => {
    chai
      .request(server)
      .get("/tickets")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(1);
        done();
      });
  });
});
/************ Testing deleting a user ************/
describe("Deleting a Ticket", () => {
  let ticket;
  beforeEach(() => {
    // user is an instance of User Model
    ticket = new Ticket({ fixture: "Spartans" });
    ticket.save();
  });

  it("Removes a ticket", (done) => {
    Ticket.findOneAndRemove({ fixture: "Spartans" })
      .then(() => Ticket.findOne({ fixture: "Spartans" }))
      .then((ticket) => {
        assert(ticket === null);
        done();
      });
  });

  it("Removes a ticket using its id", (done) => {
    Ticket.findByIdAndRemove(ticket._id)
      .then(() => User.findOne({ fixture: "Spartans" }))
      .then((ticket) => {
        assert(ticket === null);
      });
    done();
  });
});
/**********  Test patching existing ticket data* ***************/
describe("Deleting a ticket", () => {
  let ticket;
  beforeEach((done) => {
    ticket = new Ticket({ fixture: "Spartans" });
    ticket.save().then(() => done());
  });

  // Handling Redundant Code
  function helperFunc(assertion, done) {
    assertion
      .then(() => Ticket.find({}))
      .then((tickets) => {
        assert(tickets.length === 1);
        assert(tickets[0].fixture === "Denniston");
        done();
      });
  }

  it("Sets and saves a ticket using an instance", (done) => {
    // Not yet updated in MongoDb
    ticket.set("fixture", "Denniston");
    helperFunc(ticket.save(), done());
  });

  it("Update a ticket using instance", (done) => {
    helperFunc(ticket.update({ fixture: "Denniston" }), done());
  });
});
