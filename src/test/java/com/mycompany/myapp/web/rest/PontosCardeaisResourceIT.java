package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.PontosCardeais;
import com.mycompany.myapp.repository.PontosCardeaisRepository;
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
 * Integration tests for the {@link PontosCardeaisResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class PontosCardeaisResourceIT {

    private static final String DEFAULT_LATITUDE = "AAAAAAAAAA";
    private static final String UPDATED_LATITUDE = "BBBBBBBBBB";

    private static final String DEFAULT_LONGITUDE = "AAAAAAAAAA";
    private static final String UPDATED_LONGITUDE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/pontos-cardeais";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PontosCardeaisRepository pontosCardeaisRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPontosCardeaisMockMvc;

    private PontosCardeais pontosCardeais;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PontosCardeais createEntity(EntityManager em) {
        PontosCardeais pontosCardeais = new PontosCardeais().latitude(DEFAULT_LATITUDE).longitude(DEFAULT_LONGITUDE);
        return pontosCardeais;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PontosCardeais createUpdatedEntity(EntityManager em) {
        PontosCardeais pontosCardeais = new PontosCardeais().latitude(UPDATED_LATITUDE).longitude(UPDATED_LONGITUDE);
        return pontosCardeais;
    }

    @BeforeEach
    public void initTest() {
        pontosCardeais = createEntity(em);
    }

    @Test
    @Transactional
    void createPontosCardeais() throws Exception {
        int databaseSizeBeforeCreate = pontosCardeaisRepository.findAll().size();
        // Create the PontosCardeais
        restPontosCardeaisMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pontosCardeais))
            )
            .andExpect(status().isCreated());

        // Validate the PontosCardeais in the database
        List<PontosCardeais> pontosCardeaisList = pontosCardeaisRepository.findAll();
        assertThat(pontosCardeaisList).hasSize(databaseSizeBeforeCreate + 1);
        PontosCardeais testPontosCardeais = pontosCardeaisList.get(pontosCardeaisList.size() - 1);
        assertThat(testPontosCardeais.getLatitude()).isEqualTo(DEFAULT_LATITUDE);
        assertThat(testPontosCardeais.getLongitude()).isEqualTo(DEFAULT_LONGITUDE);
    }

    @Test
    @Transactional
    void createPontosCardeaisWithExistingId() throws Exception {
        // Create the PontosCardeais with an existing ID
        pontosCardeais.setId(1L);

        int databaseSizeBeforeCreate = pontosCardeaisRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restPontosCardeaisMockMvc
            .perform(
                post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pontosCardeais))
            )
            .andExpect(status().isBadRequest());

        // Validate the PontosCardeais in the database
        List<PontosCardeais> pontosCardeaisList = pontosCardeaisRepository.findAll();
        assertThat(pontosCardeaisList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllPontosCardeais() throws Exception {
        // Initialize the database
        pontosCardeaisRepository.saveAndFlush(pontosCardeais);

        // Get all the pontosCardeaisList
        restPontosCardeaisMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pontosCardeais.getId().intValue())))
            .andExpect(jsonPath("$.[*].latitude").value(hasItem(DEFAULT_LATITUDE)))
            .andExpect(jsonPath("$.[*].longitude").value(hasItem(DEFAULT_LONGITUDE)));
    }

    @Test
    @Transactional
    void getPontosCardeais() throws Exception {
        // Initialize the database
        pontosCardeaisRepository.saveAndFlush(pontosCardeais);

        // Get the pontosCardeais
        restPontosCardeaisMockMvc
            .perform(get(ENTITY_API_URL_ID, pontosCardeais.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(pontosCardeais.getId().intValue()))
            .andExpect(jsonPath("$.latitude").value(DEFAULT_LATITUDE))
            .andExpect(jsonPath("$.longitude").value(DEFAULT_LONGITUDE));
    }

    @Test
    @Transactional
    void getNonExistingPontosCardeais() throws Exception {
        // Get the pontosCardeais
        restPontosCardeaisMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewPontosCardeais() throws Exception {
        // Initialize the database
        pontosCardeaisRepository.saveAndFlush(pontosCardeais);

        int databaseSizeBeforeUpdate = pontosCardeaisRepository.findAll().size();

        // Update the pontosCardeais
        PontosCardeais updatedPontosCardeais = pontosCardeaisRepository.findById(pontosCardeais.getId()).get();
        // Disconnect from session so that the updates on updatedPontosCardeais are not directly saved in db
        em.detach(updatedPontosCardeais);
        updatedPontosCardeais.latitude(UPDATED_LATITUDE).longitude(UPDATED_LONGITUDE);

        restPontosCardeaisMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedPontosCardeais.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedPontosCardeais))
            )
            .andExpect(status().isOk());

        // Validate the PontosCardeais in the database
        List<PontosCardeais> pontosCardeaisList = pontosCardeaisRepository.findAll();
        assertThat(pontosCardeaisList).hasSize(databaseSizeBeforeUpdate);
        PontosCardeais testPontosCardeais = pontosCardeaisList.get(pontosCardeaisList.size() - 1);
        assertThat(testPontosCardeais.getLatitude()).isEqualTo(UPDATED_LATITUDE);
        assertThat(testPontosCardeais.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
    }

    @Test
    @Transactional
    void putNonExistingPontosCardeais() throws Exception {
        int databaseSizeBeforeUpdate = pontosCardeaisRepository.findAll().size();
        pontosCardeais.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPontosCardeaisMockMvc
            .perform(
                put(ENTITY_API_URL_ID, pontosCardeais.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pontosCardeais))
            )
            .andExpect(status().isBadRequest());

        // Validate the PontosCardeais in the database
        List<PontosCardeais> pontosCardeaisList = pontosCardeaisRepository.findAll();
        assertThat(pontosCardeaisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchPontosCardeais() throws Exception {
        int databaseSizeBeforeUpdate = pontosCardeaisRepository.findAll().size();
        pontosCardeais.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPontosCardeaisMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(pontosCardeais))
            )
            .andExpect(status().isBadRequest());

        // Validate the PontosCardeais in the database
        List<PontosCardeais> pontosCardeaisList = pontosCardeaisRepository.findAll();
        assertThat(pontosCardeaisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamPontosCardeais() throws Exception {
        int databaseSizeBeforeUpdate = pontosCardeaisRepository.findAll().size();
        pontosCardeais.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPontosCardeaisMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(pontosCardeais)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the PontosCardeais in the database
        List<PontosCardeais> pontosCardeaisList = pontosCardeaisRepository.findAll();
        assertThat(pontosCardeaisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdatePontosCardeaisWithPatch() throws Exception {
        // Initialize the database
        pontosCardeaisRepository.saveAndFlush(pontosCardeais);

        int databaseSizeBeforeUpdate = pontosCardeaisRepository.findAll().size();

        // Update the pontosCardeais using partial update
        PontosCardeais partialUpdatedPontosCardeais = new PontosCardeais();
        partialUpdatedPontosCardeais.setId(pontosCardeais.getId());

        partialUpdatedPontosCardeais.longitude(UPDATED_LONGITUDE);

        restPontosCardeaisMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPontosCardeais.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPontosCardeais))
            )
            .andExpect(status().isOk());

        // Validate the PontosCardeais in the database
        List<PontosCardeais> pontosCardeaisList = pontosCardeaisRepository.findAll();
        assertThat(pontosCardeaisList).hasSize(databaseSizeBeforeUpdate);
        PontosCardeais testPontosCardeais = pontosCardeaisList.get(pontosCardeaisList.size() - 1);
        assertThat(testPontosCardeais.getLatitude()).isEqualTo(DEFAULT_LATITUDE);
        assertThat(testPontosCardeais.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
    }

    @Test
    @Transactional
    void fullUpdatePontosCardeaisWithPatch() throws Exception {
        // Initialize the database
        pontosCardeaisRepository.saveAndFlush(pontosCardeais);

        int databaseSizeBeforeUpdate = pontosCardeaisRepository.findAll().size();

        // Update the pontosCardeais using partial update
        PontosCardeais partialUpdatedPontosCardeais = new PontosCardeais();
        partialUpdatedPontosCardeais.setId(pontosCardeais.getId());

        partialUpdatedPontosCardeais.latitude(UPDATED_LATITUDE).longitude(UPDATED_LONGITUDE);

        restPontosCardeaisMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedPontosCardeais.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedPontosCardeais))
            )
            .andExpect(status().isOk());

        // Validate the PontosCardeais in the database
        List<PontosCardeais> pontosCardeaisList = pontosCardeaisRepository.findAll();
        assertThat(pontosCardeaisList).hasSize(databaseSizeBeforeUpdate);
        PontosCardeais testPontosCardeais = pontosCardeaisList.get(pontosCardeaisList.size() - 1);
        assertThat(testPontosCardeais.getLatitude()).isEqualTo(UPDATED_LATITUDE);
        assertThat(testPontosCardeais.getLongitude()).isEqualTo(UPDATED_LONGITUDE);
    }

    @Test
    @Transactional
    void patchNonExistingPontosCardeais() throws Exception {
        int databaseSizeBeforeUpdate = pontosCardeaisRepository.findAll().size();
        pontosCardeais.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPontosCardeaisMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, pontosCardeais.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pontosCardeais))
            )
            .andExpect(status().isBadRequest());

        // Validate the PontosCardeais in the database
        List<PontosCardeais> pontosCardeaisList = pontosCardeaisRepository.findAll();
        assertThat(pontosCardeaisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchPontosCardeais() throws Exception {
        int databaseSizeBeforeUpdate = pontosCardeaisRepository.findAll().size();
        pontosCardeais.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPontosCardeaisMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(pontosCardeais))
            )
            .andExpect(status().isBadRequest());

        // Validate the PontosCardeais in the database
        List<PontosCardeais> pontosCardeaisList = pontosCardeaisRepository.findAll();
        assertThat(pontosCardeaisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamPontosCardeais() throws Exception {
        int databaseSizeBeforeUpdate = pontosCardeaisRepository.findAll().size();
        pontosCardeais.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restPontosCardeaisMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(pontosCardeais))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the PontosCardeais in the database
        List<PontosCardeais> pontosCardeaisList = pontosCardeaisRepository.findAll();
        assertThat(pontosCardeaisList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deletePontosCardeais() throws Exception {
        // Initialize the database
        pontosCardeaisRepository.saveAndFlush(pontosCardeais);

        int databaseSizeBeforeDelete = pontosCardeaisRepository.findAll().size();

        // Delete the pontosCardeais
        restPontosCardeaisMockMvc
            .perform(delete(ENTITY_API_URL_ID, pontosCardeais.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PontosCardeais> pontosCardeaisList = pontosCardeaisRepository.findAll();
        assertThat(pontosCardeaisList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
