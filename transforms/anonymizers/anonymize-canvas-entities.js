const randomName = require('./random-names.js').randomName;
const randomCourseName = require ('./random-courses.js').randomCourseName;
const schoolMappings = require ('./schoolMappings.js').schoolMappings;

console.log("**** Starting Canvas - Entities anonymization.... ");

const COURSE_TYPE = 'CourseDim';
const COURSE_NAME_FIELD = 'name';
const COURSE_ID_FIELD = 'id';
const USER_TYPE = 'UserDim';
const USER_NAME_FIELD = 'name';
const USER_ID_FIELD = 'canvas_id';
const SORTABLE_NAME_FIELD = 'sortable_name';
const CANVAS_URL_FIELD = 'canvasUrl';
const BODY_FIELD = 'body';

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
const CANVAS_URL = 'dummy.instructure.com'; //MUST BE SAME AS OSRT / SM
const BODY = 'body';

const mappedNames = {};
const mappedCourseNames = {};
const mappedCanvasUrl = {};
var canvasUrlCount = 1;

function anonymize(doc, options) {

    if (doc.entity['@type'] === USER_TYPE) {
         anonymizeUserEntity(doc, options);
	}
    if(doc.entity['@type'] === COURSE_TYPE){
         anonymizeCourseEntity(doc,options);
    }
    return anonymizeAllEntity(doc, options);

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
	

    return doc;
}

function anonymizeCourseEntity(doc, options) {

    var currentMappingKey = doc.entity[COURSE_ID_FIELD] + "::" + doc.entity[COURSE_NAME_FIELD];

    if (!mappedCourseNames[currentMappingKey]) {
        mappedCourseNames[currentMappingKey] = randomCourseName();
    }

    var currentMappedNameRecord = mappedCourseNames[currentMappingKey];
    console.log("mapping " + currentMappingKey + " to " + JSON.stringify(currentMappedNameRecord));

    doc.entity[COURSE_NAME_FIELD] = currentMappedNameRecord.courseName;
    

    return doc;
}

function anonymizeAllEntity(doc, options) {

    doc[ACCOUNT_ID_FIELD] = ACCOUNT_ID;
    doc[ENV_ID_FIELD] = ENV_ID;
    doc[SENSOR_ID_FIELD] = SENSOR_ID;
    doc[API_KEY_FIELD] = API_KEY;
    var curUrl = doc.entity[CANVAS_URL_FIELD];
    doc.entity[CANVAS_URL_FIELD] = schoolMappings(curUrl);
    if(doc.entity[BODY_FIELD]){
        doc.entity[BODY_FIELD] = BODY;
    }

    return doc;
}

module.exports = function(doc, options = {}) {
    anonymize(doc._source, options)
}