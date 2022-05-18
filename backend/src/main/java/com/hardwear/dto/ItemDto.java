package com.hardwear.dto;

import com.hardwear.model.Item;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode
public class ItemDto {
    private int id;
    private String thumbnail;
    private String description;
    private String name;
    private Integer price;
    private Integer quantity;
    private List<String> categories;

    public ItemDto(int id, String thumbnail, String description, String name, Integer price, Integer quantity, List<String> categories) {
        this.id = id;
        this.thumbnail = thumbnail;
        this.description = description;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.categories = categories;
    }

    public static Item toEntity(ItemDto itemDto) {
        return new Item(
                itemDto.getId(),
                itemDto.getThumbnail(),
                itemDto.getDescription(),
                itemDto.getName(),
                itemDto.getPrice(),
                itemDto.getQuantity(),
                itemDto.getCategories()
        );
    }

    public static ItemDto toDto(Item item) {
        return new ItemDto(
                item.getId(),
                item.getThumbnail(),
                item.getDescription(),
                item.getName(),
                item.getPrice(),
                item.getQuantity(),
                item.getCategories()
        );
    }
}
