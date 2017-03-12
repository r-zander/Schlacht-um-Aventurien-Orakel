"use strict";

String.prototype.capitalize = function () {
	return this[0].toUpperCase() + this.slice(1);
};

String.prototype.allReplace = function(obj) {
	var retStr = this;
	for (var x in obj) {
		retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
	}
	return retStr;
};

function getUrlParameter(sParam, lowerCase) {
	var sPageUrl = decodeURIComponent(window.location.search.substring(1)),
		sUrlVariables = sPageUrl.split('&'),
		sParameterName,
		i;

	for (i = 0; i < sUrlVariables.length; i++) {
		sParameterName = sUrlVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true :
				lowerCase ? sParameterName[1].toLowerCase() : sParameterName[1];
		}
	}
}

function fetchHeader(url, wch) {
	try {
		var req=new XMLHttpRequest();
		req.open("HEAD", url, false);
		req.send(null);
		if(req.status== 200){
			return req.getResponseHeader(wch);
		}
		else return false;
	} catch(er) {
		return er.message;
	}
}