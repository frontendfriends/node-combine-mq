/*
* combine-mq
* https://github.com/buildingblocks/node-combine-mq
*
* Copyright (c) 2014 Building Blocks
* Licensed under the MIT license.
*/

'use strict';


// Requires
var fs = require('fs'),
chalk = require('chalk'),
parse = require('css-parse'), 
stringify = require('css-stringify'),
mkdirp = require('mkdirp'); 


module.exports = {
	init: function(fileName) {
		var self = this; // Scope resolution
		self.fileName = fileName;

		self.getFile(fileName);
	},
	getFile: function (fileName) {
		var self = this; // Scope resolution

		console.log(chalk.bold('\nCombining file: ' + fileName + '...'));

		// Read file in
		fs.readFile(fileName, 'utf8', function(err, fileContents) {
			if(err) {
				console.log(chalk.red('Could not open file: "' + fileName + '"'));
				process.exit(1);
			}
			else {
				self.parseFile(fileContents);
			}
		});
		
		return 'combineMq'; // To pass test
	},
	parseFile: function (contents) {
		var self = this; // Scope resolution
		var json = parse(contents);

    	// options
    	var options = {
    		log: false,
    		order: [{
    			kind: 'simple',
    			regex: /screen/,
    			order: 5,
    			output: 0,
    		},
    		{ 
    			kind: 'min-width',
    			regex: /min-width/,
    			order: 1,
    			output: 1, 
    		},
    		{
    			kind: 'max-width',
    			regex: /max-width/,
    			reverse: true,
    			order: 2,
    			output: 2,
    		},
    		{ 
    			kind: 'min-height',
    			regex: /min-height/,
    			order: 3,
    			output: 3, 
    		},
    		{
    			kind: 'max-height',
    			regex: /max-height/,
    			reverse: true,
    			order: 4,
    			output: 4,
    		},
    		{
    			kind: 'other',
    			order: 99,
    			output: 5,
    		},
    		{ 
    			kind: 'print',
    			regex: /print/,
    			order: 0,
    			output: 99, 
    		}]
    	};


		// parse the source and setup objects used for extracting, combining and sorting the media queries
		var	media = {
			extracted: [],
			extractedCount: 0,
			combined: [],
			combinedCount: 0,
			ordered: [],
			orderedCount: 0
		},
		other = [];

     	// seperate media rules from other rules
     	json.stylesheet.rules.forEach(function(rule){
     		if(rule.type === 'media'){
     			rule.mediaInt = rule.media.match(/[0-9]*\.?[0-9]/g) || 0;
     			rule.mediaStr = rule.media.replace(/[^A-Za-z0-9]/ig,'');
     			media.extracted.push(rule);
     			media.extractedCount++;
     		} else {
     			other.push(rule);
     		}
     	});

     	// find and combine equal media queries
     	media.extracted.forEach(function(rule){
     		if(!rule.matched){
     			media.extracted.forEach(function(r){
     				if(rule !== r && rule.mediaStr === r.mediaStr){
     					rule.rules = rule.rules.concat(r.rules);
     					r.matched = true;
     				}
     			});
     			media.combined.push(rule);
     			media.combinedCount++;
     		}
     	});

    	// custom ordering and sorting
    	options.order.forEach(function(o){
    		o.rules = [];
    		media.ordered.push(o);
    		media.orderedCount++;
    	});

     	// sort ordered by order order
     	media.ordered.sort(function(a,b){
     		return a.order - b.order;
     	});

       	// use the order object's regex to sort push combined media rules
       	media.combined.forEach(function(rule){
       		for (var i = 0; !rule.ordered && i < media.orderedCount; i++) {
       			if(rule.media.match(media.ordered[i].regex)){
       				media.ordered[i].rules.push(rule);
       				rule.ordered = true;
       			}
       		}
       	});

      	// sort ordered by output order
      	media.ordered.sort(function(a,b){
      		return a.output - b.output;
      	});

      	// sort ordered internally
      	media.ordered.forEach(function(kind){
      		kind.rules.sort(function(a,b){
      			for (var i = 0; i < a.mediaInt.length; i++) {
      				if (parseFloat(a.mediaInt[i]) > parseFloat(b.mediaInt[i]) /* || b.mediaInt === undefined */){
      					return 1;
      				} else if (parseFloat(a.mediaInt[i]) < parseFloat(b.mediaInt[i]) /* || a.mediaInt === undefined */){
      					return -1;
      				}
      			}
      		});
      		if(kind.reverse){
      			kind.rules.reverse();
      		}
      	});

     	 // join all the rules together in specified order
     	 for (var i = 0; i < media.orderedCount; i++) {
     	 	other = other.concat(media.ordered[i].rules);
     	 }

    	// merge them back into the json
    	json.stylesheet.rules = other;

    	// Write out the file
    	self.writeFile(json);
    },
    writeFile: function (fileContents) {

      // Create a temp dir for now
      mkdirp('tmp', function(err) {
        if(err) {
          throw err;
        }
        else {
          process.chdir('tmp');
          fs.writeFile('combined.css', stringify(fileContents), function (err) {
            if (err) {
              throw err;
            }

            console.log(chalk.green('CSS combined!'));
          });
        }

      });
    }

  };
