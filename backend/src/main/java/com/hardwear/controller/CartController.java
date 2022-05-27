package com.hardwear.controller;

import com.hardwear.exception.DatabaseException;
import com.hardwear.model.Cart;
import com.hardwear.model.Item;
import com.hardwear.service.cartservice.CartService;
import com.hardwear.service.itemservice.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private ItemService itemService;

    @PutMapping("/carts/{cartId}")
    public Cart updateCart(@PathVariable Integer cartId,
                           @RequestBody Cart cart) throws DatabaseException {
        Optional<Cart> optionalCart = this.cartService.getById(cartId);
        if (optionalCart.isPresent()) {
            return this.cartService.saveOrUpdate(cart);
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cart with id " + cartId + " not found");
    }

    @PostMapping("/carts/addItem/{itemId}/{cartId}")
    public Cart addItemToCart(@PathVariable Integer itemId,
                              @PathVariable Integer cartId) throws DatabaseException {
        Optional<Cart> optionalCart = this.cartService.getById(cartId);
        if (optionalCart.isPresent()) {
            Optional<Item> optionalItem = this.itemService.getById(itemId);
            if (optionalItem.isPresent()) {
                List<Item> itemList = optionalCart.get().getCartItems();
                optionalItem.get().setQuantity(optionalItem.get().getQuantity() - 1);
                this.itemService.saveOrUpdate(optionalItem.get());
                itemList.add(optionalItem.get());
                optionalCart.get().setCartItems(itemList);
                this.cartService.saveOrUpdate(optionalCart.get());
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item with id " + itemId + " not found");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cart with id " + cartId + " not found");
        }

        return optionalCart.get();
    }

    @PostMapping("/carts/removeItem/{itemId}/{cartId}")
    public Cart removeItemFromCart(@PathVariable Integer itemId,
                                   @PathVariable Integer cartId) throws DatabaseException {
        Optional<Cart> optionalCart = this.cartService.getById(cartId);
        if (optionalCart.isPresent()) {
            Optional<Item> optionalItem = this.itemService.getById(itemId);
            if (optionalItem.isPresent()) {
                List<Item> itemList = optionalCart.get().getCartItems();
                if (optionalCart.get().getCartItems().contains(optionalItem.get())) {
                    optionalItem.get().setQuantity(optionalItem.get().getQuantity() + 1);
                    this.itemService.saveOrUpdate(optionalItem.get());
                    itemList.remove(optionalItem.get());
                    optionalCart.get().setCartItems(itemList);
                } else {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item with id " + itemId + " not in cart");
                }
                this.cartService.saveOrUpdate(optionalCart.get());
            } else {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item with id " + itemId + " not found");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cart with id " + cartId + " not found");
        }

        return optionalCart.get();
    }


}
