package eurusov.jwt_client.controller;

import eurusov.jwt_client.dto.JwtToken;
import eurusov.jwt_client.dto.UserDto;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;

@Controller
public class LoginController {

    @PostMapping("/login")
    ModelAndView doLogin(@RequestBody JwtToken jwtToken, @RequestBody UserDto userDto, HttpSession httpSession) {
        httpSession.setAttribute("jwtToken", jwtToken.getToken());
        ModelAndView modelAndView = new ModelAndView("redirect:/api/admin");
        modelAndView.addObject("jwtToken", jwtToken.getToken());
        modelAndView.setStatus(HttpStatus.FOUND);
        return modelAndView;
    }

    @GetMapping("/api/admin")
    String enterAsAdmin() {
        return "admin";
    }
}
