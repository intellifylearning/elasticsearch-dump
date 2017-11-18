const randomName = require('./random-names.js').randomName;

console.log("**** Starting Moodle anonymization.... ");

const USER_TYPE = 'http://purl.imsglobal.org/caliper/v1/lis/Person';
const USER_FIRST_NAME_FIELD = 'firstName';
const USER_LAST_NAME_FIELD = 'lastName';
const USER_EMAIL_FIELD = 'email';
const USER_ID_FIELD = '@id';
const COURSE_TYPE = 'http://purl.imsglobal.org/caliper/v1/lis/Course';
const EMAIL_DOMAIN = '@lambda.edu'
const EDAPP_FIELD = 'edApp';
const EDAPP = {
    "@context": "http://purl.imsglobal.org/ctx/caliper/v1/Context",
    "@id": "https://moodle.lambda.edu",
    "@type": "http://purl.imsglobal.org/caliper/v1/SoftwareApplication",
    "name": "Lambda University Online"
}
const ENV_ID_FIELD = 'envId';
const ACCOUNT_ID_FIELD = 'accountId';
const SENSOR_ID_FIELD = 'sensorId';
const API_KEY_FIELD = 'apiKey';
const ENV_ID = 'prod';
const ACCOUNT_ID = 'lambda';
const SENSOR_ID = 'lambda-moodle-sensor-demo';
const API_KEY = 'lambda-apikey-1122-demo';

const mappedNames = {};

function anonymize(doc, options) {

    if (doc.entity['@type'] === USER_TYPE) {
        return anonymizeUserEntity(doc, options);
    }
}

function anonymizeUserEntity(doc, options) {

    var currentMappingKey = doc.entity[USER_ID_FIELD] + "::" + doc.entity.extensions[USER_FIRST_NAME_FIELD] + "::" + doc.entity.extensions[USER_LAST_NAME_FIELD];

    if (!mappedNames[currentMappingKey]) {
        mappedNames[currentMappingKey] = randomName();
    }

    var currentMappedNameRecord = mappedNames[currentMappingKey];
    console.log("mapping " + currentMappingKey + " to " + JSON.stringify(currentMappedNameRecord));

    doc.entity.extensions[USER_FIRST_NAME_FIELD] = currentMappedNameRecord.firstName;
    doc.entity.extensions[USER_LAST_NAME_FIELD] = currentMappedNameRecord.lastName;
    doc.entity.extensions[USER_EMAIL_FIELD] = currentMappedNameRecord.firstName.substring(0, 3) + currentMappedNameRecord.lastName + EMAIL_DOMAIN;
    doc.entity.extensions[EDAPP_FIELD] = EDAPP;
    doc[ACCOUNT_ID_FIELD] = ACCOUNT_ID;
    doc[ENV_ID_FIELD] = ENV_ID;
    doc[SENSOR_ID_FIELD] = SENSOR_ID;
    doc[API_KEY_FIELD] = API_KEY;

    return doc;
}

module.exports = function(doc, options = {}) {
    anonymize(doc._source, options)
}