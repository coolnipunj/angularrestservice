package com.ncubecloud.company.repository.lov;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ncubecloud.company.model.lov.State;

@Repository
public interface StateRepository extends JpaRepository<State, Long>{

}