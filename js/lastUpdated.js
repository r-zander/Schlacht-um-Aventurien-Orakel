"use strict";
$(function () {
    /*
     * Write 'Last Updated'
     */
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

    $('#lastUpdated').text(
        new Date(
            fetchHeader(
                '01.schlacht-um-aventurien.xml',
                'Last-Modified'
            )).toLocaleDateString('de-DE')
    );
});