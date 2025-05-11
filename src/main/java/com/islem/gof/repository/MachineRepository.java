package com.islem.gof.repository;

import com.islem.gof.model.EtatMachine;
import com.islem.gof.model.Machine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MachineRepository extends JpaRepository<Machine, Long> {
    List<Machine> findByEtat(EtatMachine etat);
}