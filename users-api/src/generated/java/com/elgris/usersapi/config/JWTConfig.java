/**
 * GENERATED SOURCE - DO NOT EDIT
 */
package com.elgris.usersapi.config;

import jakarta.validation.constraints.NotNull;
import java.util.*;
import lombok.*;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties("jwt")
@Data
public class JWTConfig {

    @NotNull
    private String secret;
}
