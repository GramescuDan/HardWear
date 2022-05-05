package com.hardwear.controller;

import com.hardwear.exception.EntityNotFoundException;
import com.hardwear.model.Category;
import com.hardwear.service.categoryservice.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/categories")
    public List<Category> getAllCategories() {
        return categoryService.listAll();
    }

    @GetMapping("/categories/{categoryId}")
    public Category getCategoryById(@PathVariable("categoryId") Integer categoryId) throws EntityNotFoundException {
        Optional<Category> optionalCategory = categoryService.getById(categoryId);
        if (optionalCategory.isPresent()) {
            return optionalCategory.get();
        } else {
            throw new EntityNotFoundException("Category with id " + categoryId + " not found");
        }
    }
}
