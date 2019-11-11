import {fillPrincipalTable} from '/js/func.js';
import {getUrl} from "/js/func.js";

// Register the handler to be called when Ajax requests complete with an error.
$(document).ajaxError(function (event, resp) {
    console.error("An error occurred while processing the AJAX request!");
    console.error(resp.responseText);
});

/*
 Register the handler to be executed before an Ajax request is sent.
 This function adds the 'Authorization' header with token to every cross-domain requests.
*/
$(document).ajaxSend(function (event, jqXHR, options) {
    if (options.crossDomain) {
        jqXHR.setRequestHeader("Authorization", "Bearer " + JSON.parse(sessionStorage['jwtToken']).token);
    }
});

function ajaxGetUserByUsername(username, onSuccess) {
    $.ajax({
        url: getUrl('/api/user/user/?name=' + username),
        success: onSuccess
    });
}

$(document).ready(function () {
        $("#logoutLink").on("click", function (event) {
            event.preventDefault();
            sessionStorage['jwtToken'] = null;
            window.location.assign(window.origin);
        });

        ajaxGetUserByUsername(JSON.parse(sessionStorage['jwtToken']).username, fillPrincipalTable);
    }
);
