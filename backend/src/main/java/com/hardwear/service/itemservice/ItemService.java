package com.hardwear.service.itemservice;

import com.hardwear.model.Item;
import com.hardwear.service.CRUDService;

import java.util.List;

public interface ItemService extends CRUDService<Item> {

    List<Item> getByCategories(List<String> categories);

    Item getByName(String name);
}
