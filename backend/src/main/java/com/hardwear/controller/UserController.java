package com.hardwear.controller;

import com.hardwear.exception.ControllerException;
import com.hardwear.exception.DatabaseException;
import com.hardwear.exception.DuplicateEntityException;
import com.hardwear.exception.EntityNotFoundException;
import com.hardwear.model.User;
import com.hardwear.service.userservice.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

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

        User savedUser = this.userService.saveOrUpdate(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
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
