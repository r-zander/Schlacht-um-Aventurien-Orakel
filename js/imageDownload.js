"use strict";
String.prototype.allReplace = function(obj) {
    var retStr = this;
    for (var x in obj) {
        retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
    }
    return retStr;
};

$(function() {
    $('.bbcode-SchlachtUmAventurien').click(function () {
        var node = this;

        domtoimage.toBlob(node, {
            style: {
                margin: 0,
                boxShadow: "none"
            }
        })
            .then(function (blob) {
                var name = $(node).children('.name').text();
                name = name.toLowerCase();
                name = name.allReplace({
                    ' - ': '-',
                    ', ': '_',
                    ' ': '_',
                    'ä': 'ae',
                    'ö': 'oe',
                    'ü': 'ue',
                    'ß': 'ss'
                });
                name = name.replace(/[^a-z0-9_\-]/g, '-');

                window.saveAs(blob, name + '.png');
            });
    });


// $('.bbcode-SchlachtUmAventurien').each(function () {
// 	var node = this;

// 	domtoimage.toBlob(node,{
// 		style: {
// 			margin: 0,
// 			boxShadow: "none"
// 		}
// 	})
// 	    .then(function (blob) {
// 	    	var name = $(node).children('.name').text();
// 	    	name = name.toLowerCase();
// 	    	name = name.allReplace({
// 	    		' - ': '-',
// 	    		', ': '_',
// 	    		' ': '_',
// 	    		'ä': 'ae',
// 	    		'ö': 'oe',
// 	    		'ä': 'ae',
// 	    		'ß': 'ss'
// 	    	});
// 	    	name = name.replace(/[^a-z0-9_\-]/g, '-');

// 	        window.saveAs(blob, name + '.png');
// 	    });
// });

});