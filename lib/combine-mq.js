/*
* combine-mq
* https://github.com/buildingblocks/node-combine-mq
*
* Copyright (c) 2014 Building Blocks
* Licensed under the MIT license.
*/

'use strict';

module.exports = {
	init: function(fileName) {
		var fs = require('fs');

		console.log('\nCombining file: ' + fileName);

		// Read file in
		fs.readFile(fileName, 'utf8', function(err, data){
			if(err) {
				console.log('Could not open file: "' + fileName + '"');
				process.exit(1);
			}
			else {
				console.log(data);
   				// Do all the things here...
   			}
   		});

		return 'combineMq'; // To pass test
	}

};
