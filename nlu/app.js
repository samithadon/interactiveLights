// Notes from Samantha Chan
// In Terminal:
// npm init
// npm install watson-developer-cloud --save

// To run the app, type in Terminal: 
// node app.js

// To get all of watson developer cloud functions:
// var watson = require('watson-developer-cloud');

// To check if it works:
// console.log(watson);


var fs = require('fs');
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

// Enter in 'username' and 'password' from Service Credentials from Bluemix
// This one uses the service that I added on Bluemix
var nlu = new NaturalLanguageUnderstandingV1({
  username: '7c8f8b9a-1c24-4f57-91b5-7bb41337e35d',
  password: 'wy4c1bDCHN3P',
  version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2017_02_27
});


// Over here is parameters object which contains the text to analyse and the features I require
// Entities feature is able to identify hastags, twitterhandles and count the number of time the word/phrase appears
// Emotion feature shows the OVERALL document emotion
// Keywords feature identifies keywords/phrases and can show sentiment and emotion regarding the word/phrase
// More info at https://www.ibm.com/watson/developercloud/natural-language-understanding/api/v1/
var parameters = {
	'text': 'Amazing time at @sutdsg in #Singapore where I got to see an great lab to test #cyberattacks on #water treatment and distribution systems',
	'features':{
		'entities': {},
		'emotion':{},
		'keywords':{
			'sentiment': true,
			'emotion': true
		}
	}
};

nlu.analyze(parameters, function(err, response) {
     if (err)
       console.log('error:', err);
     else
       console.log(JSON.stringify(response, null, 2));
 });


// nlu.analyze({
//   'text': file_data, // Buffer or String
//   'features': {
//     'concepts': {},
//     'keywords': {},
//   }
// }, function(err, response) {
//      if (err)
//        console.log('error:', err);
//      else
//        console.log(JSON.stringify(response, null, 2));
//  });




