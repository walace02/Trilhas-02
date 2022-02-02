package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Trilha;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Trilha entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TrilhaRepository extends JpaRepository<Trilha, Long> {}
