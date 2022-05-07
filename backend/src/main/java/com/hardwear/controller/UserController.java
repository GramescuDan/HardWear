package com.hardwear.controller;

import com.hardwear.exception.*;
import com.hardwear.model.User;
import com.hardwear.service.userservice.UserService;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

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
    public ResponseEntity<User> createUser(@RequestBody User user) throws DatabaseException, ControllerException {
        if (user.getId() != null) {
            Optional<User> optionalUser = userService.getById(user.getId());
            if (optionalUser.isPresent()) {
                throw new DuplicateEntityException("User with id " + user.getId() + " already exists");
            }
            throw new ControllerException("User id should be null");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
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
    public ResponseEntity<?> authenticateUser(@RequestBody @NotNull User userData) {
        Optional<User> optionalUser = userService.findByUsername(userData.getUsername());

        if (optionalUser.isPresent()) {
            if (passwordEncoder.matches(userData.getPassword(), optionalUser.get().getPassword())) {   //verify if the plain text password match the encoded password from DB
                return ResponseEntity.ok(optionalUser.get());
            }
            throw new BadCredentialsException("password not found");
        }
        throw new UsernameNotFoundException("Username: " + userData.getUsername() + " not found!");
    }

    @PutMapping("/users/{userId}")
    public User updateUser(@PathVariable Integer userId,
                           @RequestBody User user) throws DatabaseException {
        if (userId.equals(user.getId())) {
            Optional<User> optionalUser = this.userService.getById(userId);
            if (optionalUser.isPresent()) {
                return this.userService.saveOrUpdate(user);
            }
        }
        throw new EntityNotFoundException("User with id " + userId + " not found");
    }

    @DeleteMapping("/users/{userId}")
    public void deleteUserById(@PathVariable("userId") Integer userId) throws DatabaseException {
        Optional<User> optionalUser = this.userService.getById(userId);
        if (optionalUser.isPresent()) {
            userService.delete(userId);
        } else {
            throw new EntityNotFoundException("User with id " + userId + " not found");
        }
    }
}
