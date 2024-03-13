package com.elgris.usersapi.service;

import com.elgris.usersapi.dto.LoginRequestDTO;
import com.elgris.usersapi.dto.LoginResponseDTO;
import com.elgris.usersapi.dto.UserDTO;
import java.util.*;

public interface IUsersUsersService {
    List<UserDTO> getUsers() throws Exception;

    UserDTO getUser(String username) throws Exception;

    LoginResponseDTO login(LoginRequestDTO request) throws Exception;
}
