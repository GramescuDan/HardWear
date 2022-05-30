package com.hardwear.controller;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferManagerBuilder;
import com.amazonaws.services.s3.transfer.Upload;
import com.hardwear.exception.DatabaseException;
import com.hardwear.exception.EntityNotFoundException;
import com.hardwear.model.Item;
import com.hardwear.model.User;
import com.hardwear.service.itemservice.ItemService;
import com.hardwear.service.userservice.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ItemController {

    @Autowired
    private ItemService itemService;

    @Autowired
    private UserService userService;

    @GetMapping("/items")
    public List<Item> getAllItems() {
        return itemService.listAll();
    }

    @GetMapping("/items/{itemId}")
    public Item getItemById(@PathVariable("itemId") Integer itemId) {
        Optional<Item> optionalItem = itemService.getById(itemId);
        if (optionalItem.isPresent()) {
            return optionalItem.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found");
        }
    }

    @GetMapping("/items/byCategories")
    public List<Item> getItemsByCategories(@RequestParam List<String> categories) {
        return itemService.getByCategories(categories);
    }

    @GetMapping("/items/byName")
    public Item getItemByName(@RequestParam String name) {
        return itemService.getByName(name);
    }

    @PostMapping(path = "/items", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Item> createItem(@RequestPart("item") Item item,
                                           @RequestParam("currentFIle") MultipartFile currentFile)
            throws DatabaseException {
        if (item.getId() != null) {
            Optional<Item> optionalItem = itemService.getById(item.getId());
            if (optionalItem.isPresent()) {
                throw new ResponseStatusException(HttpStatus.ALREADY_REPORTED, "Item already exists");
            }
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Item id should be null");
        }

        String bucketName = "hardwear-pad-jmk";

        if (currentFile != null) {
            String photoUrl = uploadPhotoAsUrl(currentFile, bucketName, item);
            item.setThumbnail(photoUrl);
        }

        Item savedItem = this.itemService.saveOrUpdate(item);
        return new ResponseEntity<>(savedItem, HttpStatus.CREATED);
    }

    @PostMapping("/items/saveFavourite/{userId}/{itemId}")
    public ResponseEntity<User> saveItemAsFavourite(@PathVariable Integer userId,
                                                    @PathVariable Integer itemId) throws DatabaseException {

        Optional<User> optionalUser = this.userService.getById(userId);
        Optional<Item> optionalItem = this.itemService.getById(itemId);
        if (optionalUser.isPresent()) {
            List<Item> favouriteItemList = optionalUser.get().getFavouriteItems();
            if (optionalItem.isPresent()) {
                favouriteItemList.add(optionalItem.get());
                optionalUser.get().setFavouriteItems(favouriteItemList);
                User savedUser = this.userService.saveOrUpdate(optionalUser.get());
                return new ResponseEntity<>(savedUser, HttpStatus.OK);
            }
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found");
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
    }

    @PostMapping("/items/removeFavourite/{userId}/{itemId}")
    public ResponseEntity<User> removeFavouriteItem(@PathVariable Integer userId,
                                                    @PathVariable Integer itemId) throws DatabaseException {

        Optional<User> optionalUser = this.userService.getById(userId);
        Optional<Item> optionalItem = this.itemService.getById(itemId);
        if (optionalUser.isPresent()) {
            List<Item> favouriteItemList = optionalUser.get().getFavouriteItems();
            if (optionalItem.isPresent()) {
                favouriteItemList.remove(optionalItem.get());
                optionalUser.get().setFavouriteItems(favouriteItemList);
                User savedUser = this.userService.saveOrUpdate(optionalUser.get());
                return new ResponseEntity<>(savedUser, HttpStatus.OK);
            }
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Not Found");
    }

//    @PostMapping(value = "/items/uploadPhoto")
//    public void uploadItemPhoto(@RequestPart("item") Item item,
//                                @RequestParam("currentFile") MultipartFile currentFile) throws DatabaseException {
//        String bucketName = "hardwear-pad-jmk";
//
//        String photoUrl = uploadPhotoAsUrl(currentFile, bucketName, item);
//        item.setThumbnail(photoUrl);
//
//        itemService.saveOrUpdate(item);
//    }

    @PutMapping("/items/{itemId}")
    public Item updateItem(@PathVariable Integer itemId,
                           @RequestBody Item item) throws DatabaseException {
        if (itemId.equals(item.getId())) {
            Optional<Item> optionalItem = this.itemService.getById(itemId);
            if (optionalItem.isPresent()) {
                return this.itemService.saveOrUpdate(item);
            }
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found");
    }

    @DeleteMapping("/items/{itemId}")
    public void deleteItemById(@PathVariable("itemId") Integer itemId) throws DatabaseException {
        Optional<Item> optionalItem = this.itemService.getById(itemId);
        if (optionalItem.isPresent()) {
            itemService.delete(itemId);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Item not found");
        }
    }

    public String uploadPhotoAsUrl(MultipartFile storedPhoto, String bucketName, Item item) {

        File photo;

        try {
            photo = convertMultiPartToFile(storedPhoto);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Unable to convert input stream to file");
        }

        AmazonS3 s3client = AmazonS3ClientBuilder.standard().withRegion("eu-central-1").build();
        TransferManager xfer_mgr = TransferManagerBuilder.standard().withS3Client(s3client).build();
        String fileName = "Item-Photo-For-" + item.getName() + "-" + new Timestamp(System.currentTimeMillis()) + ".jpg";
        fileName = fileName.replaceAll(" ", "-");
        try {
            Upload xfer = xfer_mgr.upload(new PutObjectRequest(bucketName, fileName, photo)
                    .withCannedAcl(CannedAccessControlList.PublicRead));

            xfer.waitForCompletion();
        } catch (AmazonServiceException | InterruptedException e) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "AWS Error or Upload was interrupted");
        }

        xfer_mgr.shutdownNow();

        return "https://" + bucketName + ".s3.eu-central-1.amazonaws.com/" + fileName;
    }

    public File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = new File("FileName");
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }
}
