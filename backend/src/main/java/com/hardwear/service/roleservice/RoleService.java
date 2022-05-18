package com.hardwear.service.roleservice;

import com.hardwear.model.Role;
import com.hardwear.service.CRUDService;

import java.util.Optional;

public interface RoleService extends CRUDService<Role> {

    Optional<Role> findByName(String name);


}
