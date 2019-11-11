package eurusov.jwt_client.dto;

import lombok.*;

@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@Setter
@NoArgsConstructor
public class AuthorityDto {
    @EqualsAndHashCode.Include
    private Integer id;

    private String authority;

    private Integer sortOrder;
}
