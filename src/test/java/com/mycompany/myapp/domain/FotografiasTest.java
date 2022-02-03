package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class FotografiasTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Fotografias.class);
        Fotografias fotografias1 = new Fotografias();
        fotografias1.setId(1L);
        Fotografias fotografias2 = new Fotografias();
        fotografias2.setId(fotografias1.getId());
        assertThat(fotografias1).isEqualTo(fotografias2);
        fotografias2.setId(2L);
        assertThat(fotografias1).isNotEqualTo(fotografias2);
        fotografias1.setId(null);
        assertThat(fotografias1).isNotEqualTo(fotografias2);
    }
}
