package com.islem.gof.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data

public class LigneMatPrem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int qte;


    @ManyToOne
    @JoinColumn(name = "produit_id")
    @JsonIgnore // ✅ évite la récursion par l'autre produit
    private Produit produit;


}

