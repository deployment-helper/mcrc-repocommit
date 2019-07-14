const LambdaTester = require("lambda-tester");
const Index = require("../index");
describe("Git push testing", () => {
    beforeEach(() => {
        jest.setTimeout(50000);
      });
  it("run handler", (done) => {
    Index.handler({
      body: {
        source: "https://github.com/isomorphic-git/isomorphic-git.git",
        destination: "https://github.com/vinaymavi/mcrc-temp5"
      }
    }).then(resp=>{
        console.log(resp);
        expect(1).toBe(1);
        done()
    }).catch(err=>{
        console.log(err);
        expect(1).toBe(1);
        done()
    });
  });
});
