package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.PontosVenda;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the PontosVenda entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PontosVendaRepository extends JpaRepository<PontosVenda, Long> {}
