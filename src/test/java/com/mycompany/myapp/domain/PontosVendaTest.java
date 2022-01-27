package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PontosVendaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PontosVenda.class);
        PontosVenda pontosVenda1 = new PontosVenda();
        pontosVenda1.setId(1L);
        PontosVenda pontosVenda2 = new PontosVenda();
        pontosVenda2.setId(pontosVenda1.getId());
        assertThat(pontosVenda1).isEqualTo(pontosVenda2);
        pontosVenda2.setId(2L);
        assertThat(pontosVenda1).isNotEqualTo(pontosVenda2);
        pontosVenda1.setId(null);
        assertThat(pontosVenda1).isNotEqualTo(pontosVenda2);
    }
}
