package com.islem.gof.service;

import com.islem.gof.Mapper.ObjectMapperUtils;
import com.islem.gof.dto.ProduitDTO;
import com.islem.gof.model.LigneMatPrem;
import com.islem.gof.model.Produit;
import com.islem.gof.repository.OrdreFabricationRepository;
import com.islem.gof.repository.ProduitRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProduitService {

    private final ProduitRepository produitRepository;
    private final OrdreFabricationRepository ordreFabricationRepository;

    public List<ProduitDTO> getAll() {
        return ObjectMapperUtils.mapAll(produitRepository.findAll(), ProduitDTO.class);
    }

    public ProduitDTO create(ProduitDTO dto) {
        Produit produit = ObjectMapperUtils.map(dto, Produit.class);
        Produit saved = produitRepository.save(produit);
        return ObjectMapperUtils.map(saved, ProduitDTO.class);
    }

    public ProduitDTO update(Long id, ProduitDTO dto) {
        Produit existing = produitRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Produit non trouvé"));

        // Mise à jour des champs simples
        existing.setNom(dto.getNom());
        existing.setType(dto.getType());
        existing.setStock(dto.getStock());
        existing.setFournisseur(dto.getFournisseur());

        // Mise à jour des matières premières
        existing.getMatieresPremieres().clear();

        if (dto.getMatieresPremieres() != null) {
            List<LigneMatPrem> nouvelles = dto.getMatieresPremieres().stream()
                    .map(l -> {
                        LigneMatPrem ligne = ObjectMapperUtils.map(l, LigneMatPrem.class);
                        ligne.setProduit(ligne.getProduit()); // très important pour la cohérence JPA
                        return ligne;
                    })
                    .collect(Collectors.toList());

            existing.getMatieresPremieres().addAll(nouvelles);
        }

        Produit saved = produitRepository.save(existing);
        return ObjectMapperUtils.map(saved, ProduitDTO.class);
    }
    public void delete(Long id) {
        produitRepository.deleteById(id);
    }

}
