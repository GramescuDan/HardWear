package com.hardwear.exception;

public class UsernameAlreadyExistsException extends Exception {

    public UsernameAlreadyExistsException() {
        super();
    }

    public UsernameAlreadyExistsException(String s) {
        super(s);
    }

    public UsernameAlreadyExistsException(String s, Throwable throwable) {
        super(s, throwable);
    }

    public UsernameAlreadyExistsException(Throwable throwable) {
        super(throwable);
    }
}
