/**
*
* @file Combine MQ Test
* @version 0.1.0
* @author {@link http://github.com/furzeface Daniel Furze}
* @link https://github.com/buildingblocks/node-combine-mq
*
* Copyright (c) 2014 Building Blocks
* Licensed under the MIT license.
*
*/

 'use strict';

 var grunt = require('grunt');

 exports.combine_mq = {
  setUp: function (done) {
    done();
  },
  test: function (test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/combined.css');
    var expected = grunt.file.read('test/expected/test.css');
    test.equal(actual, expected, 'should combine media queries from test.css');

    test.done();
  }
};
