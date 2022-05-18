package com.hardwear.controller;

import com.hardwear.exception.DatabaseException;
import com.hardwear.exception.EntityNotFoundException;
import com.hardwear.model.Role;
import com.hardwear.model.User;
import com.hardwear.service.roleservice.RoleService;
import com.hardwear.service.userservice.UserService;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.listAll();
    }

    @GetMapping("/users/{userId}")
    public User getUserById(@PathVariable("userId") Integer userId) throws EntityNotFoundException {
        Optional<User> optionalUser = userService.getById(userId);
        if (optionalUser.isPresent()) {
            return optionalUser.get();
        } else {
            throw new EntityNotFoundException("User with id " + userId + " not found");
        }
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) throws DatabaseException {
//        if (user.getId() != null) {
//            Optional<User> optionalUser = userService.getById(user.getId());
//            if (optionalUser.isPresent()) {
//                throw new DuplicateEntityException("User with id " + user.getId() + " already exists");
//            }
//            throw new ControllerException("User id should be null");
//        }
//      TODO: check if email and username are unique
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        Set<Role> roles = new HashSet<>();
        Optional<Role> optionalRole = roleService.findByName("CLIENT");

        optionalRole.ifPresent(roles::add);

        user.setRoles(roles);

        User savedUser = this.userService.saveOrUpdate(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

//    @PostMapping("/users/login")
//    public ResponseEntity<?> authenticateUser(@RequestBody @NotNull String username,
//                                              @RequestBody @NotNull String password) {
//        Optional<User> optionalUser = userService.findByUsername(username);
//
//        if (optionalUser.isPresent()) {
//            if (passwordEncoder.matches(password, optionalUser.get().getPassword())) {   //verify if the plain text password match the encoded password from DB
//                return ResponseEntity.ok(optionalUser.get());
//            }
//            throw new BadCredentialsException("password not found");
//        }
//        throw new UsernameNotFoundException("username not found");
//    }

    @PostMapping("/users/login")
    public ResponseEntity<?> authenticateUser(@RequestBody @NotNull User user) {
        Optional<User> optionalUser = userService.findByUsername(user.getUsername());

        if (optionalUser.isPresent()) {
            if (passwordEncoder.matches(user.getPassword(), optionalUser.get().getPassword())) {   //verify if the plain text password match the encoded password from DB
                return ResponseEntity.ok(optionalUser.get());
            }
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Password not found");
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Username not found");
    }

    @PutMapping("/users/{userId}")
    public User updateUser(@PathVariable Integer userId,
                           @RequestBody User user) throws DatabaseException {

        Optional<User> optionalUser = this.userService.getById(userId);
        if (optionalUser.isPresent()) {
            return this.userService.saveOrUpdate(user);
        }

        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User with id " + userId + " not found");
    }

    @DeleteMapping("/users/{userId}")
    public void deleteUserById(@PathVariable("userId") Integer userId) throws DatabaseException {
        Optional<User> optionalUser = this.userService.getById(userId);
        if (optionalUser.isPresent()) {
            userService.delete(userId);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User with id " + userId + " not found");
        }
    }
}
