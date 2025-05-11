package com.islem.gof.service;

import com.islem.gof.dto.EmployeDTO;
import com.islem.gof.model.Employe;
import com.islem.gof.model.EtatMachine;
import com.islem.gof.model.Machine;
import com.islem.gof.repository.EmployeRepository;
import com.islem.gof.repository.MachineRepository;
import com.islem.gof.Mapper.ObjectMapperUtils;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeService {

    @Autowired
    private EmployeRepository employeRepository;

    @Autowired
    private MachineRepository machineRepository;

    public List<EmployeDTO> getAll() {
        return ObjectMapperUtils.mapAll(employeRepository.findAll(), EmployeDTO.class);
    }

    public EmployeDTO create(EmployeDTO dto) {
        Employe entity = new Employe();
        entity.setNom(dto.getNom());
        entity.setPoste(dto.getPoste());

        if (dto.getMachineAssigneeId() != null) {
            Machine machine = machineRepository.findById(dto.getMachineAssigneeId())
                    .orElseThrow(() -> new EntityNotFoundException("Machine non trouvée"));
            entity.setMachineAssignee(machine);
        }

        Employe saved = employeRepository.save(entity);
        return ObjectMapperUtils.map(saved, EmployeDTO.class);
    }


    public EmployeDTO update(Long id, EmployeDTO dto) {
        Employe entity = employeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Employé non trouvé"));

        entity.setNom(dto.getNom());
        entity.setPoste(dto.getPoste());

        if (dto.getMachineAssigneeId() != null) {
            Machine machine = machineRepository.findById(dto.getMachineAssigneeId())
                    .orElseThrow(() -> new EntityNotFoundException("Machine non trouvée"));
            entity.setMachineAssignee(machine);
        } else {
            entity.setMachineAssignee(null); // facultatif
        }

        Employe saved = employeRepository.save(entity);
        return ObjectMapperUtils.map(saved, EmployeDTO.class);
    }


    public void delete(Long id) {
        employeRepository.deleteById(id);
    }

    public EmployeDTO assignMachine(Long employeId, Long machineId) {
        Employe employe = employeRepository.findById(employeId)
                .orElseThrow(() -> new EntityNotFoundException("Employé non trouvé"));

        Machine machine = machineRepository.findById(machineId)
                .orElseThrow(() -> new EntityNotFoundException("Machine non trouvée"));

        if (machine.getEtat() != EtatMachine.DISPONIBLE) {
            throw new IllegalArgumentException("La machine n’est pas disponible");
        }

        employe.setMachineAssignee(machine);
        return ObjectMapperUtils.map(employeRepository.save(employe), EmployeDTO.class);
    }
}
