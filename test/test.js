let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../src/index");
let should = chai.should();

chai.use(chaiHttp);

describe("Location Service API", () => {
  /*
   * Test the GET route
   */
  describe("GET /maps/geocode", () => {
    it("It should get the address", (done) => {
      chai
        .request(server)
        .get(
          "/maps/geocode?latitude=1.340881&longitude=103.958046&service=here"
        )
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("result");
          res.body.result.should.have.property("address");
          done();
        });
    });

    it("It should give an error", (done) => {
      chai
        .request(server)
        .get("/maps/geocode?latitude=1.340881&longitude=103.958046&serice=here")
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
