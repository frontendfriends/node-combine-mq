#! /usr/bin/env node

'use strict';

var task = require('./lib/combine-mq');

// These options will come from the Grunt task

// task.init({
// 	'inputFileName': 'test/examples/test.css',
// 	'outputFilePath': 'dev/',
// 	'outputFileName': 'combined.css'
// });


// Use the CLi whilst building the Node task
var program = require('commander');

program
.command('combine <inputFileName> <outputFilePath> <outputFileName>')
.action(function (inputFileName, outputFilePath, outputFileName) {
	task.init({
		'inputFileName': inputFileName,
		'outputFilePath': outputFilePath,
		'outputFileName': outputFileName
	});
});

program.parse(process.argv);
