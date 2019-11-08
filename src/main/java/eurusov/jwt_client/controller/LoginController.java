package eurusov.jwt_client.controller;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;

@Controller
public class LoginController {

    @PostMapping("/login")
    ModelAndView doLogin(@RequestParam String username, @RequestParam String token, HttpSession httpSession) {
        httpSession.setAttribute("jwtToken", token);
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.setViewName("admin");
        modelAndView.addObject("jwtToken", token);
        modelAndView.setStatus(HttpStatus.FOUND);
        return modelAndView;
    }
}
