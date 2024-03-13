/**
 * GENERATED SOURCE - DO NOT EDIT
 */
package com.elgris.usersapi.dto;

import com.elgris.usersapi.dto.UserRole;
import jakarta.validation.constraints.NotNull;
import java.util.*;
import lombok.*;

@Data
public class UserBase {

    @NotNull
    private String username;

    @NotNull
    private String firstname;

    @NotNull
    private String lastname;

    @NotNull
    private UserRole role;
}
