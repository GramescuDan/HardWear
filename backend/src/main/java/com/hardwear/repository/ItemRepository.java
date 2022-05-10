package com.hardwear.repository;

import com.hardwear.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface ItemRepository extends JpaRepository<Item, Integer> {

    List<Item> findDistinctByCategoriesIn(Set<String> category);

}
