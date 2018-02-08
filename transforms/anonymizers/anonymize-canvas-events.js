const schoolMappings = require ('./schoolMappings.js').schoolMappings;

console.log("**** Starting Canvas - Events anonymization.... ");

//  Generic data changes
const ENV_ID_FIELD = 'envId';
const ACCOUNT_ID_FIELD = 'accountId';
const SENSOR_ID_FIELD = 'sensorId';
const API_KEY_FIELD = 'apiKey';
const CANVAS_URL_FIELD = "canvasUrl";
// Values
const ACCOUNT_ID = 'developer';
const ENV_ID = 'load';
const SENSOR_ID = 'e474a838-2c1d-400d-8452-4a1570b49a7b';
const API_KEY = 'KKVHkU7MTC--HNvdp7_K8g';
const CANVAS_URL = 'dummy.intsructure.com' // MUST BE SAMES AS CANVAS ENTITY AND OSRT AND SM

function anonymize(doc, options) {

    return anonymizeAnyEntity(doc, options);
}

function anonymizeAnyEntity(doc, options) {
	
	doc[ACCOUNT_ID_FIELD] = ACCOUNT_ID;
    doc[ENV_ID_FIELD] = ENV_ID;
    doc[SENSOR_ID_FIELD] = SENSOR_ID;
    doc[API_KEY_FIELD] = API_KEY;
    var curUrl = doc.event[CANVAS_URL_FIELD];
    doc.event[CANVAS_URL_FIELD] = schoolMappings(curUrl);

    return doc;
}

module.exports = function(doc, options = {}) {
    anonymize(doc._source, options)
}