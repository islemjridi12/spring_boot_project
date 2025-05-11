package com.islem.gof.dto;

import com.islem.gof.model.EtatOrdre;
import lombok.Data;

import java.time.LocalDate;

@Data
public class OrdreFabricationDTO {
    private Long id;
    private String projet;
    private int quantite;
    private LocalDate date;
    private ProduitDTO produit;
    private EtatOrdre etat;
}
