"use strict";
$(function () {
    /*
     * Write 'Last Updated'
     */
    $('#lastUpdated').text(
        new Date(
            fetchHeader(
                '01.schlacht-um-aventurien.xml',
                'Last-Modified'
            )).toLocaleDateString('de-DE')
    );

    $('#previewLastUpdated').text(
        new Date(
            fetchHeader(
                '02.schlacht-um-aventurien_preview.xml',
                'Last-Modified'
            )).toLocaleDateString('de-DE')
    );
});