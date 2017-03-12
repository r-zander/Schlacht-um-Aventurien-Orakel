"use strict";

var previewSet = [];

var setMapping = {
	florindel: "FLO"
};

var setMappingInverted = {
	FLO: "florindel"
};

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
						$('section.cards').append(setHtml);

						previewSet.push(setMapping[setName]);
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
	} else {
		$(document).trigger('setsLoaded');
	}
});