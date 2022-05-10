package com.hardwear.service.itemservice.impl;

import com.hardwear.model.Item;
import com.hardwear.repository.ItemRepository;
import com.hardwear.service.itemservice.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

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
    public List<Item> getByCategories(List<String> categories) {
        Set<String> categorySet = new HashSet<>(categories);
        List<Item> itemList = new ArrayList<>(itemRepository.findDistinctByCategoriesIn(categorySet));
        //return itemList = itemList.stream().filter(distinctByKey(Item::getName)).collect(Collectors.toList());
        for (String category: categories){
            itemList.removeIf(item -> !item.getCategories().contains(category));
        }
        return itemList;
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

    public static <T> Predicate<T> distinctByKey(Function<? super T, ?> keyExtractor) {
        Set<Object> seen = ConcurrentHashMap.newKeySet();
        return t -> seen.add(keyExtractor.apply(t));
    }
}
