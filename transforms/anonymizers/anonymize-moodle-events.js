const randomName = require('./random-names.js').randomName;

console.log("**** Starting Moodle Event anonymization.... ");


// Event data changes
var INSTITUTION_NAME = "Lambda University Online";

// EdApp data changes
const EDAPP_FIELD = 'edApp';
// Values
const EDAPP = {
    "@context": "http://purl.imsglobal.org/ctx/caliper/v1/Context",
    "@id": "https://moodle.lambda.edu",
    "@type": "http://purl.imsglobal.org/caliper/v1/SoftwareApplication",
    "name": INSTITUTION_NAME
}

//  Generic data changes
const ENV_ID_FIELD = 'envId';
const ACCOUNT_ID_FIELD = 'accountId';
const SENSOR_ID_FIELD = 'sensorId';
const API_KEY_FIELD = 'apiKey';
// Values
const ACCOUNT_ID = 'sales';
const ENV_ID = 'sales3';
const SENSOR_ID = 'c28e3d67-818f-49d5-bf1f-3f188f2c440b';
const API_KEY = 'bsTvWK_-Rl-gZnnQ5de79w';

const mappedNames = {};

function anonymize(doc, options) {

    anonymizeAnyEvent(doc, options);

}

function anonymizeAnyEvent(doc, options) {

    doc.event[EDAPP_FIELD] = EDAPP;
    doc[ACCOUNT_ID_FIELD] = ACCOUNT_ID;
    doc[ENV_ID_FIELD] = ENV_ID;
    doc[SENSOR_ID_FIELD] = SENSOR_ID;
    doc[API_KEY_FIELD] = API_KEY;

    return doc;
}

module.exports = function(doc, options = {}) {
    anonymize(doc._source, options)
}