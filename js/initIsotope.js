"use strict";

$(document).on('setsLoaded', function () {
	// Don't initialize Isotope if we're about to download all images.
	if (renderImagesMode){
		return;
	}

	var gridContainer = $('section.cards');

	function intSortData(item, selector) {
		var text = $(item).find(selector).text();

		if (text === '') {
			return 0
		}

		if (text.match(/\d+/)) {
			return parseInt(text);
		}

		return 100;
	}

	function stringSortData(item, selector) {
		var text = $(item).find(selector).text();
		return text.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue');
	}

	var sortData = {
		name: function (item) {
			return stringSortData(item, '.name');
		},
		fraktion: function (item) {
			return stringSortData(item, '.fraktion');
		},
		punkte: function (item) {
			return intSortData(item, '.punkte');
		},
		angriff: function (item) {
			return intSortData(item, '.angriff');
		},
		verteidigung: function (item) {
			return intSortData(item, '.verteidigung');
		},
		angriffstyp: function (item) {
			switch ($(item).find('.angriffstyp').text()) {
				case "":
					return 0;
				case "Nah":
					return 1;
				case "Mittel":
					return 2;
				case "Fern":
					return 3;
				case "Heil":
					return 4;
				case "Explosion":
					return 5;
				default:
					console.warn('Unknown Angriffstyp: ' + $(item).find('.angriffstyp').text());
					return 100;
			}
		}
	};

	var filter = {
		set: previewSet.length > 0 ? previewSet : 'all',
		name: null,
		fraktion: 'all',
		effekt: null
	};

	gridContainer.isotope({
		itemSelector: '.bbcode-SchlachtUmAventurien',
		layoutMode: 'fitRows',
		getSortData: sortData,
		sortBy: 'name',
		filter: function () {
			var $this = $(this);

			if (filter.set !== 'all') {
				if (typeof filter.set === 'string') {
					if (!$this.hasClass('set-' + filter.set)) {
						return false;
					}
				} else {
					if (!filter.set.some(function (setName) {
							return setName === 'all' || $this.hasClass('set-' + setName);
						})) {
						return false;
					}
				}
			}

			if (filter.name) {
				if (!$this.find('.name').text().match(filter.name)) {
					return false;
				}
			}

			if (filter.fraktion !== 'all') {
				if (!$this.find('.fraktion').text().match(filter.fraktion)) {
					return false;
				}
			}

			if (filter.effekt) {
				if (!$this.find('.effekt').text().match(filter.effekt)) {
					return false;
				}
			}

			return true;
		}
	});

	var $sortBySelect = $('#sortBy');
	for (var sortKey in sortData) {
		$sortBySelect.append('<option value="' + sortKey + '">' + sortKey.capitalize() + '</option>');
	}

	$sortBySelect.change(function () {
		gridContainer.isotope({
			sortBy: [this.value, 'name']
		});
	});

	$('input[name=sortAscending]').change(function () {
		var sortAscending = {};

		sortAscending[$sortBySelect.val()] = (this.value == 'true');
		if ($sortBySelect.val() !== 'name') {
			sortAscending.name = true;
		}

		gridContainer.isotope({
			sortAscending: sortAscending
		});
	});

	var $cardCount = $('#cardCount');
	$cardCount.text(gridContainer.isotope('getFilteredItemElements').length);
	gridContainer.on('arrangeComplete', function () {
		$cardCount.text(gridContainer.isotope('getFilteredItemElements').length);
	});

	var $filterSet = $('#filter_set');

	previewSet.forEach(function (setName) {
		$filterSet.prepend(
			'<option value="' + setName + '">' +
			setMappingInverted[setName].capitalize() + ' (' + setName + ')' +
			'</option>');
	});

	$filterSet.children('[value=all]').prependTo($filterSet);

	if (previewSet.length > 0) {
		$filterSet.val(previewSet);
	}

	$filterSet.change(function () {
		filter.set = $(this).val();
		gridContainer.isotope();
	});

	$('#filter_name').on('input', function () {
		filter.name = new RegExp(this.value, 'gi');
		gridContainer.isotope();
	});

	var fraktionen = new Set();

	$('.fraktion').each(function () {
		var fraktion = $(this).text();
		if (fraktion) {
			fraktion = fraktion.split(/, ?/);
			fraktion.forEach(function (e) {
				fraktionen.add(e);
			});
		}
	});

	var $fraktionFilter = $('#filter_fraktion');
	Array.from(fraktionen).sort().forEach(function (fraktion) {
		$fraktionFilter.append('<option value="' + fraktion + '">' + fraktion + '</option>');
	});
	$fraktionFilter.change(function () {
		filter.fraktion = this.value;
		gridContainer.isotope();
	});

	$('#filter_effekt').on('input', function () {
		filter.effekt = new RegExp(this.value, 'gi');
		gridContainer.isotope();
	});
});