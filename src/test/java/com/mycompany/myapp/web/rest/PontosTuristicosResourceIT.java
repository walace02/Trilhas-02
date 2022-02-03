package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.PontosTuristicos;
import com.mycompany.myapp.repository.PontosTuristicosRepository;
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
 * Integration tests for the {@link PontosTuristicosResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PontosTuristicosResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final String DEFAULT_AVALIACAO = "AAAAAAAAAA";
    private static final String UPDATED_AVALIACAO = "BBBBBBBBBB";

    private static final String DEFAULT_TIPOS_PONTOS_TURISTICOS = "AAAAAAAAAA";
    private static final String UPDATED_TIPOS_PONTOS_TURISTICOS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/pontos-turisticos";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PontosTuristicosRepository pontosTuristicosRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPontosTuristicosMockMvc;

    private PontosTuristicos pontosTuristicos;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PontosTuristicos createEntity(EntityManager em) {
        PontosTuristicos pontosTuristicos = new PontosTuristicos()
            .nome(DEFAULT_NOME)
            .descricao(DEFAULT_DESCRICAO)
            .avaliacao(DEFAULT_AVALIACAO)
            .tiposPontosTuristicos(DEFAULT_TIPOS_PONTOS_TURISTICOS);
        return pontosTuristicos;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PontosTuristicos createUpdatedEntity(EntityManager em) {
        PontosTuristicos pontosTuristicos = new PontosTuristicos()
            .nome(UPDATED_NOME)
            .descricao(UPDATED_DESCRICAO)
            .avaliacao(UPDATED_AVALIACAO)
            .tiposPontosTuristicos(UPDATED_TIPOS_PONTOS_TURISTICOS);
        return pontosTuristicos;
    }

    @BeforeEach
    public void initTest() {
        pontosTuristicos = createEntity(em);
    }

    @Test
    @Transactional
    void createPontosTuristicos() throws Exception {
        int databaseSizeBeforeCreate = pontosTuristicosRepository.findAll().size();
        // Create the PontosTuristicos
        restPontosTuristicosMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pontosTuristicos))
            )
            .andExpect(status().isCreated());

        // Validate the PontosTuristicos in the database
        List<PontosTuristicos> pontosTuristicosList = pontosTuristicosRepository.findAll();
        assertThat(pontosTuristicosList).hasSize(databaseSizeBeforeCreate + 1);
        PontosTuristicos testPontosTuristicos = pontosTuristicosList.get(pontosTuristicosList.size() - 1);
        assertThat(testPontosTuristicos.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testPontosTuristicos.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testPontosTuristicos.getAvaliacao()).isEqualTo(DEFAULT_AVALIACAO);
        assertThat(testPontosTuristicos.getTiposPontosTuristicos()).isEqualTo(DEFAULT_TIPOS_PONTOS_TURISTICOS);
    }

    @Test
    @Transactional
    void createPontosTuristicosWithExistingId() throws Exception {
        // Create the PontosTuristicos with an existing ID
        pontosTuristicos.setId(1L);

        int databaseSizeBeforeCreate = pontosTuristicosRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPontosTuristicosMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pontosTuristicos))
            )
            .andExpect(status().isBadRequest());

        // Validate the PontosTuristicos in the database
        List<PontosTuristicos> pontosTuristicosList = pontosTuristicosRepository.findAll();
        assertThat(pontosTuristicosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllPontosTuristicos() throws Exception {
        // Initialize the database
        pontosTuristicosRepository.saveAndFlush(pontosTuristicos);

        // Get all the pontosTuristicosList
        restPontosTuristicosMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pontosTuristicos.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)))
            .andExpect(jsonPath("$.[*].avaliacao").value(hasItem(DEFAULT_AVALIACAO)))
            .andExpect(jsonPath("$.[*].tiposPontosTuristicos").value(hasItem(DEFAULT_TIPOS_PONTOS_TURISTICOS)));
    }

    @Test
    @Transactional
    void getPontosTuristicos() throws Exception {
        // Initialize the database
        pontosTuristicosRepository.saveAndFlush(pontosTuristicos);

        // Get the pontosTuristicos
        restPontosTuristicosMockMvc
            .perform(get(ENTITY_API_URL_ID, pontosTuristicos.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pontosTuristicos.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO))
            .andExpect(jsonPath("$.avaliacao").value(DEFAULT_AVALIACAO))
            .andExpect(jsonPath("$.tiposPontosTuristicos").value(DEFAULT_TIPOS_PONTOS_TURISTICOS));
    }

    @Test
    @Transactional
    void getNonExistingPontosTuristicos() throws Exception {
        // Get the pontosTuristicos
        restPontosTuristicosMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPontosTuristicos() throws Exception {
        // Initialize the database
        pontosTuristicosRepository.saveAndFlush(pontosTuristicos);

        int databaseSizeBeforeUpdate = pontosTuristicosRepository.findAll().size();

        // Update the pontosTuristicos
        PontosTuristicos updatedPontosTuristicos = pontosTuristicosRepository.findById(pontosTuristicos.getId()).get();
        // Disconnect from session so that the updates on updatedPontosTuristicos are not directly saved in db
        em.detach(updatedPontosTuristicos);
        updatedPontosTuristicos
            .nome(UPDATED_NOME)
            .descricao(UPDATED_DESCRICAO)
            .avaliacao(UPDATED_AVALIACAO)
            .tiposPontosTuristicos(UPDATED_TIPOS_PONTOS_TURISTICOS);

        restPontosTuristicosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPontosTuristicos.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPontosTuristicos))
            )
            .andExpect(status().isOk());

        // Validate the PontosTuristicos in the database
        List<PontosTuristicos> pontosTuristicosList = pontosTuristicosRepository.findAll();
        assertThat(pontosTuristicosList).hasSize(databaseSizeBeforeUpdate);
        PontosTuristicos testPontosTuristicos = pontosTuristicosList.get(pontosTuristicosList.size() - 1);
        assertThat(testPontosTuristicos.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testPontosTuristicos.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testPontosTuristicos.getAvaliacao()).isEqualTo(UPDATED_AVALIACAO);
        assertThat(testPontosTuristicos.getTiposPontosTuristicos()).isEqualTo(UPDATED_TIPOS_PONTOS_TURISTICOS);
    }

    @Test
    @Transactional
    void putNonExistingPontosTuristicos() throws Exception {
        int databaseSizeBeforeUpdate = pontosTuristicosRepository.findAll().size();
        pontosTuristicos.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPontosTuristicosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, pontosTuristicos.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pontosTuristicos))
            )
            .andExpect(status().isBadRequest());

        // Validate the PontosTuristicos in the database
        List<PontosTuristicos> pontosTuristicosList = pontosTuristicosRepository.findAll();
        assertThat(pontosTuristicosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPontosTuristicos() throws Exception {
        int databaseSizeBeforeUpdate = pontosTuristicosRepository.findAll().size();
        pontosTuristicos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPontosTuristicosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pontosTuristicos))
            )
            .andExpect(status().isBadRequest());

        // Validate the PontosTuristicos in the database
        List<PontosTuristicos> pontosTuristicosList = pontosTuristicosRepository.findAll();
        assertThat(pontosTuristicosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPontosTuristicos() throws Exception {
        int databaseSizeBeforeUpdate = pontosTuristicosRepository.findAll().size();
        pontosTuristicos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPontosTuristicosMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pontosTuristicos))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PontosTuristicos in the database
        List<PontosTuristicos> pontosTuristicosList = pontosTuristicosRepository.findAll();
        assertThat(pontosTuristicosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePontosTuristicosWithPatch() throws Exception {
        // Initialize the database
        pontosTuristicosRepository.saveAndFlush(pontosTuristicos);

        int databaseSizeBeforeUpdate = pontosTuristicosRepository.findAll().size();

        // Update the pontosTuristicos using partial update
        PontosTuristicos partialUpdatedPontosTuristicos = new PontosTuristicos();
        partialUpdatedPontosTuristicos.setId(pontosTuristicos.getId());

        partialUpdatedPontosTuristicos.descricao(UPDATED_DESCRICAO).tiposPontosTuristicos(UPDATED_TIPOS_PONTOS_TURISTICOS);

        restPontosTuristicosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPontosTuristicos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPontosTuristicos))
            )
            .andExpect(status().isOk());

        // Validate the PontosTuristicos in the database
        List<PontosTuristicos> pontosTuristicosList = pontosTuristicosRepository.findAll();
        assertThat(pontosTuristicosList).hasSize(databaseSizeBeforeUpdate);
        PontosTuristicos testPontosTuristicos = pontosTuristicosList.get(pontosTuristicosList.size() - 1);
        assertThat(testPontosTuristicos.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testPontosTuristicos.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testPontosTuristicos.getAvaliacao()).isEqualTo(DEFAULT_AVALIACAO);
        assertThat(testPontosTuristicos.getTiposPontosTuristicos()).isEqualTo(UPDATED_TIPOS_PONTOS_TURISTICOS);
    }

    @Test
    @Transactional
    void fullUpdatePontosTuristicosWithPatch() throws Exception {
        // Initialize the database
        pontosTuristicosRepository.saveAndFlush(pontosTuristicos);

        int databaseSizeBeforeUpdate = pontosTuristicosRepository.findAll().size();

        // Update the pontosTuristicos using partial update
        PontosTuristicos partialUpdatedPontosTuristicos = new PontosTuristicos();
        partialUpdatedPontosTuristicos.setId(pontosTuristicos.getId());

        partialUpdatedPontosTuristicos
            .nome(UPDATED_NOME)
            .descricao(UPDATED_DESCRICAO)
            .avaliacao(UPDATED_AVALIACAO)
            .tiposPontosTuristicos(UPDATED_TIPOS_PONTOS_TURISTICOS);

        restPontosTuristicosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPontosTuristicos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPontosTuristicos))
            )
            .andExpect(status().isOk());

        // Validate the PontosTuristicos in the database
        List<PontosTuristicos> pontosTuristicosList = pontosTuristicosRepository.findAll();
        assertThat(pontosTuristicosList).hasSize(databaseSizeBeforeUpdate);
        PontosTuristicos testPontosTuristicos = pontosTuristicosList.get(pontosTuristicosList.size() - 1);
        assertThat(testPontosTuristicos.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testPontosTuristicos.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testPontosTuristicos.getAvaliacao()).isEqualTo(UPDATED_AVALIACAO);
        assertThat(testPontosTuristicos.getTiposPontosTuristicos()).isEqualTo(UPDATED_TIPOS_PONTOS_TURISTICOS);
    }

    @Test
    @Transactional
    void patchNonExistingPontosTuristicos() throws Exception {
        int databaseSizeBeforeUpdate = pontosTuristicosRepository.findAll().size();
        pontosTuristicos.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPontosTuristicosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, pontosTuristicos.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pontosTuristicos))
            )
            .andExpect(status().isBadRequest());

        // Validate the PontosTuristicos in the database
        List<PontosTuristicos> pontosTuristicosList = pontosTuristicosRepository.findAll();
        assertThat(pontosTuristicosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPontosTuristicos() throws Exception {
        int databaseSizeBeforeUpdate = pontosTuristicosRepository.findAll().size();
        pontosTuristicos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPontosTuristicosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pontosTuristicos))
            )
            .andExpect(status().isBadRequest());

        // Validate the PontosTuristicos in the database
        List<PontosTuristicos> pontosTuristicosList = pontosTuristicosRepository.findAll();
        assertThat(pontosTuristicosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPontosTuristicos() throws Exception {
        int databaseSizeBeforeUpdate = pontosTuristicosRepository.findAll().size();
        pontosTuristicos.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPontosTuristicosMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pontosTuristicos))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PontosTuristicos in the database
        List<PontosTuristicos> pontosTuristicosList = pontosTuristicosRepository.findAll();
        assertThat(pontosTuristicosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePontosTuristicos() throws Exception {
        // Initialize the database
        pontosTuristicosRepository.saveAndFlush(pontosTuristicos);

        int databaseSizeBeforeDelete = pontosTuristicosRepository.findAll().size();

        // Delete the pontosTuristicos
        restPontosTuristicosMockMvc
            .perform(delete(ENTITY_API_URL_ID, pontosTuristicos.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PontosTuristicos> pontosTuristicosList = pontosTuristicosRepository.findAll();
        assertThat(pontosTuristicosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
