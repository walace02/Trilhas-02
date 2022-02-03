package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.SituacoesTrilha;
import com.mycompany.myapp.repository.SituacoesTrilhaRepository;
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
 * Integration tests for the {@link SituacoesTrilhaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class SituacoesTrilhaResourceIT {

    private static final Boolean DEFAULT_SITUACAO = false;
    private static final Boolean UPDATED_SITUACAO = true;

    private static final String ENTITY_API_URL = "/api/situacoes-trilhas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private SituacoesTrilhaRepository situacoesTrilhaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSituacoesTrilhaMockMvc;

    private SituacoesTrilha situacoesTrilha;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SituacoesTrilha createEntity(EntityManager em) {
        SituacoesTrilha situacoesTrilha = new SituacoesTrilha().situacao(DEFAULT_SITUACAO);
        return situacoesTrilha;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SituacoesTrilha createUpdatedEntity(EntityManager em) {
        SituacoesTrilha situacoesTrilha = new SituacoesTrilha().situacao(UPDATED_SITUACAO);
        return situacoesTrilha;
    }

    @BeforeEach
    public void initTest() {
        situacoesTrilha = createEntity(em);
    }

    @Test
    @Transactional
    void createSituacoesTrilha() throws Exception {
        int databaseSizeBeforeCreate = situacoesTrilhaRepository.findAll().size();
        // Create the SituacoesTrilha
        restSituacoesTrilhaMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(situacoesTrilha))
            )
            .andExpect(status().isCreated());

        // Validate the SituacoesTrilha in the database
        List<SituacoesTrilha> situacoesTrilhaList = situacoesTrilhaRepository.findAll();
        assertThat(situacoesTrilhaList).hasSize(databaseSizeBeforeCreate + 1);
        SituacoesTrilha testSituacoesTrilha = situacoesTrilhaList.get(situacoesTrilhaList.size() - 1);
        assertThat(testSituacoesTrilha.getSituacao()).isEqualTo(DEFAULT_SITUACAO);
    }

    @Test
    @Transactional
    void createSituacoesTrilhaWithExistingId() throws Exception {
        // Create the SituacoesTrilha with an existing ID
        situacoesTrilha.setId(1L);

        int databaseSizeBeforeCreate = situacoesTrilhaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restSituacoesTrilhaMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(situacoesTrilha))
            )
            .andExpect(status().isBadRequest());

        // Validate the SituacoesTrilha in the database
        List<SituacoesTrilha> situacoesTrilhaList = situacoesTrilhaRepository.findAll();
        assertThat(situacoesTrilhaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllSituacoesTrilhas() throws Exception {
        // Initialize the database
        situacoesTrilhaRepository.saveAndFlush(situacoesTrilha);

        // Get all the situacoesTrilhaList
        restSituacoesTrilhaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(situacoesTrilha.getId().intValue())))
            .andExpect(jsonPath("$.[*].situacao").value(hasItem(DEFAULT_SITUACAO.booleanValue())));
    }

    @Test
    @Transactional
    void getSituacoesTrilha() throws Exception {
        // Initialize the database
        situacoesTrilhaRepository.saveAndFlush(situacoesTrilha);

        // Get the situacoesTrilha
        restSituacoesTrilhaMockMvc
            .perform(get(ENTITY_API_URL_ID, situacoesTrilha.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(situacoesTrilha.getId().intValue()))
            .andExpect(jsonPath("$.situacao").value(DEFAULT_SITUACAO.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingSituacoesTrilha() throws Exception {
        // Get the situacoesTrilha
        restSituacoesTrilhaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewSituacoesTrilha() throws Exception {
        // Initialize the database
        situacoesTrilhaRepository.saveAndFlush(situacoesTrilha);

        int databaseSizeBeforeUpdate = situacoesTrilhaRepository.findAll().size();

        // Update the situacoesTrilha
        SituacoesTrilha updatedSituacoesTrilha = situacoesTrilhaRepository.findById(situacoesTrilha.getId()).get();
        // Disconnect from session so that the updates on updatedSituacoesTrilha are not directly saved in db
        em.detach(updatedSituacoesTrilha);
        updatedSituacoesTrilha.situacao(UPDATED_SITUACAO);

        restSituacoesTrilhaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedSituacoesTrilha.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedSituacoesTrilha))
            )
            .andExpect(status().isOk());

        // Validate the SituacoesTrilha in the database
        List<SituacoesTrilha> situacoesTrilhaList = situacoesTrilhaRepository.findAll();
        assertThat(situacoesTrilhaList).hasSize(databaseSizeBeforeUpdate);
        SituacoesTrilha testSituacoesTrilha = situacoesTrilhaList.get(situacoesTrilhaList.size() - 1);
        assertThat(testSituacoesTrilha.getSituacao()).isEqualTo(UPDATED_SITUACAO);
    }

    @Test
    @Transactional
    void putNonExistingSituacoesTrilha() throws Exception {
        int databaseSizeBeforeUpdate = situacoesTrilhaRepository.findAll().size();
        situacoesTrilha.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSituacoesTrilhaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, situacoesTrilha.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(situacoesTrilha))
            )
            .andExpect(status().isBadRequest());

        // Validate the SituacoesTrilha in the database
        List<SituacoesTrilha> situacoesTrilhaList = situacoesTrilhaRepository.findAll();
        assertThat(situacoesTrilhaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchSituacoesTrilha() throws Exception {
        int databaseSizeBeforeUpdate = situacoesTrilhaRepository.findAll().size();
        situacoesTrilha.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSituacoesTrilhaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(situacoesTrilha))
            )
            .andExpect(status().isBadRequest());

        // Validate the SituacoesTrilha in the database
        List<SituacoesTrilha> situacoesTrilhaList = situacoesTrilhaRepository.findAll();
        assertThat(situacoesTrilhaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamSituacoesTrilha() throws Exception {
        int databaseSizeBeforeUpdate = situacoesTrilhaRepository.findAll().size();
        situacoesTrilha.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSituacoesTrilhaMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(situacoesTrilha))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the SituacoesTrilha in the database
        List<SituacoesTrilha> situacoesTrilhaList = situacoesTrilhaRepository.findAll();
        assertThat(situacoesTrilhaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateSituacoesTrilhaWithPatch() throws Exception {
        // Initialize the database
        situacoesTrilhaRepository.saveAndFlush(situacoesTrilha);

        int databaseSizeBeforeUpdate = situacoesTrilhaRepository.findAll().size();

        // Update the situacoesTrilha using partial update
        SituacoesTrilha partialUpdatedSituacoesTrilha = new SituacoesTrilha();
        partialUpdatedSituacoesTrilha.setId(situacoesTrilha.getId());

        restSituacoesTrilhaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSituacoesTrilha.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSituacoesTrilha))
            )
            .andExpect(status().isOk());

        // Validate the SituacoesTrilha in the database
        List<SituacoesTrilha> situacoesTrilhaList = situacoesTrilhaRepository.findAll();
        assertThat(situacoesTrilhaList).hasSize(databaseSizeBeforeUpdate);
        SituacoesTrilha testSituacoesTrilha = situacoesTrilhaList.get(situacoesTrilhaList.size() - 1);
        assertThat(testSituacoesTrilha.getSituacao()).isEqualTo(DEFAULT_SITUACAO);
    }

    @Test
    @Transactional
    void fullUpdateSituacoesTrilhaWithPatch() throws Exception {
        // Initialize the database
        situacoesTrilhaRepository.saveAndFlush(situacoesTrilha);

        int databaseSizeBeforeUpdate = situacoesTrilhaRepository.findAll().size();

        // Update the situacoesTrilha using partial update
        SituacoesTrilha partialUpdatedSituacoesTrilha = new SituacoesTrilha();
        partialUpdatedSituacoesTrilha.setId(situacoesTrilha.getId());

        partialUpdatedSituacoesTrilha.situacao(UPDATED_SITUACAO);

        restSituacoesTrilhaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedSituacoesTrilha.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedSituacoesTrilha))
            )
            .andExpect(status().isOk());

        // Validate the SituacoesTrilha in the database
        List<SituacoesTrilha> situacoesTrilhaList = situacoesTrilhaRepository.findAll();
        assertThat(situacoesTrilhaList).hasSize(databaseSizeBeforeUpdate);
        SituacoesTrilha testSituacoesTrilha = situacoesTrilhaList.get(situacoesTrilhaList.size() - 1);
        assertThat(testSituacoesTrilha.getSituacao()).isEqualTo(UPDATED_SITUACAO);
    }

    @Test
    @Transactional
    void patchNonExistingSituacoesTrilha() throws Exception {
        int databaseSizeBeforeUpdate = situacoesTrilhaRepository.findAll().size();
        situacoesTrilha.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSituacoesTrilhaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, situacoesTrilha.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(situacoesTrilha))
            )
            .andExpect(status().isBadRequest());

        // Validate the SituacoesTrilha in the database
        List<SituacoesTrilha> situacoesTrilhaList = situacoesTrilhaRepository.findAll();
        assertThat(situacoesTrilhaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchSituacoesTrilha() throws Exception {
        int databaseSizeBeforeUpdate = situacoesTrilhaRepository.findAll().size();
        situacoesTrilha.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSituacoesTrilhaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(situacoesTrilha))
            )
            .andExpect(status().isBadRequest());

        // Validate the SituacoesTrilha in the database
        List<SituacoesTrilha> situacoesTrilhaList = situacoesTrilhaRepository.findAll();
        assertThat(situacoesTrilhaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamSituacoesTrilha() throws Exception {
        int databaseSizeBeforeUpdate = situacoesTrilhaRepository.findAll().size();
        situacoesTrilha.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restSituacoesTrilhaMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(situacoesTrilha))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the SituacoesTrilha in the database
        List<SituacoesTrilha> situacoesTrilhaList = situacoesTrilhaRepository.findAll();
        assertThat(situacoesTrilhaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteSituacoesTrilha() throws Exception {
        // Initialize the database
        situacoesTrilhaRepository.saveAndFlush(situacoesTrilha);

        int databaseSizeBeforeDelete = situacoesTrilhaRepository.findAll().size();

        // Delete the situacoesTrilha
        restSituacoesTrilhaMockMvc
            .perform(delete(ENTITY_API_URL_ID, situacoesTrilha.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SituacoesTrilha> situacoesTrilhaList = situacoesTrilhaRepository.findAll();
        assertThat(situacoesTrilhaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
