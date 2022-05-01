package com.hardwear.model;

import lombok.*;

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

    @ElementCollection
    private List<String> images;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "short_description", nullable = false, columnDefinition = "TEXT")
    private String shortDescription;

    @Column(name = "name", nullable = false, columnDefinition = "TEXT")
    private String name;

    @Column(name = "price", updatable = false, columnDefinition = "INTEGER")
    private Integer price;

    @Column(name = "quantity", updatable = false, columnDefinition = "INTEGER")
    private Integer quantity;

    @ManyToMany(cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    @JoinTable(name = "item_categories",
            joinColumns = @JoinColumn(name = "item_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<Category> categories;
}
