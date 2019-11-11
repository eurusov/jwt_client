import {getUrl} from "/js/func.js";

$(document).ready(function () {
    // Registers a function that intercepts submit event of the login form.
    let loginForm = $(".form-signin");
    loginForm.on("submit", (function (event) {
            event.preventDefault();
            let passwordField = loginForm.find("input[name='password']");
            let credentials = {
                username: loginForm.find("input[name='username']").val(),
                password: passwordField.val()
            };
            passwordField.val("");
            ajaxDoLogin(credentials, onLoginSuccess);
        })
    );
});

function ajaxDoLogin(credentials, onSuccess) {
    let url = getUrl("/api/login");
    console.log("===== ajaxDoLogin =====");
    console.log("url=" + url);
    console.log("credentials=" + JSON.stringify(credentials));
    $.ajax({
        method: "POST",
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

function onLoginSuccess(jwtToken) {
    console.log("===== onLoginSuccess =====");
    console.log("jwtToken=" + JSON.stringify(jwtToken));
    sessionStorage['jwtToken'] = JSON.stringify(jwtToken);

    getPrincipal(jwtToken, function (resp) {
        console.log("===== getPrincipal (success) =====");
        console.log(resp);

        ajaxGetUserPath(resp, function (path) {
            console.log(window.origin);
            console.log(path);
            window.location.assign(window.origin + path);
        })
    });
}

function getPrincipal(jwtToken, onSuccess) {
    let url = getUrl("/api/user/") + jwtToken.username;
    console.log("===== getPrincipal =====");
    console.log("url=" + url);
    console.log("jwtToken=" + JSON.stringify(jwtToken));
    $.ajax({
        url: url,
        success: onSuccess,
        headers: {
            "Authorization": "Bearer " + jwtToken.token
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

function ajaxGetUserPath(user, onSuccess) {
    console.log(user);
    jQuery.ajax({
        method: "POST",
        contentType: "application/json",
        url: "/localApi/userPath",
        data: JSON.stringify(user),
        success: onSuccess,
    })
}
