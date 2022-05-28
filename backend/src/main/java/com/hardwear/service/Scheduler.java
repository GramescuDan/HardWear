package com.hardwear.service;

import com.hardwear.controller.ItemController;
import com.hardwear.exception.DatabaseException;
import com.hardwear.model.Cart;
import com.hardwear.model.Item;
import com.hardwear.model.User;
import com.hardwear.service.itemservice.ItemService;
import com.hardwear.service.userservice.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
@EnableScheduling
public class Scheduler {

    @Autowired
    ItemController itemController;

    @Autowired
    ItemService itemService;

    @Autowired
    UserService userService;

    //@Scheduled(cron = "0 * * ? * *") //every minute
    public void testFilter() throws DatabaseException {
        String category1 = "Laptops";
        String category2 = "Mobile Phones";
        String category3 = "Gaming & Office Systems";
        String category4 = "Components";
        String category5 = "Gaming";
        String category6 = "Monitors & Peripheries";
        String category7 = "Tv & Video";
        String category8 = "Networking & UPS";
        String category9 = "Software & Office Supplies";

        Item item1 = new Item();
        item1.setThumbnail("photo1");

        List<String> categories1 = new ArrayList<>();
        categories1.add(category1);
        categories1.add(category4);
        item1.setCategories(categories1);

        item1.setDescription("description1");
        item1.setName("laptop1");
        item1.setPrice(999);
        item1.setQuantity(10);

        Item item2 = new Item();
        item2.setThumbnail("photo2");

        List<String> categories2 = new ArrayList<>();
        categories2.add(category1);
        categories2.add(category2);
        item2.setCategories(categories2);

        item2.setDescription("description2");
        item2.setName("phone2");
        item2.setPrice(699);
        item2.setQuantity(20);

        this.itemService.saveOrUpdate(item1);
        this.itemService.saveOrUpdate(item2);
    }

    //@Scheduled(cron = "0 * * ? * *") //every minute
    public void testCart() throws DatabaseException {
        Optional<User> user = userService.getById(2);
        Cart cart = user.get().getCart();
        Integer id = cart.getId();
        System.out.println("DA");
    }
}
