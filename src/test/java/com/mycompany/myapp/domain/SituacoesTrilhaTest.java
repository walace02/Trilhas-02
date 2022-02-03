package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class SituacoesTrilhaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SituacoesTrilha.class);
        SituacoesTrilha situacoesTrilha1 = new SituacoesTrilha();
        situacoesTrilha1.setId(1L);
        SituacoesTrilha situacoesTrilha2 = new SituacoesTrilha();
        situacoesTrilha2.setId(situacoesTrilha1.getId());
        assertThat(situacoesTrilha1).isEqualTo(situacoesTrilha2);
        situacoesTrilha2.setId(2L);
        assertThat(situacoesTrilha1).isNotEqualTo(situacoesTrilha2);
        situacoesTrilha1.setId(null);
        assertThat(situacoesTrilha1).isNotEqualTo(situacoesTrilha2);
    }
}
