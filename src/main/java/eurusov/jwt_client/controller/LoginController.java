package eurusov.jwt_client.controller;


import eurusov.jwt_client.dto.JwtToken;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
public class LoginController {

    @PostMapping("/admin")
    String getAdminPage(@RequestBody JwtToken jwtToken, HttpSession httpSession) {
        httpSession.setAttribute("jwtToken", jwtToken);
        return "http://localhost:8080/api/admin";
    }
}
