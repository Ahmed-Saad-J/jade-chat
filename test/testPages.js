const chai = require("chai");
const expect = require("chai").expect;
const app = require("../app");
const chaiHttp = require("chai-http");

//const { response } = require("express");
chai.use(chaiHttp);

describe("basic pages", () => {
  it("main page status", function (done) {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
  });
});

describe("auth pages", () => {
  let correctUser = {
    email: "test@mail.com",
    password: "test",
  };
});

//     chai
//       .request(app)
//       .post("/login")
//       .send(correctUser)
//       .redirects(0)
//       .end((err, res) => {
//         expect(res).to.redirect;
//         expect(res).to.redirectTo("/chat");
//         //expect(res.headers).to.have.property("location");
//         //expect(res.headers.location).to.include("/chat");
//         done();
//       });
//   });
// });
