package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Fotografias;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Fotografias entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FotografiasRepository extends JpaRepository<Fotografias, Long> {}
