console.log("**** Starting Smarter Measure anonymization.... ");

function anonymize(doc, options) {

    return anonymizeUserEntity(doc, options);
}

function anonymizeUserEntity(doc, options) {

    return doc;
}

module.exports = function(doc, options = {}) {
    anonymize(doc._source, options)
}