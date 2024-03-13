package com.elgris.usersapi.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @Column
    private String username;

    @Column
    private String firstname;

    @Column
    private String lastname;

    @Column
    private UserRole role;

}
