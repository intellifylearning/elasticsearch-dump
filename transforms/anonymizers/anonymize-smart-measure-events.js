console.log("**** Starting Smarter Measure anonymization.... ");
const schoolMappings = require ('./schoolMappings.js').schoolMappings;

// Fields
const EMAIL_FIELD = 'EmailAddress';
const CUSTOM_CANVAS_API_DOMAIN_FIELD = 'event.custom_canvas_api_domain'; 


// Values
const EMAIL = "dummy.email@intellify.io";
const CUSTOM_CANVAS_API_DOMAIN = "dummy.instructure.com"; //MUST BE SAME AS FROM CANVAS ANONYMIZER

function anonymize(doc, options) {

    return anonymizeUserEntity(doc, options);
}

function anonymizeUserEntity(doc, options) {
	doc.event[EMAIL_FIELD] = EMAIL;
	var curUrl = doc.event[CUSTOM_CANVAS_API_DOMAIN_FIELD];
	doc.event[CUSTOM_CANVAS_API_DOMAIN_FIELD] = schoolMappings(curUrl);

    return doc;
}

module.exports = function(doc, options = {}) {
    anonymize(doc._source, options)
}