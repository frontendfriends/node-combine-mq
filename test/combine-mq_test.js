'use strict';

var task = require('../lib/combine-mq');

/*
======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
  test.expect(numAssertions)
  test.done()
  Test assertions:
  test.ok(value, [message])
  test.equal(actual, expected, [message])
  test.notEqual(actual, expected, [message])
  test.deepEqual(actual, expected, [message])
  test.notDeepEqual(actual, expected, [message])
  test.strictEqual(actual, expected, [message])
  test.notStrictEqual(actual, expected, [message])
  test.throws(block, [error], [message])
  test.doesNotThrow(block, [error], [message])
  test.ifError(value)
*/
 
exports.combineMq = {
    setUp: function(done) {
      // setup here
      done();
    },
    'combineMq': function(test) {
      test.equal(task.init('test/examples/test.css'), 'combineMq', 'should say combineMq.');
      test.done();
  }
};
