package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.PontosVenda;
import com.mycompany.myapp.repository.PontosVendaRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link PontosVendaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PontosVendaResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final Integer DEFAULT_AVALIACAO = 1;
    private static final Integer UPDATED_AVALIACAO = 2;

    private static final String DEFAULT_TIPOS_PONTOS_VENDA = "AAAAAAAAAA";
    private static final String UPDATED_TIPOS_PONTOS_VENDA = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/pontos-vendas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PontosVendaRepository pontosVendaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPontosVendaMockMvc;

    private PontosVenda pontosVenda;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PontosVenda createEntity(EntityManager em) {
        PontosVenda pontosVenda = new PontosVenda()
            .nome(DEFAULT_NOME)
            .descricao(DEFAULT_DESCRICAO)
            .avaliacao(DEFAULT_AVALIACAO)
            .tiposPontosVenda(DEFAULT_TIPOS_PONTOS_VENDA);
        return pontosVenda;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PontosVenda createUpdatedEntity(EntityManager em) {
        PontosVenda pontosVenda = new PontosVenda()
            .nome(UPDATED_NOME)
            .descricao(UPDATED_DESCRICAO)
            .avaliacao(UPDATED_AVALIACAO)
            .tiposPontosVenda(UPDATED_TIPOS_PONTOS_VENDA);
        return pontosVenda;
    }

    @BeforeEach
    public void initTest() {
        pontosVenda = createEntity(em);
    }

    @Test
    @Transactional
    void createPontosVenda() throws Exception {
        int databaseSizeBeforeCreate = pontosVendaRepository.findAll().size();
        // Create the PontosVenda
        restPontosVendaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pontosVenda)))
            .andExpect(status().isCreated());

        // Validate the PontosVenda in the database
        List<PontosVenda> pontosVendaList = pontosVendaRepository.findAll();
        assertThat(pontosVendaList).hasSize(databaseSizeBeforeCreate + 1);
        PontosVenda testPontosVenda = pontosVendaList.get(pontosVendaList.size() - 1);
        assertThat(testPontosVenda.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testPontosVenda.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testPontosVenda.getAvaliacao()).isEqualTo(DEFAULT_AVALIACAO);
        assertThat(testPontosVenda.getTiposPontosVenda()).isEqualTo(DEFAULT_TIPOS_PONTOS_VENDA);
    }

    @Test
    @Transactional
    void createPontosVendaWithExistingId() throws Exception {
        // Create the PontosVenda with an existing ID
        pontosVenda.setId(1L);

        int databaseSizeBeforeCreate = pontosVendaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPontosVendaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pontosVenda)))
            .andExpect(status().isBadRequest());

        // Validate the PontosVenda in the database
        List<PontosVenda> pontosVendaList = pontosVendaRepository.findAll();
        assertThat(pontosVendaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllPontosVendas() throws Exception {
        // Initialize the database
        pontosVendaRepository.saveAndFlush(pontosVenda);

        // Get all the pontosVendaList
        restPontosVendaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pontosVenda.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)))
            .andExpect(jsonPath("$.[*].avaliacao").value(hasItem(DEFAULT_AVALIACAO)))
            .andExpect(jsonPath("$.[*].tiposPontosVenda").value(hasItem(DEFAULT_TIPOS_PONTOS_VENDA)));
    }

    @Test
    @Transactional
    void getPontosVenda() throws Exception {
        // Initialize the database
        pontosVendaRepository.saveAndFlush(pontosVenda);

        // Get the pontosVenda
        restPontosVendaMockMvc
            .perform(get(ENTITY_API_URL_ID, pontosVenda.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pontosVenda.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO))
            .andExpect(jsonPath("$.avaliacao").value(DEFAULT_AVALIACAO))
            .andExpect(jsonPath("$.tiposPontosVenda").value(DEFAULT_TIPOS_PONTOS_VENDA));
    }

    @Test
    @Transactional
    void getNonExistingPontosVenda() throws Exception {
        // Get the pontosVenda
        restPontosVendaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPontosVenda() throws Exception {
        // Initialize the database
        pontosVendaRepository.saveAndFlush(pontosVenda);

        int databaseSizeBeforeUpdate = pontosVendaRepository.findAll().size();

        // Update the pontosVenda
        PontosVenda updatedPontosVenda = pontosVendaRepository.findById(pontosVenda.getId()).get();
        // Disconnect from session so that the updates on updatedPontosVenda are not directly saved in db
        em.detach(updatedPontosVenda);
        updatedPontosVenda
            .nome(UPDATED_NOME)
            .descricao(UPDATED_DESCRICAO)
            .avaliacao(UPDATED_AVALIACAO)
            .tiposPontosVenda(UPDATED_TIPOS_PONTOS_VENDA);

        restPontosVendaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPontosVenda.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPontosVenda))
            )
            .andExpect(status().isOk());

        // Validate the PontosVenda in the database
        List<PontosVenda> pontosVendaList = pontosVendaRepository.findAll();
        assertThat(pontosVendaList).hasSize(databaseSizeBeforeUpdate);
        PontosVenda testPontosVenda = pontosVendaList.get(pontosVendaList.size() - 1);
        assertThat(testPontosVenda.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testPontosVenda.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testPontosVenda.getAvaliacao()).isEqualTo(UPDATED_AVALIACAO);
        assertThat(testPontosVenda.getTiposPontosVenda()).isEqualTo(UPDATED_TIPOS_PONTOS_VENDA);
    }

    @Test
    @Transactional
    void putNonExistingPontosVenda() throws Exception {
        int databaseSizeBeforeUpdate = pontosVendaRepository.findAll().size();
        pontosVenda.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPontosVendaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, pontosVenda.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pontosVenda))
            )
            .andExpect(status().isBadRequest());

        // Validate the PontosVenda in the database
        List<PontosVenda> pontosVendaList = pontosVendaRepository.findAll();
        assertThat(pontosVendaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPontosVenda() throws Exception {
        int databaseSizeBeforeUpdate = pontosVendaRepository.findAll().size();
        pontosVenda.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPontosVendaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pontosVenda))
            )
            .andExpect(status().isBadRequest());

        // Validate the PontosVenda in the database
        List<PontosVenda> pontosVendaList = pontosVendaRepository.findAll();
        assertThat(pontosVendaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPontosVenda() throws Exception {
        int databaseSizeBeforeUpdate = pontosVendaRepository.findAll().size();
        pontosVenda.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPontosVendaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pontosVenda)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the PontosVenda in the database
        List<PontosVenda> pontosVendaList = pontosVendaRepository.findAll();
        assertThat(pontosVendaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePontosVendaWithPatch() throws Exception {
        // Initialize the database
        pontosVendaRepository.saveAndFlush(pontosVenda);

        int databaseSizeBeforeUpdate = pontosVendaRepository.findAll().size();

        // Update the pontosVenda using partial update
        PontosVenda partialUpdatedPontosVenda = new PontosVenda();
        partialUpdatedPontosVenda.setId(pontosVenda.getId());

        partialUpdatedPontosVenda.descricao(UPDATED_DESCRICAO);

        restPontosVendaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPontosVenda.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPontosVenda))
            )
            .andExpect(status().isOk());

        // Validate the PontosVenda in the database
        List<PontosVenda> pontosVendaList = pontosVendaRepository.findAll();
        assertThat(pontosVendaList).hasSize(databaseSizeBeforeUpdate);
        PontosVenda testPontosVenda = pontosVendaList.get(pontosVendaList.size() - 1);
        assertThat(testPontosVenda.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testPontosVenda.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testPontosVenda.getAvaliacao()).isEqualTo(DEFAULT_AVALIACAO);
        assertThat(testPontosVenda.getTiposPontosVenda()).isEqualTo(DEFAULT_TIPOS_PONTOS_VENDA);
    }

    @Test
    @Transactional
    void fullUpdatePontosVendaWithPatch() throws Exception {
        // Initialize the database
        pontosVendaRepository.saveAndFlush(pontosVenda);

        int databaseSizeBeforeUpdate = pontosVendaRepository.findAll().size();

        // Update the pontosVenda using partial update
        PontosVenda partialUpdatedPontosVenda = new PontosVenda();
        partialUpdatedPontosVenda.setId(pontosVenda.getId());

        partialUpdatedPontosVenda
            .nome(UPDATED_NOME)
            .descricao(UPDATED_DESCRICAO)
            .avaliacao(UPDATED_AVALIACAO)
            .tiposPontosVenda(UPDATED_TIPOS_PONTOS_VENDA);

        restPontosVendaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPontosVenda.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPontosVenda))
            )
            .andExpect(status().isOk());

        // Validate the PontosVenda in the database
        List<PontosVenda> pontosVendaList = pontosVendaRepository.findAll();
        assertThat(pontosVendaList).hasSize(databaseSizeBeforeUpdate);
        PontosVenda testPontosVenda = pontosVendaList.get(pontosVendaList.size() - 1);
        assertThat(testPontosVenda.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testPontosVenda.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testPontosVenda.getAvaliacao()).isEqualTo(UPDATED_AVALIACAO);
        assertThat(testPontosVenda.getTiposPontosVenda()).isEqualTo(UPDATED_TIPOS_PONTOS_VENDA);
    }

    @Test
    @Transactional
    void patchNonExistingPontosVenda() throws Exception {
        int databaseSizeBeforeUpdate = pontosVendaRepository.findAll().size();
        pontosVenda.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPontosVendaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, pontosVenda.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pontosVenda))
            )
            .andExpect(status().isBadRequest());

        // Validate the PontosVenda in the database
        List<PontosVenda> pontosVendaList = pontosVendaRepository.findAll();
        assertThat(pontosVendaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPontosVenda() throws Exception {
        int databaseSizeBeforeUpdate = pontosVendaRepository.findAll().size();
        pontosVenda.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPontosVendaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pontosVenda))
            )
            .andExpect(status().isBadRequest());

        // Validate the PontosVenda in the database
        List<PontosVenda> pontosVendaList = pontosVendaRepository.findAll();
        assertThat(pontosVendaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPontosVenda() throws Exception {
        int databaseSizeBeforeUpdate = pontosVendaRepository.findAll().size();
        pontosVenda.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPontosVendaMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(pontosVenda))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PontosVenda in the database
        List<PontosVenda> pontosVendaList = pontosVendaRepository.findAll();
        assertThat(pontosVendaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePontosVenda() throws Exception {
        // Initialize the database
        pontosVendaRepository.saveAndFlush(pontosVenda);

        int databaseSizeBeforeDelete = pontosVendaRepository.findAll().size();

        // Delete the pontosVenda
        restPontosVendaMockMvc
            .perform(delete(ENTITY_API_URL_ID, pontosVenda.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PontosVenda> pontosVendaList = pontosVendaRepository.findAll();
        assertThat(pontosVendaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
