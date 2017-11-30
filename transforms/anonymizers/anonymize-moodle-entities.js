const randomName = require('./random-names.js').randomName;

console.log("**** Starting Moodle anonymization.... ");


// Student data changes
const USER_TYPE = 'http://purl.imsglobal.org/caliper/v1/lis/Person';
const USER_FIRST_NAME_FIELD = 'firstName';
const USER_LAST_NAME_FIELD = 'lastName';
const USER_EMAIL_FIELD = 'email';
const USER_ID_FIELD = '@id';
const USER_PHONE_NUMBER_FIELD = 'phone';
const USER_MOBILE_PHONE_NUMBER_FIELD = 'mobilePhone';
const USER_ADDRESS_FIELD = 'address';
const USERNAME_FIELD = 'userName';
const USER_INSTITUTION_NAME_FIELD = 'institutionName';
// Values
const USER_PHONE_NUMBER = '555-555-5555';
const USER_MOBILE_PHONE_NUMBER = '555-555-6666';
const USER_ADDRESS = '51 Nellcheer Street, Louisville, KY 01560';
var USER_INSTITUTION_NAME = "Lambda University Online";

//  Course data changes
const COURSE_TYPE = 'http://purl.imsglobal.org/caliper/v1/lis/Course';
const EMAIL_DOMAIN = '@lambda.edu'

// EdApp data changes
const EDAPP_FIELD = 'edApp';
// Values
const EDAPP = {
    "@context": "http://purl.imsglobal.org/ctx/caliper/v1/Context",
    "@id": "https://moodle.lambda.edu",
    "@type": "http://purl.imsglobal.org/caliper/v1/SoftwareApplication",
    "name": USER_INSTITUTION_NAME
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

    if (doc.entity['@type'] === USER_TYPE) {
        return anonymizeUserEntity(doc, options);
    } else {
        anonymizeAnyEntity(doc, options);
    }
}

function anonymizeUserEntity(doc, options) {

    var currentMappingKey = doc.entity[USER_ID_FIELD] + "::" + doc.entity.extensions[USER_FIRST_NAME_FIELD] + "::" + doc.entity.extensions[USER_LAST_NAME_FIELD];

    if (!mappedNames[currentMappingKey]) {
        mappedNames[currentMappingKey] = randomName();
    }

    var currentMappedNameRecord = mappedNames[currentMappingKey];
    // console.log("mapping " + currentMappingKey + " to " + JSON.stringify(currentMappedNameRecord));

    doc.entity.extensions[USER_FIRST_NAME_FIELD] = currentMappedNameRecord.firstName;
    doc.entity.extensions[USER_LAST_NAME_FIELD] = currentMappedNameRecord.lastName;
    var userName = currentMappedNameRecord.firstName.substring(0, 3) + currentMappedNameRecord.lastName;
    doc.entity.extensions[USER_EMAIL_FIELD] =  userName + EMAIL_DOMAIN;
    doc.entity.extensions[USERNAME_FIELD] = userName;
    doc.entity.extensions[USER_INSTITUTION_NAME_FIELD] = USER_INSTITUTION_NAME;
    doc.entity.extensions[USER_PHONE_NUMBER_FIELD] = USER_PHONE_NUMBER;
    doc.entity.extensions[USER_MOBILE_PHONE_NUMBER_FIELD] = USER_MOBILE_PHONE_NUMBER;
    doc.entity.extensions[USER_ADDRESS_FIELD] = USER_ADDRESS;
    
    anonymizeAnyEntity(doc, options);

    return doc;
}

function anonymizeAnyEntity(doc, options) {

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