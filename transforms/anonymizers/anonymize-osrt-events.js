const randomName = require('./random-names.js').randomName;

console.log("**** Starting OSRT - Events anonymization.... ");

const USER_NAME_FIELD = 'actor.name';
const USER_ID_FIELD = 'actor.extensions.custom_canvas_user_id';
//  Generic data changes
const ENV_ID_FIELD = 'envId';
const ACCOUNT_ID_FIELD = 'accountId';
const SENSOR_ID_FIELD = 'sensorId';
const API_KEY_FIELD = 'apiKey';
// Values
const ACCOUNT_ID = 'developer';
const ENV_ID = 'load';
const SENSOR_ID = '7fceeffa-f648-422e-9dd6-05984701c94d';
const API_KEY = '9IeiCBCtTj69ZHTe9L2pQg';

const mappedNames = {};

function anonymize(doc, options) {

    return anonymizeAnyEntity(doc, options);
}

function anonymizeAnyEntity(doc, options) {
	
	var currentMappingKey = doc.entity[USER_ID_FIELD] + "::" + doc.entity[USER_NAME_FIELD];
	
	if (!mappedNames[currentMappingKey]) {
        mappedNames[currentMappingKey] = randomName();
    }
	
	var currentMappedNameRecord = mappedNames[currentMappingKey];
	doc.entity[USER_NAME_FIELD] = currentMappedNameRecord.firstName + " " + currentMappedNameRecord.lastName;
	
	doc[ACCOUNT_ID_FIELD] = ACCOUNT_ID;
    doc[ENV_ID_FIELD] = ENV_ID;
    doc[SENSOR_ID_FIELD] = SENSOR_ID;
    doc[API_KEY_FIELD] = API_KEY;

    return doc;
}

module.exports = function(doc, options = {}) {
    anonymize(doc._source, options)
}