package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.CadastroTrilha;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the CadastroTrilha entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CadastroTrilhaRepository extends JpaRepository<CadastroTrilha, Long> {}
