package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class TrilhaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Trilha.class);
        Trilha trilha1 = new Trilha();
        trilha1.setId(1L);
        Trilha trilha2 = new Trilha();
        trilha2.setId(trilha1.getId());
        assertThat(trilha1).isEqualTo(trilha2);
        trilha2.setId(2L);
        assertThat(trilha1).isNotEqualTo(trilha2);
        trilha1.setId(null);
        assertThat(trilha1).isNotEqualTo(trilha2);
    }
}
