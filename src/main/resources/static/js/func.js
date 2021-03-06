export function fillPrincipalTable(user) {
    let table = $('#principalTable');
    parseAuthToRoles(user);
    table.find('#loggedUserId').text(user.id);
    table.find('#loggedUsername').text(user.username);
    table.find('#loggedUserFirstName').text(user.firstName);
    table.find('#loggedUserLastName').text(user.lastName);
    table.find('#loggedUserEmail').text(user.email);
    table.find('#loggedUserRole').text(user.roles);
}

export function parseAuthToRoles(user) {
    let roles = [];
    for (let i = 0, len = user.authorities.length; i < len; i++) {
        roles[i] = roleFromAuthority(user.authorities[i]);
    }
    user.roles = roles.join(', ');
}

export function roleFromAuthority(authority) {
    return authority.authority.replace(/^ROLE_/, '');
}

export function getUrl(url){
    return "http://localhost:8075" + url;
}
