package com.islem.gof.dto;

import lombok.Data;

import java.util.List;

@Data
public class ProduitDTO {
    private Long id;
    private String nom;
    private String type;
    private int stock;
    private String fournisseur;
    private List<LigneMatPremDTO> matieresPremieres; // si utilisé
}
