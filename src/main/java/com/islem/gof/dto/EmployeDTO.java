package com.islem.gof.dto;

import lombok.Data;

@Data
public class EmployeDTO {
    private Long id;
    private String nom;
    private String poste;
    private Long machineAssigneeId;
    private MachineDTO machineAssignee;
}
