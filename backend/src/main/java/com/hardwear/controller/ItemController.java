package com.hardwear.controller;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.TransferManagerBuilder;
import com.amazonaws.services.s3.transfer.Upload;
import com.hardwear.exception.ControllerException;
import com.hardwear.exception.DatabaseException;
import com.hardwear.exception.DuplicateEntityException;
import com.hardwear.exception.EntityNotFoundException;
import com.hardwear.model.Item;
import com.hardwear.service.itemservice.ItemService;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
public class ItemController {

    @Autowired
    private ItemService itemService;

    @GetMapping("/items")
    public List<Item> getAllItems() {
        return itemService.listAll();
    }

    @GetMapping("/items/{itemId}")
    public Item getItemById(@PathVariable("itemId") Integer itemId) throws EntityNotFoundException {
        Optional<Item> optionalItem = itemService.getById(itemId);
        if (optionalItem.isPresent()) {
            return optionalItem.get();
        } else {
            throw new EntityNotFoundException("Item with id " + itemId + " not found");
        }
    }

    @GetMapping("/items/byCategories")
    public List<Item> getItemsByCategories(@RequestParam List<String> categories) {
        return itemService.getByCategories(categories);
    }

    @PostMapping("/items")
    public ResponseEntity<Item> createItem(@RequestBody Item item,
                                           @RequestParam("currentFile") MultipartFile currentFile)
            throws DatabaseException, ControllerException {
        if (item.getId() != null) {
            Optional<Item> optionalItem = itemService.getById(item.getId());
            if (optionalItem.isPresent()) {
                throw new DuplicateEntityException("Item with id " + item.getId() + " already exists");
            }
            throw new ControllerException("Item id should be null");
        }

        String bucketName = "hardwear-pad-jmk";

        String photoUrl = uploadPhotoAsUrl(currentFile, bucketName, item);
        item.setThumbnail(photoUrl);

        Item savedItem = this.itemService.saveOrUpdate(item);
        return new ResponseEntity<>(savedItem, HttpStatus.CREATED);
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
        throw new EntityNotFoundException("Item with id " + itemId + " not found");
    }

    @DeleteMapping("/items/{itemId}")
    public void deleteItemById(@PathVariable("itemId") Integer itemId) throws DatabaseException {
        Optional<Item> optionalItem = this.itemService.getById(itemId);
        if (optionalItem.isPresent()) {
            itemService.delete(itemId);
        } else {
            throw new EntityNotFoundException("Item with id " + itemId + " not found");
        }
    }

    public String uploadPhotoAsUrl(MultipartFile photo, String bucketName, Item item) {
        File storedPhoto;

        try {
            storedPhoto = convertMultiPartToFile(photo);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.UNPROCESSABLE_ENTITY, "Unable to convert input stream to file");
        }

        AmazonS3 s3client = AmazonS3ClientBuilder.standard().withRegion("eu-central-1").build();
        TransferManager xfer_mgr = TransferManagerBuilder.standard().withS3Client(s3client).build();
        String fileName = "Item-Photo-For-" + item.getName() + "-" + new Timestamp(System.currentTimeMillis());
        fileName = fileName.replaceAll(" ", "-");
        try {
            Upload xfer = xfer_mgr.upload(new PutObjectRequest(bucketName, fileName, storedPhoto)
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
