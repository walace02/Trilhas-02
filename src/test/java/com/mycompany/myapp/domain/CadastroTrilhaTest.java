package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CadastroTrilhaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CadastroTrilha.class);
        CadastroTrilha cadastroTrilha1 = new CadastroTrilha();
        cadastroTrilha1.setId(1L);
        CadastroTrilha cadastroTrilha2 = new CadastroTrilha();
        cadastroTrilha2.setId(cadastroTrilha1.getId());
        assertThat(cadastroTrilha1).isEqualTo(cadastroTrilha2);
        cadastroTrilha2.setId(2L);
        assertThat(cadastroTrilha1).isNotEqualTo(cadastroTrilha2);
        cadastroTrilha1.setId(null);
        assertThat(cadastroTrilha1).isNotEqualTo(cadastroTrilha2);
    }
}
