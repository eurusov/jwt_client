package eurusov.jwt_client.dto;

import lombok.Data;

@Data
public class JwtToken {
    private String username;
    private String token;
}
