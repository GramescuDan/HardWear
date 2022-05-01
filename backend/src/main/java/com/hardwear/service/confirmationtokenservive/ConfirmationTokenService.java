package com.hardwear.service.confirmationtokenservive;

import com.hardwear.exception.EntityNotFoundException;
import com.hardwear.model.ConfirmationToken;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConfirmationTokenService {

    int setConfirmedAt(String token);

    void saveConfirmationToken(ConfirmationToken token);

    Optional<ConfirmationToken> getToken(String token);

    void delete(Integer id) throws EntityNotFoundException;
}
