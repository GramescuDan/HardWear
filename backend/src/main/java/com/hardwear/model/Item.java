package com.hardwear.model;

import lombok.*;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Table(name = "item")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Item {

    @Id
    @Column(name = "id", updatable = false, columnDefinition = "INTEGER")
    @GeneratedValue(strategy = IDENTITY)
    @SequenceGenerator(name = "item_sequence", sequenceName = "item_sequence", allocationSize = 1)
    private Integer id;

    @Column(name = "thumbnail", nullable = false, columnDefinition = "TEXT")
    private String thumbnail;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "name", nullable = false, columnDefinition = "TEXT")
    private String name;

    @Column(name = "price", columnDefinition = "INTEGER")
    private Integer price;

    @Column(name = "quantity", columnDefinition = "INTEGER")
    private Integer quantity;

    @ElementCollection
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<String> categories;
}
