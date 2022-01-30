package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Municipios;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Municipios entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MunicipiosRepository extends JpaRepository<Municipios, Long> {}
