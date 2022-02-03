package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PontosTuristicosTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PontosTuristicos.class);
        PontosTuristicos pontosTuristicos1 = new PontosTuristicos();
        pontosTuristicos1.setId(1L);
        PontosTuristicos pontosTuristicos2 = new PontosTuristicos();
        pontosTuristicos2.setId(pontosTuristicos1.getId());
        assertThat(pontosTuristicos1).isEqualTo(pontosTuristicos2);
        pontosTuristicos2.setId(2L);
        assertThat(pontosTuristicos1).isNotEqualTo(pontosTuristicos2);
        pontosTuristicos1.setId(null);
        assertThat(pontosTuristicos1).isNotEqualTo(pontosTuristicos2);
    }
}
