package com.hardwear.service.userservice;

import com.hardwear.model.User;
import com.hardwear.service.CRUDService;

import java.util.Optional;

public interface UserService extends CRUDService<User> {

    Optional<User> findByUsername(String username);

}
