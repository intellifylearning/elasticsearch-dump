const randomNames = require('./canvas-random-names.js')

console.log("**** Starting Canvas anonymization.... ");
console.log("loaded " + randomNames.length + " random names ");

const mappedNames = {};
var currentIdx = 0;

function anonymize(doc, options) {
    var currentMappingKey = doc.entity.canvas_id + "::" + doc.entity.name;
    if (doc.entity['@type'] === 'UserDim') {
        if (!mappedNames[currentMappingKey]) {
            mappedNames[currentMappingKey] = randomNames[currentIdx];
            currentIdx++;
        }

        var currentMappedNameRecord = mappedNames[currentMappingKey];
        console.log("mapping " + currentMappingKey + " to " + JSON.stringify(currentMappedNameRecord));

        doc.entity.name = currentMappedNameRecord.firstName + " " + currentMappedNameRecord.lastName;
        doc.entity.sortable_name = currentMappedNameRecord.lastName + ", " + currentMappedNameRecord.firstName;
    }
    return doc;
}

module.exports = function(doc, options = {}) {
    anonymize(doc._source, options)
}