package com.hardwear.service.confirmationtokenservive.impl;

import com.hardwear.exception.EntityNotFoundException;
import com.hardwear.model.ConfirmationToken;
import com.hardwear.repository.ConfirmationTokenRepository;
import com.hardwear.service.confirmationtokenservive.ConfirmationTokenService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ConfirmationTokenImpl implements ConfirmationTokenService {

    private final ConfirmationTokenRepository confirmationTokenRepository;

    public void saveConfirmationToken(ConfirmationToken token) {
        confirmationTokenRepository.save(token);
    }

    public Optional<ConfirmationToken> getToken(String token) {
        return confirmationTokenRepository.findByToken(token);
    }

    public int setConfirmedAt(String token) {
        return confirmationTokenRepository.updateConfirmedAt(token, LocalDateTime.now());
    }

    public void delete(Integer id) throws EntityNotFoundException {
        confirmationTokenRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Token with id " + id + " not found"));

        confirmationTokenRepository.deleteById(id);
    }
}
