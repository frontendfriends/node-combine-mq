#! /usr/bin/env node

'use strict';

var task = require('./lib/combine-mq'),
packageJson = require('./package'),
program = require('commander');

program.version(packageJson.version);

program
.command('combine <fileName> <filePath>')
.description('Description...')
.action(function (fileName, filePath) {
	task.init({
		'fileName': fileName,
		'filePath': filePath
	});
});

program.parse(process.argv);
