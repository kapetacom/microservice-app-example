/**
 * GENERATED SOURCE - DO NOT EDIT
 */
package com.elgris.usersapi.rest;

import com.elgris.usersapi.dto.LoginRequestDTO;
import com.elgris.usersapi.dto.LoginResponseDTO;
import com.elgris.usersapi.dto.UserDTO;
import com.elgris.usersapi.service.IUsersUsersService;
import com.kapeta.spring.annotation.*;
import jakarta.validation.Valid;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Description;
import org.springframework.web.bind.annotation.*;

@RestController
@KapetaController("users")
@RequestMapping("/users")
public class UsersUsersController {

    private final IUsersUsersService service;

    public UsersUsersController(IUsersUsersService service) {
        this.service = service;
    }

    @ResponseBody
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public List<UserDTO> getUsers() throws Exception {
        return service.getUsers();
    }

    @ResponseBody
    @RequestMapping(value = "/{username}", method = RequestMethod.GET)
    public UserDTO getUser(@PathVariable String username) throws Exception {
        return service.getUser(username);
    }

    @ResponseBody
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public LoginResponseDTO login(@Valid @RequestBody LoginRequestDTO request)
        throws Exception {
        return service.login(request);
    }
}
