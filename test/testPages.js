var expect = require("chai").expect;
var request = require("request");

it("main page status", function (done) {
  request("http://localhost:3000/", (error, response, body) => {
    expect(response.statusCode).to.equal(200);
    done();
  });
});
