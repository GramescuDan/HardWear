package com.hardwear.service.itemservice.impl;

import com.hardwear.model.Item;
import com.hardwear.repository.ItemRepository;
import com.hardwear.service.itemservice.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class ItemServiceImpl implements ItemService {

    @Autowired
    private ItemRepository itemRepository;

    @Override
    public List<Item> listAll() {
        return itemRepository.findAll();
    }

    @Override
    public Optional<Item> getById(Integer id) {
        return itemRepository.findById(id);
    }

    @Override
    public Item saveOrUpdate(Item domainObject) {
        return itemRepository.save(domainObject);
    }

    @Override
    @Transactional
    public void delete(Integer id) {
        itemRepository.deleteById(id);
    }
}
