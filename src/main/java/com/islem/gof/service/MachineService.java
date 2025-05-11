package com.islem.gof.service;

import com.islem.gof.dto.MachineDTO;
import com.islem.gof.model.EtatMachine;
import com.islem.gof.model.Machine;
import com.islem.gof.repository.MachineRepository;
import com.islem.gof.Mapper.ObjectMapperUtils;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MachineService {

    private final MachineRepository repository;

    public List<MachineDTO> getAll() {
        return ObjectMapperUtils.mapAll(repository.findAll(), MachineDTO.class);
    }

    public MachineDTO create(MachineDTO dto) {
        Machine entity = ObjectMapperUtils.map(dto, Machine.class);
        return ObjectMapperUtils.map(repository.save(entity), MachineDTO.class);
    }

    public MachineDTO update(Long id, MachineDTO dto) {
        Machine entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Machine non trouvée"));

        entity.setNom(dto.getNom());
        entity.setEtat(dto.getEtat());
        entity.setDerniereMaintenance(dto.getDerniereMaintenance());

        return ObjectMapperUtils.map(repository.save(entity), MachineDTO.class);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public List<MachineDTO> findByEtat(EtatMachine etat) {
        return ObjectMapperUtils.mapAll(repository.findByEtat(etat), MachineDTO.class);
    }

    public List<MachineDTO> getMachinesDisponibles() {
        return findByEtat(EtatMachine.DISPONIBLE);
    }

    public MachineDTO updateMaintenanceDate(Long id, LocalDate newDate) {
        Machine machine = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Machine non trouvée"));

        machine.setDerniereMaintenance(newDate);
        return ObjectMapperUtils.map(repository.save(machine), MachineDTO.class);
    }
}
