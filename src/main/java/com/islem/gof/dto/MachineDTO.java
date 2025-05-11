package com.islem.gof.dto;

import com.islem.gof.model.EtatMachine;
import lombok.Data;
import java.time.LocalDate;

@Data
public class MachineDTO {
    private Long id;
    private String nom;
    private EtatMachine etat;
    private LocalDate derniereMaintenance;
}