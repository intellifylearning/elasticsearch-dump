const randomName = require('./random-names.js').randomName;

console.log("**** Starting Canvas anonymization.... ");

const USER_TYPE = 'UserDim';
const USER_NAME_FIELD = 'name';
const USER_ID_FIELD = 'canvas_id';
const COURSE_TYPE = 'CourseDim';

const mappedNames = {};

function anonymize(doc, options) {

    if (doc.entity['@type'] === USER_TYPE) {
        return anonymizeUserEntity(doc, options);
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
    doc.entity.sortable_name = currentMappedNameRecord.lastName + ", " + currentMappedNameRecord.firstName;

    return doc;
}

module.exports = function(doc, options = {}) {
    anonymize(doc._source, options)
}