package com.hardwear.service.categoryservice.impl;

import com.hardwear.model.Category;
import com.hardwear.repository.CategoryRepository;
import com.hardwear.service.categoryservice.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> listAll() {
        return categoryRepository.findAll();
    }

    @Override
    public Optional<Category> getById(Integer id) {
        return categoryRepository.findById(id);
    }

    @Override
    public Category saveOrUpdate(Category domainObject) {
        return categoryRepository.save(domainObject);
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        categoryRepository.deleteById(id);
    }
}
