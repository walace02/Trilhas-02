package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.PontosTuristicos;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the PontosTuristicos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PontosTuristicosRepository extends JpaRepository<PontosTuristicos, Long> {}
