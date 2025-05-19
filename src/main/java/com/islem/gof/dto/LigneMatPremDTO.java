package com.islem.gof.dto;

import lombok.Data;
@Data
public class LigneMatPremDTO {
    private Long id;
    private int qte;
    private ProduitDTO produit;
}

