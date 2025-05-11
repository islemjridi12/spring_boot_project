package com.islem.gof.controller;

import com.islem.gof.dto.EmployeDTO;
import com.islem.gof.service.EmployeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employes")
@CrossOrigin("*")
@RequiredArgsConstructor
public class EmployeController {

    private final EmployeService employeService;

    /**
     * Obtenir tous les employés
     */
    @GetMapping
    public List<EmployeDTO> getAll() {
        return employeService.getAll();
    }

    /**
     * Créer un employé
     */
    @PostMapping
    public ResponseEntity<EmployeDTO> create(@RequestBody EmployeDTO dto) {
        return ResponseEntity.ok(employeService.create(dto));
    }

    /**
     * Modifier un employé
     */
    @PutMapping("/{id}")
    public ResponseEntity<EmployeDTO> update(@PathVariable Long id,  @RequestBody EmployeDTO dto) {
        return ResponseEntity.ok(employeService.update(id, dto));
    }

    /**
     * Supprimer un employé
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        employeService.delete(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Affecter une machine à un employé
     */
    @PutMapping("/assign/{employeId}/{machineId}")
    public ResponseEntity<EmployeDTO> assignMachine(
            @PathVariable Long employeId,
            @PathVariable Long machineId) {
        return ResponseEntity.ok(employeService.assignMachine(employeId, machineId));
    }
}
