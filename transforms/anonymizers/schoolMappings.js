var schoolMappingsMap = {
	'vcccd.instructure.com':'school1.instructure.com',
'cabrillo.instructure.com':'school2.instructure.com',
'':''};

var schoolMappings = function(url){
	return schoolMappingsMap[url];
}

module.exports = {
    schoolMappings: schoolMappings
}