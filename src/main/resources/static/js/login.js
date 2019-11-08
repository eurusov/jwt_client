import {getUrl} from "/js/func.js";

$(document).ready(function () {
    // register the function that intercepts a 'login' form submit event
    let loginForm = $(".form-signin");
    loginForm.on("submit", (function (event) {
            event.preventDefault();
            let passwordField = loginForm.find("input[name='password']");
            let credentials = {
                username: loginForm.find("input[name='username']").val(),
                password: passwordField.val()
            };
            passwordField.val("");

            ajaxDoLogin(credentials, function (response) {
                console.log("===== ajaxDoLogin (success) =====");
                console.log("response=" + JSON.stringify(response));
                loginForm.find("input[name='token']").val(response.token);
                loginForm.off("submit");

                getPrincipal(response, function (resp) {
                    console.log(resp);
                });

                // loginForm.submit();
            });
        })
    );
});

function ajaxDoLogin(credentials, onSuccess) {
    let url = getUrl("/api/login");
    console.log("===== ajaxDoLogin =====");
    console.log("url=" + url);
    console.log("credentials=" + JSON.stringify(credentials));
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: url,
        data: JSON.stringify(credentials),
        dataType: 'json',
        success: onSuccess,
        error: function (jqXHR) {
            console.log("===== ajaxDoLogin (error) =====");
            console.log("ERROR WHILE GETTING RESPONSE FROM: " + url);
            console.log(jqXHR.responseJSON);
        }
    });
}

function getPrincipal(credentials, onSuccess) {
    let url = getUrl("/api/user/") + credentials.username;
    console.log("===== getPrincipal =====");
    console.log("url=" + url);
    console.log("credentials=" + JSON.stringify(credentials));
    $.ajax({
        type: "GET",
        // contentType: "application/json",
        url: url,
        // dataType: 'json',
        success: onSuccess,
        headers: {
            "Authorization" : "Bearer " + credentials.token
        },
        error: function (jqXHR) {
            console.log("===== getPrincipal (error) =====");
            console.log("ERROR WHILE GETTING RESPONSE FROM: " + url);
            if (jqXHR.responseJSON !== undefined) {
                console.log(jqXHR.responseJSON);
            } else {
                console.log(jqXHR);
            }
        }
    });
}
