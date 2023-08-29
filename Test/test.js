let express = require("express");
let app = express();
var expect  = require("chai").expect;
var request = require("request");


describe('Get All Cats API', () => {
    it('should get all cats', (done) => {
        request.get('http://localhost:3000/api/cats', (error, response, body) => {
            const res = JSON.parse(body);
            expect(response.statusCode).to.equal(200);
            expect(res.message).to.equal('get all cats successful');
            done();
        });
    });
});
describe('Create Cats API', () => {
    it('should create a new cat', (done) => {
        const newCat = { 
            title: 'TestCaseOne', 
            subTitle: "Testt",
            path: "Images/kitten.jpg",
            description: "For Testing"
        };
        
        request.post('http://localhost:3000/api/cat', { json: newCat }, (error, response, body) => {

            const res = body;
            expect(res.statusCode).to.equal(201);
            expect(res.message).to.equal('success');
            expect(res.data).to.be.an('object');
            done();
        });
    });        
})

describe('Delete Cats API', () => {
    it('delete a cat from database', (done) => {
        const catToDelete = { 
            title: 'TestCaseOne', 
            subTitle: "Testt",
            path: "Images/kitten.jpg",
            description: "For Testing"
        };            
        request.delete('http://localhost:3000/api/cat', { json: catToDelete }, (error, response, body) => {
            expect(body.statusCode).to.equal(200);
            expect(body.message).to.equal('Cat Deleted Succesfully');
            done();
        });
    });      
});

describe('Not Found Api', () => {
    it('should handle non-existent route', (done) => {
        request.get('http://localhost:3000//api/kitty', (error, response, body) => {
            expect(response.statusCode).to.equal(404); // Not Found
            done();
        });
    });  
});

describe("Additon of two number", function() {
    var url = "http://localhost:3000/addTwoNumbers/3/5";

    // test case for post  
    it("returns status 200 to check if api works", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
          });
    });

    //test case for get 
    it("returns statusCode key in body to check if api give right result should be 200", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.statusCode).to.equal(200);
            done();
          });
    });

    //test case for get 
    it("returns the result as number", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.result).to.be.a('number');
            done();
          });
    });
  });
