// Imports
var express = require('express');
var fs = require('fs')
var reqParser = require('body-parser')

//Global variables and initiations
var app = express();
var data;
// parse application/x-www-form-urlencoded [Extended: used when we have to work with nested objects]
app.use(reqParser.urlencoded({ extended: false })) 
// parse application/json
app.use(reqParser.json())

var server = app.listen(3000, function(){
	console.log('server has started...');
	refreshData();
});

app.get('/readalldevices',readall);
app.post('/addnewdevice',addnewdevice);
app.post('/updatedevice',update);
app.post('/deletedevice',deletedevice)

function readall(request,response){
	refreshData();
	response.send(data);
}

function addnewdevice(request,response){
	var dataReceived = request.body;
	var deviceName = dataReceived.deviceName;
	var magnification = Number(dataReceived.magnification);
	var fieldOfView = Number(dataReceived.fieldOfView);
	var range = Number(dataReceived.range);

	if (deviceName == null || Number.isNaN(magnification) || Number.isNaN(fieldOfView) || Number.isNaN(range)) {
		reply = {
					status: 500,
					msg: "Wrong arguments."
				}
		response.send(reply);
	}
	else{
		var newData = [deviceName,magnification,fieldOfView,range]

		var entries = data["data"];

		var	matchCase = 0;

		for (var i = 0; i < entries.length; i++) {
			var currentEntry = entries[i];
			if (currentEntry[0] == newData[0]) {
				matchCase = 1;
				break;
			}
		}

		if (matchCase == 0) {
			data["data"].push(newData);
			fs.writeFile('data.json',JSON.stringify(data),finished);
			function finished(err){
				reply = {
					status: 200,
					msg: " New data inserted."
				}
				response.send(reply);
			}
		}
		else{
			reply = {
				status: 200,
				msg: "New Data not inserted. Data already exists. Try update method to make changes to data entry."
			}
			response.send(reply);
		}
	}
}

function update(request, response){
	var dataReceived = request.body;
	var deviceNameOld = dataReceived.deviceNameOld;
	var deviceNameNew = dataReceived.deviceNameNew;
	var magnificationNew = Number(dataReceived.magnificationNew);
	var fieldOfViewNew = Number(dataReceived.fieldOfViewNew);
	var rangeNew = Number(dataReceived.rangeNew);
	var entries = data["data"];
	var matchCase = -1;

	for (var i = 0; i < entries.length; i++) {
		var currentEntry = entries[i];
		if (currentEntry[0] == deviceNameOld) {
			matchCase = i;
			break;
		}
	}

	if (matchCase == -1) {
		var reply = {
			status: 200,
			msg: "No such entry."
		}
		response.send(reply);
	}
	else{
		if (deviceNameNew != null) {
			data["data"][matchCase][0] = deviceNameNew;
		}
		if (!Number.isNaN(magnificationNew)) {
			data["data"][matchCase][1] = magnificationNew;
		}
		if (!Number.isNaN(fieldOfViewNew)) {
			data["data"][matchCase][2] = fieldOfViewNew;
		}
		if (!Number.isNaN(rangeNew)) {
			data["data"][matchCase][3] = rangeNew;
		}
		fs.writeFile('data.json',JSON.stringify(data),finished);
		function finished(err){
			var reply = {
				status: 200,
				msg: "Value Updated."
			}
			response.send(reply);
		}
	}
	
}

function deletedevice(request, response){
	var dataReceived = request.body;
	var deviceName = dataReceived.deviceName;
	var entries = data["data"];

	var matchCase = -1;

	for (var i = 0; i < entries.length; i++) {
		var currentEntry = entries[i];
		if (currentEntry[0] == deviceName) {
			matchCase = i;
			break;
		}
	}
	if (matchCase == -1) {
		reply = {
			status: 200,
			msg: "No such entry."
		}
		response.send(reply);
	}
	else{
		data["data"].splice(matchCase,1);
		fs.writeFile('data.json',JSON.stringify(data),finished);
		function finished(err){
			reply = {
				status: 200,
				msg: "Device deleted."
			}
			response.send(reply);
		}
	}
}

function refreshData(){
	data = JSON.parse(fs.readFileSync('data.json'));
}