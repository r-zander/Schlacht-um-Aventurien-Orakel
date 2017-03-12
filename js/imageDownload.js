"use strict";
String.prototype.allReplace = function(obj) {
    var retStr = this;
    for (var x in obj) {
        retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
    }
    return retStr;
};

function downloadNode(node) {
	domtoimage.toBlob(node, {
		style: {
			margin: 0,
			boxShadow: "none",
			// width: "1488px",
			// height: "2079px"
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
}

$(function() {
    $('.bbcode-SchlachtUmAventurien').click(function (e) {
	    downloadNode(this);
	    e.preventDefault();
    });
});

var domToImageLoaded = false;

function downloadAllImages() {
	function imageDownload() {
		$('.bbcode-SchlachtUmAventurien').each(function () {
			downloadNode(this);

			// TODO test
			return false;
		});
		domToImageLoaded = true;
	}

    // if (!domToImageLoaded){
	 //    $.when(
		//     $.getScript( 'js/vendor/dom-to-image.min.js' ),
		//     $.getScript( 'js/vendor/FileSaver.min.js' ),
		//     $.Deferred(function( deferred ){
		// 	    $( deferred.resolve );
		//     })
	 //    ).done(imageDownload);
    // } else {
	    imageDownload();
    // }
}