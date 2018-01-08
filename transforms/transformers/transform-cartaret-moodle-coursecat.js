console.log("**** Starting Moodle Course and Category transformation.... ");

//  Course data changes
const COURSE_TYPE = 'http://purl.imsglobal.org/caliper/v1/lis/CourseOffering';
const COURSE_ID_FIELD = '@id';
const COURSE_NAME_FIELD = 'name';
const COURSE_CATEGORY_TYPE = 'http://purl.imsglobal.org/caliper/v1/lis/Group';
const COURSE_CATEGORY_ID_FIELD = '@id';
const COURSE_CATEGORY_NAME_FIELD = 'name';

// EdApp data changes
const EDAPP_FIELD = 'edApp';
// Values
const EDAPP = {
    "@context": "http://purl.imsglobal.org/ctx/caliper/v1/Context",
    "@id": "https://moodle.carteret.edu",
    "@type": "http://purl.imsglobal.org/caliper/v1/SoftwareApplication",
    "name": "Carteret Community College"
}

const __META_FIELD = '__meta'
const __META = {
    "source": "ccc-stage"
}

//  Generic data changes
const ENV_ID_FIELD = 'envId';
const ACCOUNT_ID_FIELD = 'accountId';
const SENSOR_ID_FIELD = 'sensorId';
const API_KEY_FIELD = 'apiKey';
// Values
const ACCOUNT_ID = 'carteretcc';
const ENV_ID = 'carteretprod';
const SENSOR_ID = 'd94b95fe-339f-4119-9fb3-b88487006b7b';
const API_KEY = 'FJ-Gsy_IThKly8Q5n6Al1w';

function transform(doc, options) {

    if (doc.entity['@type'] === COURSE_TYPE) {
        return transformCourseEntity(doc, options);
    } else if (doc.entity['@type'] === COURSE_CATEGORY_TYPE) {
        return transformCourseCategoryEntity(doc, options);
    }
}

function transformCourseEntity(doc, options) {

    doc.entity[COURSE_ID_FIELD] = doc.entity[COURSE_ID_FIELD].replace("/sandbox/", "/");
    doc.entity.subOrganizationOf['@id'] = doc.entity.subOrganizationOf['@id'].replace("/sandbox/", "/");

    transformAnyEntity(doc, options);
}

function transformCourseCategoryEntity(doc, options) {

    doc.entity[COURSE_CATEGORY_ID_FIELD] = doc.entity[COURSE_CATEGORY_ID_FIELD].replace("/sandbox/", "/");
    if (doc.entity.subOrganizationOf) {
        doc.entity.subOrganizationOf['@id'] = doc.entity.subOrganizationOf['@id'].replace("/sandbox/", "/");
        if (doc.entity.subOrganizationOf['@id']['subOrganizationOf']) {
            doc.entity.subOrganizationOf['@id'].subOrganizationOf['@id'] = doc.entity.subOrganizationOf['@id'].subOrganizationOf['@id'].replace("/sandbox/", "/");
        }
    }

    transformAnyEntity(doc, options);
}

function transformAnyEntity(doc, options) {

    doc.entity.extensions[EDAPP_FIELD] = EDAPP;
    doc[ACCOUNT_ID_FIELD] = ACCOUNT_ID;
    doc[ENV_ID_FIELD] = ENV_ID;
    doc[SENSOR_ID_FIELD] = SENSOR_ID;
    doc[API_KEY_FIELD] = API_KEY;
    doc.entity.extensions[__META_FIELD] = __META;

    return doc;
}

module.exports = function(doc, options = {}) {
    transform(doc._source, options)
}