package com.hardwear.exception;

import org.springframework.security.core.AuthenticationException;

public class BadCredentialsException extends AuthenticationException {

    public BadCredentialsException(String msg, Throwable t) {
        super(msg, t);
    }

    public BadCredentialsException(String msg) {
        super(msg);
    }

}
