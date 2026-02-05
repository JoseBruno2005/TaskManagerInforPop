package com.inforpop.taskmanager.exceptions;

public class InvalidStatusException extends RuntimeException {
    public InvalidStatusException(String message) {
        super(message);
    }
}
