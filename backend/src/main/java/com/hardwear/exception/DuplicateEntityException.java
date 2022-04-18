package com.hardwear.exception;

public class DuplicateEntityException extends ControllerException {

    public DuplicateEntityException() {
        super();
    }

    public DuplicateEntityException(String message, Throwable cause) {
        super(message, cause);
    }

    public DuplicateEntityException(String message) {
        super(message);
    }

    public DuplicateEntityException(Throwable cause) {
        super(cause);
    }

}


