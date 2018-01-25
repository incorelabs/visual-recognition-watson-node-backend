/*jslint nodejs: true*/

'use strict';

var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var fs = require('fs');

var visual_recognition = new VisualRecognitionV3({
	api_key: process.env.WATSON_API_KEY,
	version_date: VisualRecognitionV3.VERSION_DATE_2016_05_20
});

var params = {
	// An image file (.jpg, .png) or .zip file with images
	// images_file: fs.createReadStream('./resources/snake.jpg'),
	images_file: null,
	classifier_ids: ["CombinedClassifier_1210995163", "default"]
};

var express = require('express'),
	formidable = require('express-formidable'),
    cors = require('cors'),
    port = process.env.PORT || 3000,
    app = express();

/* -------------------------------------------------------------------------- */

app.use(cors());
app.use(formidable());

app.post('/simple-cors', (req, res) => {
	console.log(req.fields);
	console.log(req.files);

	params.images_file = fs.createReadStream(req.files.images_file.path);

	visual_recognition.classify(params, function(err, success) {
		if (err) {
			res.json(err);
		} else {
			res.json(success);
		}
	});
});

if(!module.parent){
	app.listen(port, function(){
		console.log('Express server listening on port ' + port + '.');
	});
}