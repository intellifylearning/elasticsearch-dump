const schoolMappings = require ('./schoolMappings.js').schoolMappings;
console.log("**** Starting OSRT - Entities anonymization.... ");

//  Generic data changes
const ENV_ID_FIELD = 'envId';
const ACCOUNT_ID_FIELD = 'accountId';
const SENSOR_ID_FIELD = 'sensorId';
const API_KEY_FIELD = 'apiKey';
const NAME_FIELD = 'name';
const ID_FIELD = '@id';
// Values
const ACCOUNT_ID = 'developer';
const ENV_ID = 'load';
const SENSOR_ID = '7fceeffa-f648-422e-9dd6-05984701c94d';
const API_KEY = '9IeiCBCtTj69ZHTe9L2pQg';
const NAME = 'OSRT Application'
const ID = 'http//www.intellify.io/osrt'

function anonymize(doc, options) {

    return anonymizeAnyEntity(doc, options);
}

function anonymizeAnyEntity(doc, options) {
	
	doc[ACCOUNT_ID_FIELD] = ACCOUNT_ID;
    doc[ENV_ID_FIELD] = ENV_ID;
    doc[SENSOR_ID_FIELD] = SENSOR_ID;
    doc[API_KEY_FIELD] = API_KEY;
    doc.entity[NAME_FIELD] = NAME;
    doc.entity[ID_FIELD] = ID;


    return doc;
}

module.exports = function(doc, options = {}) {
    anonymize(doc._source, options)
}