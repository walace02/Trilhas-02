package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PontosCardeaisTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PontosCardeais.class);
        PontosCardeais pontosCardeais1 = new PontosCardeais();
        pontosCardeais1.setId(1L);
        PontosCardeais pontosCardeais2 = new PontosCardeais();
        pontosCardeais2.setId(pontosCardeais1.getId());
        assertThat(pontosCardeais1).isEqualTo(pontosCardeais2);
        pontosCardeais2.setId(2L);
        assertThat(pontosCardeais1).isNotEqualTo(pontosCardeais2);
        pontosCardeais1.setId(null);
        assertThat(pontosCardeais1).isNotEqualTo(pontosCardeais2);
    }
}
