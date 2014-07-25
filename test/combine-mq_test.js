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
      done();
    },
    'getFile': function(test) {
      test.equal(task.getFile('test/examples/test.css'), 'combineMq', 'should return a valid file.');
      test.done();
  }
};
