package com.islem.gof.service;

import com.islem.gof.Mapper.ObjectMapperUtils;
import com.islem.gof.dto.OrdreFabricationDTO;
import com.islem.gof.model.EtatOrdre;
import com.islem.gof.model.LigneMatPrem;
import com.islem.gof.model.OrdreFabrication;
import com.islem.gof.model.Produit;
import com.islem.gof.repository.OrdreFabricationRepository;
import com.islem.gof.repository.ProduitRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrdreFabricationService {

    private final OrdreFabricationRepository ordreFabricationRepository;
    private final ProduitRepository produitRepository;

    public OrdreFabricationDTO create(OrdreFabricationDTO dto) {
        OrdreFabrication ordre = ObjectMapperUtils.map(dto, OrdreFabrication.class);
        ordre.setEtat(EtatOrdre.EN_ATTENTE);
        OrdreFabrication saved = ordreFabricationRepository.save(ordre);
        return ObjectMapperUtils.map(saved, OrdreFabricationDTO.class);
    }

    public OrdreFabricationDTO startProduction(Long id) {
        OrdreFabrication ordre = ordreFabricationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ordre non trouvé"));

        if (ordre.getEtat() != EtatOrdre.EN_ATTENTE) {
            throw new IllegalStateException("L’ordre doit être en attente pour démarrer la production.");
        }

        Produit produitFinal = ordre.getProduit();

        List<LigneMatPrem> matieres = produitFinal.getMatieresPremieres();

        // ✅ Si le produit a des matières premières
        if (matieres != null && !matieres.isEmpty()) {
            for (LigneMatPrem ligne : matieres) {
                Produit matiere = ligne.getProduit();
                int stockActuel = matiere.getStock();
                int totalARetirer = ligne.getQte() * ordre.getQuantite();

                if (stockActuel < totalARetirer) {
                    throw new IllegalArgumentException(
                            "Stock insuffisant pour la matière : " + matiere.getNom()
                                    + " (disponible: " + stockActuel + ", requis: " + totalARetirer + ")"
                    );
                }
            }

            // ✅ Si tout est suffisant, décrémenter les stocks
            for (LigneMatPrem ligne : matieres) {
                Produit matiere = ligne.getProduit();
                int totalARetirer = ligne.getQte() * ordre.getQuantite();
                matiere.setStock(matiere.getStock() - totalARetirer);
                produitRepository.save(matiere);
            }
        }

        ordre.setEtat(EtatOrdre.EN_PRODUCTION);
        ordreFabricationRepository.save(ordre);
        return ObjectMapperUtils.map(ordre, OrdreFabricationDTO.class);
    }


    public OrdreFabricationDTO declareProduction(Long id) {
        OrdreFabrication ordre = ordreFabricationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ordre non trouvé"));

        if (ordre.getEtat() != EtatOrdre.EN_PRODUCTION) {
            throw new IllegalStateException("La production doit être en cours pour être déclarée.");
        }

        Produit produit = ordre.getProduit();
        produit.setStock(produit.getStock() + ordre.getQuantite());
        produitRepository.save(produit);

        ordre.setEtat(EtatOrdre.DECLARE);
        ordreFabricationRepository.save(ordre);

        return ObjectMapperUtils.map(ordre, OrdreFabricationDTO.class);
    }

    public List<OrdreFabricationDTO> getAll() {
        return ObjectMapperUtils.mapAll(ordreFabricationRepository.findAll(), OrdreFabricationDTO.class);
    }

    public OrdreFabricationDTO update(Long id, OrdreFabricationDTO dto) {
        OrdreFabrication ordre = ordreFabricationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Ordre non trouvé"));

        ordre.setProjet(dto.getProjet());
        ordre.setQuantite(dto.getQuantite());
        ordre.setDate(dto.getDate());

        if (dto.getProduit() != null) {
            Produit produit = produitRepository.findById(dto.getProduit().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Produit non trouvé"));
            ordre.setProduit(produit);
        }

        return ObjectMapperUtils.map(ordreFabricationRepository.save(ordre), OrdreFabricationDTO.class);
    }

    public void delete(Long id) {
        ordreFabricationRepository.deleteById(id);
    }

    public List<OrdreFabricationDTO> findByEtat(String etatStr) {
        EtatOrdre etat = EtatOrdre.valueOf(etatStr.toUpperCase());
        return ObjectMapperUtils.mapAll(ordreFabricationRepository.findByEtat(etat), OrdreFabricationDTO.class);
    }
}
