package com.hardwear.service.itemservice.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.hardwear.exception.DatabaseException;
import com.hardwear.model.Item;
import com.hardwear.repository.ItemRepository;
import com.hardwear.service.itemservice.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.*;

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
    public Item getByName(String name) {
        return itemRepository.findByName(name);
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
    public void delete(Integer id) throws DatabaseException {

        Optional<Item> optionalItem = getById(id);

        if(optionalItem.isPresent()) {

            String bucketName = "hardwear-pad-jmk";

            String filename = optionalItem.get().getThumbnail().replaceAll("https://" + bucketName + ".s3.eu-central-1.amazonaws.com/", "");

            AmazonS3 s3client = AmazonS3ClientBuilder.standard().withRegion("eu-central-1").build();
            s3client.deleteObject(bucketName, filename);

            itemRepository.deleteById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found");
        }
    }
}
