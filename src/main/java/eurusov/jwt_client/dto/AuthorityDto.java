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

    //    @EqualsAndHashCode.Include
    private String authority;

    private Integer sortOrder;

    public AuthorityDto(String authority, Integer sortOrder) {
        this.authority = authority;
        this.sortOrder = sortOrder;
    }
}
