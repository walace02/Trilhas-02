package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TrilhasTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Trilhas.class);
        Trilhas trilhas1 = new Trilhas();
        trilhas1.setId(1L);
        Trilhas trilhas2 = new Trilhas();
        trilhas2.setId(trilhas1.getId());
        assertThat(trilhas1).isEqualTo(trilhas2);
        trilhas2.setId(2L);
        assertThat(trilhas1).isNotEqualTo(trilhas2);
        trilhas1.setId(null);
        assertThat(trilhas1).isNotEqualTo(trilhas2);
    }
}
