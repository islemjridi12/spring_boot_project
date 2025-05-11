package com.islem.gof.model;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.util.List;

@Entity
@Data

public class Produit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le nom est obligatoire")
    private String nom;

    @NotBlank(message = "Le type est obligatoire")
    private String type;

    @Min(value = 0, message = "Le stock ne peut pas être négatif")
    private int stock;

    @NotBlank(message = "Le fournisseur est obligatoire")
    private String fournisseur;

    @OneToMany(mappedBy = "produitFinal", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<LigneMatPrem> matieresPremieres;

}
