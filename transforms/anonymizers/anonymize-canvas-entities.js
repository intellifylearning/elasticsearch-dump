const randomName = require('./random-names.js').randomName;

console.log("**** Starting Canvas - Entities anonymization.... ");

const USER_TYPE = 'UserDim';
const USER_NAME_FIELD = 'name';
const USER_ID_FIELD = 'canvas_id';
const SORTABLE_NAME_FIELD = 'sortable_name';

//  Generic data changes
const ENV_ID_FIELD = 'envId';
const ACCOUNT_ID_FIELD = 'accountId';
const SENSOR_ID_FIELD = 'sensorId';
const API_KEY_FIELD = 'apiKey';
// Values
const ACCOUNT_ID = 'developer';
const ENV_ID = 'load';
const SENSOR_ID = 'e474a838-2c1d-400d-8452-4a1570b49a7b';
const API_KEY = 'KKVHkU7MTC--HNvdp7_K8g';

const mappedNames = {};

function anonymize(doc, options) {

    if (doc.entity['@type'] === USER_TYPE) {
        return anonymizeUserEntity(doc, options);
	} else {
        anonymizeAnyEntity(doc, options);
    }
}

function anonymizeUserEntity(doc, options) {

    var currentMappingKey = doc.entity[USER_ID_FIELD] + "::" + doc.entity[USER_NAME_FIELD];

    if (!mappedNames[currentMappingKey]) {
        mappedNames[currentMappingKey] = randomName();
    }

    var currentMappedNameRecord = mappedNames[currentMappingKey];
    console.log("mapping " + currentMappingKey + " to " + JSON.stringify(currentMappedNameRecord));

    doc.entity[USER_NAME_FIELD] = currentMappedNameRecord.firstName + " " + currentMappedNameRecord.lastName;
    doc.entity[SORTABLE_NAME_FIELD] = currentMappedNameRecord.lastName + ", " + currentMappedNameRecord.firstName;
	
	anonymizeAnyEntity(doc, options);

    return doc;
}

function anonymizeAnyEntity(doc, options) {

    doc[ACCOUNT_ID_FIELD] = ACCOUNT_ID;
    doc[ENV_ID_FIELD] = ENV_ID;
    doc[SENSOR_ID_FIELD] = SENSOR_ID;
    doc[API_KEY_FIELD] = API_KEY;

    return doc;
}

module.exports = function(doc, options = {}) {
    anonymize(doc._source, options)
}