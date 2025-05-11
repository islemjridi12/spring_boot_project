package com.islem.gof.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum EtatMachine {
    DISPONIBLE,
    EN_MAINTENANCE,
    EN_REPOS;

    @JsonCreator
    public static EtatMachine fromString(String value) {
        return EtatMachine.valueOf(value.toUpperCase());
    }

    @JsonValue
    public String toValue() {
        return this.name();
    }
}

