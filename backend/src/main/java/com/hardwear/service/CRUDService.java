package com.hardwear.service;

import com.hardwear.exception.DatabaseException;

import java.util.List;
import java.util.Optional;

public interface CRUDService<T> {

    List<T> listAll();

    /**
     * Finds entity by ID
     *
     * @param id - unique object's ID
     * @return Optional<T>
     */
    Optional<T> getById(Integer id);

    /**
     * Saves or updated an entity
     *
     * @param domainObject to be saved
     * @return T
     * @throws DatabaseException
     */
    T saveOrUpdate(T domainObject) throws DatabaseException;

    void delete(Integer id) throws DatabaseException;
}
