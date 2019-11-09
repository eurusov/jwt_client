package eurusov.jwt_client.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
public class UserDto {
    private Long id;

    @EqualsAndHashCode.Include
    private String username;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private String firstName;

    private String lastName;

    private String email;

    private Set<AuthorityDto> authorities = new HashSet<>();

    private String token;

    private String role;
}
