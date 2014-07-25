#! /usr/bin/env node

'use strict';

 var task = require('./lib/combine-mq'),
     packageJson = require('./package'),
     program = require('commander');

 program.version(packageJson.version);

 program
 .command('combine <fileName>')
 .description('Desciption...')
 .action(function (fileName) {
   task.init(fileName);
});

program.parse(process.argv);
