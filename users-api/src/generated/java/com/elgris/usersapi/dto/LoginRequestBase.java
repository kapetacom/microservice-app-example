/**
 * GENERATED SOURCE - DO NOT EDIT
 */
package com.elgris.usersapi.dto;

import jakarta.validation.constraints.NotNull;
import java.util.*;
import lombok.*;

@Data
public class LoginRequestBase {

    @NotNull
    private String username;

    @NotNull
    private String password;
}
