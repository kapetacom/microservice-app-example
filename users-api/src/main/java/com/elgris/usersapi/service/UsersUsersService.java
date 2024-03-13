package com.elgris.usersapi.service;

import com.elgris.usersapi.dto.LoginRequestDTO;
import com.elgris.usersapi.dto.LoginResponseDTO;
import com.elgris.usersapi.dto.UserDTO;
import com.elgris.usersapi.dto.UserRole;
import com.elgris.usersapi.models.User;
import com.elgris.usersapi.repository.UserRepository;
import com.kapeta.spring.security.JWTSecurityContext;
import com.kapeta.spring.security.provider.JWTCreatorService;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Service
public class UsersUsersService implements IUsersUsersService {

    private final UserRepository userRepository;

    private final JWTSecurityContext jwtSecurityContext;

    private final JWTCreatorService jwtCreatorService;

    public UsersUsersService(UserRepository userRepository, JWTSecurityContext jwtSecurityContext, JWTCreatorService jwtCreatorService) {
        this.userRepository = userRepository;
        this.jwtSecurityContext = jwtSecurityContext;
        this.jwtCreatorService = jwtCreatorService;
    }

    @PreAuthorize("isFullyAuthenticated()")
    @Override
    public List<UserDTO> getUsers() {
        List<UserDTO> response = new LinkedList<>();
        userRepository.findAll().forEach(db -> {
            UserDTO user = toPublicDTO(db);
            response.add(user);
        });

        return response;
    }

    @PreAuthorize("isFullyAuthenticated()")
    @Override
    public UserDTO getUser(String username) {
        if (!jwtSecurityContext.get().getSubject().equals(username)) {
            throw new AccessDeniedException("You are not allowed to access this user");
        }
        var user = userRepository.findOneByUsername(username);
        if (user == null) {
            return null;
        }
        return toPublicDTO(user);
    }

    @Override
    public LoginResponseDTO login(LoginRequestDTO request) throws Exception {
        var user = userRepository.findOneByUsername(request.getUsername());
        if (user == null) {
            throw new AccessDeniedException("User not found");
        }
        var token = jwtCreatorService.createToken(user.getUsername());
        var out = new LoginResponseDTO();

        out.setAccessToken(token.serialize());

        return out;
    }

    private UserDTO toPublicDTO(User db) {
        UserDTO user = new UserDTO();
        user.setUsername(db.getUsername());
        user.setRole(UserRole.valueOf(db.getRole().toString().toUpperCase()));
        return user;
    }

}
