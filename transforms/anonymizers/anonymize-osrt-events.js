const randomName = require('./random-names.js').randomName;
const schoolMappings = require ('./schoolMappings.js').schoolMappings;
console.log("**** Starting OSRT - Events anonymization.... ");

const USER_NAME_FIELD = 'name';
//  Generic data changes
const ENV_ID_FIELD = 'envId';
const ACCOUNT_ID_FIELD = 'accountId';
const SENSOR_ID_FIELD = 'sensorId';
const API_KEY_FIELD = 'apiKey';
const EDAPP_ID_FIELD = "@id"
const EDAPP_DESCRIPTION_FIELD = "description";
const TOOL_CONSUMER_INSTANCE_NAME_FIELD = "tool_consumer_instance_name";
const CUSTOM_API_DOMAIN_FIELD = "custom_canvas_api_domain";


// Values
const ACCOUNT_ID = 'developer';
const ENV_ID = 'load';
const SENSOR_ID = '7fceeffa-f648-422e-9dd6-05984701c94d';
const API_KEY = '9IeiCBCtTj69ZHTe9L2pQg';
const EDAPP_ID = 'http//www.intellify.io/osrt';
const DEFAULT_USER_NAME = 'NOT REAL';
const EDAPP_DESCRIPTION = 'OSRT Application';
const TOOL_CONSUMER_INSTANCE_NAME = "Intellify University";
const CUSTOM_API_DOMAIN = "dummy.instructure.com"; 

const mappedNames = {};

function anonymize(doc, options) {

    return anonymizeAnyEntity(doc, options);
}

function anonymizeAnyEntity(doc, options) {
		
	doc[ACCOUNT_ID_FIELD] = ACCOUNT_ID;
    doc[ENV_ID_FIELD] = ENV_ID;
    doc[SENSOR_ID_FIELD] = SENSOR_ID;
    doc[API_KEY_FIELD] = API_KEY;
    doc.event.data.edApp[EDAPP_ID_FIELD] = EDAPP_ID;
    doc.event.data.actor[USER_NAME_FIELD] = DEFAULT_USER_NAME;
    doc.event.data.edApp[EDAPP_DESCRIPTION_FIELD] = EDAPP_DESCRIPTION;
    if(doc.event.data.actor.extensions){
    if (doc.event.data.actor.extensions[TOOL_CONSUMER_INSTANCE_NAME_FIELD] ){
    	doc.event.data.actor.extensions[TOOL_CONSUMER_INSTANCE_NAME_FIELD] = TOOL_CONSUMER_INSTANCE_NAME;

    } 

    if(doc.event.data.actor.extensions[CUSTOM_API_DOMAIN_FIELD]){
    	var curUrl = doc.event.data.actor.extensions[CUSTOM_API_DOMAIN_FIELD];
    	doc.event.data.actor.extensions[CUSTOM_API_DOMAIN_FIELD] = schoolMappings(curUrl);
    }
}



    return doc;
}

module.exports = function(doc, options = {}) {
    anonymize(doc._source, options)
}