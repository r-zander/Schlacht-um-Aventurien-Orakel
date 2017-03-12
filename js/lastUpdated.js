"use strict";
$(function () {
    /*
     * Write 'Last Updated'
     */
    $('.updated').each(function (index, element) {
	    var $element = $(element);
	    $element.text(
		    new Date(
			    fetchHeader(
				    $element.attr('data-file'),
				    'Last-Modified'
			    )).toLocaleDateString('de-DE')
	    );
    });
});