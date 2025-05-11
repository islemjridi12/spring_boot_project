package com.islem.gof.service;

import com.islem.gof.dto.OrdreFabricationDTO;
import com.islem.gof.dto.ProduitDTO;
import com.islem.gof.model.Produit;
import com.islem.gof.repository.OrdreFabricationRepository;
import com.islem.gof.repository.ProduitRepository;
import com.islem.gof.Mapper.ObjectMapperUtils;
import com.islem.gof.model.LigneMatPrem;
import com.islem.gof.model.OrdreFabrication;
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

        if (produit.getMatieresPremieres() != null) {
            for (LigneMatPrem ligne : produit.getMatieresPremieres()) {
                ligne.setProduitFinal(produit);
            }
        }

        Produit saved = produitRepository.save(produit);
        return ObjectMapperUtils.map(saved, ProduitDTO.class);
    }

    public ProduitDTO update(Long id, ProduitDTO dto) {
        Produit existing = produitRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Produit non trouvé"));

        existing.setNom(dto.getNom());
        existing.setType(dto.getType());
        existing.setStock(dto.getStock());
        existing.setFournisseur(dto.getFournisseur());

        existing.getMatieresPremieres().clear();
        if (dto.getMatieresPremieres() != null) {
            List<LigneMatPrem> nouvelles = dto.getMatieresPremieres().stream()
                    .map(l -> ObjectMapperUtils.map(l, LigneMatPrem.class))
                    .peek(l -> l.setProduitFinal(existing))
                    .collect(Collectors.toList());
            existing.getMatieresPremieres().addAll(nouvelles);
        }

        return ObjectMapperUtils.map(produitRepository.save(existing), ProduitDTO.class);
    }

    public void delete(Long id) {
        produitRepository.deleteById(id);
    }

    // Méthode complémentaire pour corriger la gestion de l'ordre de fabrication
    public OrdreFabricationDTO mapOrdreFabrication(OrdreFabrication ordre) {
        OrdreFabricationDTO dto = ObjectMapperUtils.map(ordre, OrdreFabricationDTO.class);
        dto.setProduit(ObjectMapperUtils.map(ordre.getProduit(), ProduitDTO.class));
        return dto;
    }
}
