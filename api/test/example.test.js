'use strict';

// load Unit.js module
const test = require('unit.js');
const {assert} = test;


function add(a, b) {
  return a + b;
}

describe('Ma demo', function() {
  it('example devrait être une string', function() {
    // just for example of tested value
    let example = 'hello';
    // assert that example variable is a string
    test.string(example);
  });

  it('example est égale à "hello"', function() {
    // just for example of tested value
    let example = 'hello';
    // assert that example variable is a string
    test.string(example).is('hello');
    example.should.be.equal('hello');
  });

  it('ajoute 2', function() {
    add(40, 2).should.be.equal(42);
    assert(add(40, 2) === 42);
  });

  it('should convert string to number', function() {
    // add('40', '2').should.be.not.equal(402);
    // add('40', '2').should.be.not.equal('402');
  });
});

/// TODO : Tester une fonction de sourtraction 

/// TODO : Tester une fonction de division (attention à la division par 0)

/// TODO : Tester une fonction de multiplication 
