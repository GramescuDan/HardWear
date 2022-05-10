package com.hardwear.controller;

import com.hardwear.exception.ControllerException;
import com.hardwear.exception.DatabaseException;
import com.hardwear.exception.DuplicateEntityException;
import com.hardwear.exception.EntityNotFoundException;
import com.hardwear.model.Item;
import com.hardwear.service.itemservice.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/items")
    public List<Item> getAllItems() {
        return itemService.listAll();
    }

    @GetMapping("/items/{itemId}")
    public Item getItemById(@PathVariable("itemId") Integer itemId) throws EntityNotFoundException {
        Optional<Item> optionalItem = itemService.getById(itemId);
        if (optionalItem.isPresent()) {
            return optionalItem.get();
        } else {
            throw new EntityNotFoundException("Item with id " + itemId + " not found");
        }
    }

    @GetMapping("/items/byCategories")
    public List<Item> getItemsByCategories(@RequestBody List<String> categories) {
        return itemService.getByCategories(categories);
    }

    @PostMapping("/items")
    public ResponseEntity<Item> createItem(@RequestBody Item item) throws DatabaseException, ControllerException {
        if (item.getId() != null) {
            Optional<Item> optionalItem = itemService.getById(item.getId());
            if (optionalItem.isPresent()) {
                throw new DuplicateEntityException("Item with id " + item.getId() + " already exists");
            }
            throw new ControllerException("Item id should be null");
        }

        Item savedItem = this.itemService.saveOrUpdate(item);
        return new ResponseEntity<>(savedItem, HttpStatus.CREATED);
    }

    @PutMapping("/items/{itemId}")
    public Item updateItem(@PathVariable Integer itemId,
                           @RequestBody Item item) throws DatabaseException {
        if (itemId.equals(item.getId())) {
            Optional<Item> optionalItem = this.itemService.getById(itemId);
            if (optionalItem.isPresent()) {
                return this.itemService.saveOrUpdate(item);
            }
        }
        throw new EntityNotFoundException("Item with id " + itemId + " not found");
    }

    @DeleteMapping("/items/{itemId}")
    public void deleteItemById(@PathVariable("itemId") Integer itemId) throws DatabaseException {
        Optional<Item> optionalItem = this.itemService.getById(itemId);
        if (optionalItem.isPresent()) {
            itemService.delete(itemId);
        } else {
            throw new EntityNotFoundException("Item with id " + itemId + " not found");
        }
    }
}
