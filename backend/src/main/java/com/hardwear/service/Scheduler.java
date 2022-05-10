package com.hardwear.service;

import com.hardwear.controller.ItemController;
import com.hardwear.model.Item;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@EnableScheduling
public class Scheduler {

    @Autowired
    ItemController itemController;

    //    @Scheduled(cron = "0 * * ? * *") //every minute
    public void testFilter() {
        String category1 = "category1";
        String category2 = "category2";
//        String category3 = "category3";

        List<String> categories = new ArrayList<>();
        categories.add(category1);
        categories.add(category2);
//        categories.add(category3);

        List<Item> itemList = itemController.getItemByCategory(categories);
        System.out.println("");
    }
}
