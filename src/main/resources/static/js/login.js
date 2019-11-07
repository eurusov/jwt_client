import {getUrl} from "/js/func.js";

$(document).ready(function () {
    // register the function that intercepts a 'login' form submit event
    let loginForm = $(".form-signin");
    loginForm.on("submit", function (event) {
        console.log(loginForm);
        event.preventDefault();
        let login = {
            username: loginForm.find("input[name='username']").val(),
            password: loginForm.find("input[name='password']").val()
        };
        ajaxDoLogin(login, function (response) {
            console.log(response);
            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: "/admin",
                data: JSON.stringify(response),
                // dataType: 'json',
                success: function (successResp) {
                    console.log(successResp);
                    // window.location = successResp;
                }
            });
        });
    });
});

function ajaxDoLogin(login, onSuccess) {
    console.log(login);
    let url = getUrl("/api/login");
    console.log(url);
    $.ajax({
        type: "POST",
        contentType: "application/json",
        url: url,
        data: JSON.stringify(login),
        dataType: 'json',
        success: onSuccess
    });
}
