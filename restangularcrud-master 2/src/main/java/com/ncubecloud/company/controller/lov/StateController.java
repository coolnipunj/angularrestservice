package com.ncubecloud.company.controller.lov;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ncubecloud.company.exception.ResourceNotFoundException;
import com.ncubecloud.company.model.lov.State;
import com.ncubecloud.company.repository.lov.StateRepository;

@RestController 
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/lov")
public class StateController {
    @Autowired
    private StateRepository StateRepository;

    @GetMapping("/states")
    public List<State> getAllStates() {
        return StateRepository.findAll();
    }

    @GetMapping("/states/{id}")
    public ResponseEntity<State> getStateById(@PathVariable(value = "id") Long StateId)
        throws ResourceNotFoundException {
        State State = StateRepository.findById(StateId)
          .orElseThrow(() -> new ResourceNotFoundException("State not found for this id :: " + StateId));
        return ResponseEntity.ok().body(State);
    }

}