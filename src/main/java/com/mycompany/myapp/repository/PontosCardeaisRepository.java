package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.PontosCardeais;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the PontosCardeais entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PontosCardeaisRepository extends JpaRepository<PontosCardeais, Long> {}
