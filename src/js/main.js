'use strict';

// preserve jQuery for node context
global.$ = $;

// node modules
var shell = require('shell').shell;

// boot the app 
$(document).ready(function() {

	// cache DOM elements
	var $form     = $('form');
	var $srcField = $('#src');
	var $notify   = $('.notifications');

	// handle form submit
	$form.on('submit', function(e) {

		var fields = {};

		// prepare fields for Gruntfile
		$.each($form.serializeArray(), function(index, pair) {
			fields[pair.name] = pair.value;
		});

		// add src field value, because jQuery ignores the input[type="file"]
		fields.src = $srcField.val();

		if (!fields.src) {
			notify($notify, 'danger', 'Please choose a source folder.');
			return false;
		}

		fields.src  = fields.src.split('\\');
		fields.dist = fields.src.slice(0, fields.src.length - 1);

		fields.src  = fields.src.join('\\\\') + '\\\\*';
		fields.dist = fields.dist.join('\\\\') + '\\\\dist';	

		// prepare & run grunt task
		shell.prepareGruntfile(fields);
		shell.runTask(function(error, stdout, stderr) {
			if (error !== null) {
				notify($notify, 'danger', 'Error - ' + error);
			} else {
				notify($notify, 'success', 'Sprite generated in ' + fields.dist.split('\\\\').join('\\') + ' ');
			}
		});

		e.preventDefault();
	});

});

function notify($el, type, message) {

	$el.notify({
		type: type,
		message: {
			text: message
		},
		fadeOut: {
			enabled: true,
			delay: 3000
		}
	}).show();

}