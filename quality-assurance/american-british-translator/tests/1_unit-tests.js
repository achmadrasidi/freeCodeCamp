const chai = require("chai");
const assert = chai.assert;
const Translator = require("../components/translator.js");
let translator = new Translator();

let text;
suite("Unit Tests", () => {
  suite("Function translateAmerican(text)", () => {
    test("Mangoes are my favorite fruit.", (done) => {
      text = "Mangoes are my favorite fruit.";
      assert.equal(translator.translateAmerican(text), "Mangoes are my favourite fruit.");
      done();
    });
    test("I ate yogurt for breakfast.", (done) => {
      text = "I ate yogurt for breakfast.";
      assert.equal(translator.translateAmerican(text), "I ate yoghurt for breakfast.");
      done();
    });
    test("We had a party at my friend's condo.", (done) => {
      text = "We had a party at my friend's condo.";
      assert.equal(translator.translateAmerican(text), `We had a party at my friend's flat.`);
      done();
    });
    test("Can you toss this in the trashcan for me?", (done) => {
      text = "Can you toss this in the trashcan for me?";
      assert.equal(translator.translateAmerican(text), `Can you toss this in the bin for me?`);
      done();
    });
    test("The parking lot was full.", (done) => {
      text = "The parking lot was full.";
      assert.equal(translator.translateAmerican(text), `The car park was full.`);
      done();
    });
    test("Like a high tech Rube Goldberg machine.", (done) => {
      text = "Like a high tech Rube Goldberg machine.";
      assert.equal(translator.translateAmerican(text), `Like a high tech Heath Robinson device.`);
      done();
    });
    test("To play hooky means to skip class or work.", (done) => {
      text = "To play hooky means to skip class or work.";
      assert.equal(translator.translateAmerican(text), `To bunk off means to skip class or work.`);
      done();
    });
    test("No Mr. Bond, I expect you to die.", (done) => {
      text = "No Mr. Bond, I expect you to die.";
      assert.equal(translator.translateAmerican(text), `No Mr Bond, I expect you to die.`);
      done();
    });
    test("Dr. Grosh will see you now.", (done) => {
      text = "Dr. Grosh will see you now.";
      assert.equal(translator.translateAmerican(text), `Dr Grosh will see you now.`);
      done();
    });
    test("Lunch is at 12:15 today.", (done) => {
      text = "Lunch is at 12:15 today.";
      assert.equal(translator.translateAmerican(text), `Lunch is at 12.15 today.`);
      done();
    });
  });
  suite("Function translateBritish(text)", () => {
    test("We watched the footie match for a while.", (done) => {
      text = "We watched the footie match for a while.";
      assert.equal(translator.translateBritish(text), "We watched the soccer match for a while.");
      done();
    });
    test("Paracetamol takes up to an hour to work.", (done) => {
      text = "Paracetamol takes up to an hour to work.";
      assert.equal(translator.translateBritish(text), "Tylenol takes up to an hour to work.");
      done();
    });
    test("First, caramelise the onions", (done) => {
      text = "First, caramelise the onions";
      assert.equal(translator.translateBritish(text), `First, caramelize the onions`);
      done();
    });
    test("I spent the bank holiday at the funfair.", (done) => {
      text = "I spent the bank holiday at the funfair.";
      assert.equal(translator.translateBritish(text), `I spent the public holiday at the carnival.`);
      done();
    });
    test("I had a bicky then went to the chippy.", (done) => {
      text = "I had a bicky then went to the chippy.";
      assert.equal(translator.translateBritish(text), `I had a cookie then went to the fish-and-chip shop.`);
      done();
    });
    test("I've just got bits and bobs in my bum bag.", (done) => {
      text = "I've just got bits and bobs in my bum bag.";
      assert.equal(translator.translateBritish(text), `I've just got odds and ends in my fanny pack.`);
      done();
    });
    test("The car boot sale at Boxted Airfield was called off.", (done) => {
      text = "The car boot sale at Boxted Airfield was called off.";
      assert.equal(translator.translateBritish(text), `The swap meet at Boxted Airfield was called off.`);
      done();
    });
    test("Have you met Mrs Kalyani?", (done) => {
      text = "Have you met Mrs Kalyani?";
      assert.equal(translator.translateBritish(text), `Have you met Mrs. Kalyani?`);
      done();
    });
    test("Prof Joyner of King's College, London.", (done) => {
      text = "Prof Joyner of King's College, London.";
      assert.equal(translator.translateBritish(text), `Prof. Joyner of King's College, London.`);
      done();
    });
    test("Tea time is usually around 4 or 4.30.", (done) => {
      text = "Tea time is usually around 4 or 4.30.";
      assert.equal(translator.translateBritish(text), `Tea time is usually around 4 or 4:30.`);
      done();
    });
  });
  suite("Function translateAmericanHl(text)", () => {
    test("Mangoes are my favorite fruit.", (done) => {
      text = "Mangoes are my favorite fruit.";
      assert.equal(translator.translateAmericanHl(text), `Mangoes are my <span class="highlight">favourite</span> fruit.`);
      done();
    });
    test("I ate yogurt for breakfast.", (done) => {
      text = "I ate yogurt for breakfast.";
      assert.equal(translator.translateAmericanHl(text), 'I ate <span class="highlight">yoghurt</span> for breakfast.');
      done();
    });
  });
  suite("Function translateBritishHl(text)", () => {
    test("We watched the footie match for a while.", (done) => {
      text = "We watched the footie match for a while.";
      assert.equal(translator.translateBritishHl(text), `We watched the <span class="highlight">soccer</span> match for a while.`);
      done();
    });
    test("Paracetamol takes up to an hour to work.", (done) => {
      text = "Paracetamol takes up to an hour to work.";
      assert.equal(translator.translateBritishHl(text), '<span class="highlight">Tylenol</span> takes up to an hour to work.');
      done();
    });
  });
});
