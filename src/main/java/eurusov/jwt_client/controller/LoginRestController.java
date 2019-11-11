package eurusov.jwt_client.controller;

import eurusov.jwt_client.dto.AuthorityDto;
import eurusov.jwt_client.dto.UserDto;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Comparator;

@RestController
@RequestMapping("/localApi")
public class LoginRestController {

    @PostMapping("/userPath")
    String getUserPath(@RequestBody UserDto userDto) {
        String majorRole = userDto.getAuthorities().stream()
                .min(Comparator.comparing(AuthorityDto::getSortOrder))
                .map(AuthorityDto::getAuthority)
                .orElse("EMPTY");
        if (majorRole.equals("ROLE_ADMIN")) {
            return "/admin";
        }
        return "/user";
    }
}
