package com.hardwear.service.cartservice.impl;

import com.hardwear.exception.DatabaseException;
import com.hardwear.model.Cart;
import com.hardwear.repository.CartRepository;
import com.hardwear.service.cartservice.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Override
    public List<Cart> listAll() {
        return cartRepository.findAll();
    }

    @Override
    public Optional<Cart> getById(Integer id) {
        return cartRepository.findById(id);
    }

    @Override
    public Cart saveOrUpdate(Cart domainObject) {
        return cartRepository.save(domainObject);
    }

    @Override
    public void delete(Integer id) throws DatabaseException {
        cartRepository.deleteById(id);
    }
}
