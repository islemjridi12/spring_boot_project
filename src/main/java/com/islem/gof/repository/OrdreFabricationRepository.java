package com.islem.gof.repository;

import com.islem.gof.model.EtatOrdre;
import com.islem.gof.model.OrdreFabrication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrdreFabricationRepository extends JpaRepository<OrdreFabrication, Long> {
    List<OrdreFabrication> findByEtat(EtatOrdre etat);

}

