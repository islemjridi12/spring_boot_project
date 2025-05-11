package com.islem.gof.controller;

import com.islem.gof.dto.MachineDTO;
import com.islem.gof.model.EtatMachine;
import com.islem.gof.service.MachineService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/machines")
@CrossOrigin("*")
public class MachineController {

    @Autowired
    private MachineService service;

    @GetMapping
    public List<MachineDTO> getAll() {
        return service.getAll();
    }

    @PostMapping
    public ResponseEntity<MachineDTO> create(@Valid @RequestBody MachineDTO dto) {
        return new ResponseEntity<>(service.create(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MachineDTO> update(@PathVariable Long id, @Valid @RequestBody MachineDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/etat/{etat}")
    public List<MachineDTO> findByEtat(@PathVariable EtatMachine etat) {
        return service.findByEtat(etat);
    }

    @GetMapping("/disponibles")
    public List<MachineDTO> getDisponibles() {
        return service.getMachinesDisponibles();
    }

}
