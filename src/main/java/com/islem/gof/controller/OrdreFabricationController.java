package com.islem.gof.controller;

import com.islem.gof.dto.OrdreFabricationDTO;
import com.islem.gof.service.OrdreFabricationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ordres")
@CrossOrigin("*")
@RequiredArgsConstructor
public class OrdreFabricationController {

    private final OrdreFabricationService service;

    /**
     * Créer un ordre (statut EN_ATTENTE)
     */
    @PostMapping
    public ResponseEntity<OrdreFabricationDTO> create(@Valid @RequestBody OrdreFabricationDTO dto) {
        OrdreFabricationDTO created = service.create(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    /**
     * Lancer la production : passe à EN_PRODUCTION + sortie de stock
     */
    @PutMapping("/{id}/start")
    public ResponseEntity<OrdreFabricationDTO> startProduction(@PathVariable Long id) {
        return ResponseEntity.ok(service.startProduction(id));
    }

    /**
     * Déclarer la production : passe à DECLARE + entrée de stock
     */
    @PutMapping("/{id}/declare")
    public ResponseEntity<OrdreFabricationDTO> declareProduction(@PathVariable Long id) {
        return ResponseEntity.ok(service.declareProduction(id));
    }

    /**
     * Modifier un ordre (sans logique métier)
     */
    @PutMapping("/{id}")
    public ResponseEntity<OrdreFabricationDTO> update(
            @PathVariable Long id,
            @Valid @RequestBody OrdreFabricationDTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    /**
     * Supprimer un ordre
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Lister tous les ordres
     */
    @GetMapping
    public List<OrdreFabricationDTO> getAll() {
        return service.getAll();
    }

    /**
     * Lister les ordres par état
     */
    @GetMapping("/etat/{etat}")
    public List<OrdreFabricationDTO> getByEtat(@PathVariable String etat) {
        return service.findByEtat(etat);
    }
}
