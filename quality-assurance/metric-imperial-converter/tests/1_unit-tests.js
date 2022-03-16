const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", () => {
  suite("Function convertHandler.getNum(input)", function () {
    test("Whole input number", (done) => {
      let input = "32L";
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test("Decimal Input", (done) => {
      let input = "32.2L";
      assert.equal(convertHandler.getNum(input), 32.2);
      done();
    });

    test("Fractional Input", (done) => {
      let input = "1/3L";
      assert.equal(convertHandler.getNum(input), 1 / 3);
      done();
    });

    test("Fractional Input w/ Decimal", (done) => {
      let input = "1.2/3L";
      assert.equal(convertHandler.getNum(input), 1.2 / 3);
      done();
    });

    test("Invalid Input (double fraction)", (done) => {
      let input = "1/2/3L";
      assert.equal(convertHandler.getNum(input), undefined);
      done(null);
    });

    test("No Numerical Input", (done) => {
      let input = "L";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });

  suite("Function convertHandler.getUnit(input)", () => {
    test("For Each Valid Unit Inputs", (done) => {
      let input = ["km", "gal", "lbs", "mi", "l", "kg", "KM", "GAL", "LBS", "MI", "L", "KG"];
      let output = ["km", "gal", "lbs", "mi", "L", "kg", "km", "gal", "lbs", "mi", "L", "kg"];
      input.forEach((val, i) => {
        assert.equal(convertHandler.getUnit(val), output[i]);
      });
      done();
    });

    test("Unknown Unit Input", (done) => {
      assert.equal(convertHandler.getUnit("34kilograms", undefined));
      done(null);
    });
  });

  suite("Function convertHandler.getReturnUnit(initUnit)", () => {
    test("For Each Valid Unit Inputs", (done) => {
      let input = ["km", "gal", "lbs", "mi", "l", "kg"];
      let output = ["mi", "L", "kg", "km", "gal", "lbs"];
      input.forEach((val, i) => {
        assert.equal(convertHandler.getReturnUnit(val), output[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.spellOutUnit(unit)", () => {
    test("For Each Valid Unit Inputs", (done) => {
      let input = ["km", "gal", "lbs", "mi", "l", "kg"];
      let output = ["kilometers", "gallons", "pounds", "miles", "liters", "kilograms"];

      input.forEach((val, i) => {
        assert.equal(convertHandler.spellOutUnit(val), output[i]);
      });
      done();
    });
  });

  suite("Function convertHandler.convert(num,unit)", () => {
    test("gal to L", (done) => {
      let input = [5, "gal"];
      let output = 18.92705;
      assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
      done();
    });

    test("L to gal", (done) => {
      let input = [5, "l"];
      let output = 1.32086;
      assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
      done();
    });

    test("mi to km", (done) => {
      let input = [5, "mi"];
      let output = 8.0467;
      assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
      done();
    });

    test("km to mi", (done) => {
      let input = [5, "km"];
      let output = 3.10686;
      assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
      done();
    });

    test("lbs to kg", (done) => {
      let input = [5, "lbs"];
      let output = 2.26796;
      assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
      done();
    });

    test("kg to lbs", (done) => {
      let input = [5, "kg"];
      let output = 11.02312;
      assert.approximately(convertHandler.convert(input[0], input[1]), output, 0.1);
      done();
    });
  });
});
