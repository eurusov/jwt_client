import {fillPrincipalTable} from '/js/func.js';
import {getUrl} from "/js/func";

$(document).ajaxError(function (event, resp, settings, thrownError) {
    console.error("An error occurred while processing AJAX request!")
    console.error(resp.responseText);
});

$(document).ready(function () {
        $.ajax({
            url: getUrl('/user-api'),
            success: fillPrincipalTable // function from func.js
        });
    }
);
