package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Trilhas;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Trilhas entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TrilhasRepository extends JpaRepository<Trilhas, Long> {}
