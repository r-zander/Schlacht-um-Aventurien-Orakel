"use strict";

var previewSet = [];

String.prototype.capitalize = function () {
	return this[0].toUpperCase() + this.slice(1);
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

$(function () {
	var setPreview = getUrlParameter('setPreview');
	if (setPreview) {
		setPreview = setPreview.split(',');
		var setsToLoad = setPreview.length;
		setPreview.forEach(function (setName) {
			setName = setName.toLowerCase();
			if (setName.match(/^[a-z0-9]+$/)) {
				$.ajax({
					url: 'preview/' + setName + '.partial.html',
					success: function (setHtml) {
						var newSection = $('<section class="set preview ' + setName + '"></section>');
						$('section.set').last().after(newSection);
						newSection.append('<h2>' + 'Set: ' + setName.capitalize() + '</h2>');
						newSection.append(setHtml);

						previewSet.push(setName);
					},
					complete: function () {
						setsToLoad--;
						if (setsToLoad == 0) {
							$(document).trigger('setsLoaded');
						}
					}
				});
			} else {
				setsToLoad--;
				if (setsToLoad == 0) {
					$(document).trigger('setsLoaded');
				}
			}
		});
	}
});