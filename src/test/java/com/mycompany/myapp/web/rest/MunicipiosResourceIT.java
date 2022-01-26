package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Municipios;
import com.mycompany.myapp.repository.MunicipiosRepository;
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
 * Integration tests for the {@link MunicipiosResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class MunicipiosResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/municipios";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private MunicipiosRepository municipiosRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMunicipiosMockMvc;

    private Municipios municipios;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Municipios createEntity(EntityManager em) {
        Municipios municipios = new Municipios().nome(DEFAULT_NOME).descricao(DEFAULT_DESCRICAO);
        return municipios;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Municipios createUpdatedEntity(EntityManager em) {
        Municipios municipios = new Municipios().nome(UPDATED_NOME).descricao(UPDATED_DESCRICAO);
        return municipios;
    }

    @BeforeEach
    public void initTest() {
        municipios = createEntity(em);
    }

    @Test
    @Transactional
    void createMunicipios() throws Exception {
        int databaseSizeBeforeCreate = municipiosRepository.findAll().size();
        // Create the Municipios
        restMunicipiosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(municipios)))
            .andExpect(status().isCreated());

        // Validate the Municipios in the database
        List<Municipios> municipiosList = municipiosRepository.findAll();
        assertThat(municipiosList).hasSize(databaseSizeBeforeCreate + 1);
        Municipios testMunicipios = municipiosList.get(municipiosList.size() - 1);
        assertThat(testMunicipios.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testMunicipios.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
    }

    @Test
    @Transactional
    void createMunicipiosWithExistingId() throws Exception {
        // Create the Municipios with an existing ID
        municipios.setId(1L);

        int databaseSizeBeforeCreate = municipiosRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restMunicipiosMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(municipios)))
            .andExpect(status().isBadRequest());

        // Validate the Municipios in the database
        List<Municipios> municipiosList = municipiosRepository.findAll();
        assertThat(municipiosList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllMunicipios() throws Exception {
        // Initialize the database
        municipiosRepository.saveAndFlush(municipios);

        // Get all the municipiosList
        restMunicipiosMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(municipios.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)));
    }

    @Test
    @Transactional
    void getMunicipios() throws Exception {
        // Initialize the database
        municipiosRepository.saveAndFlush(municipios);

        // Get the municipios
        restMunicipiosMockMvc
            .perform(get(ENTITY_API_URL_ID, municipios.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(municipios.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO));
    }

    @Test
    @Transactional
    void getNonExistingMunicipios() throws Exception {
        // Get the municipios
        restMunicipiosMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewMunicipios() throws Exception {
        // Initialize the database
        municipiosRepository.saveAndFlush(municipios);

        int databaseSizeBeforeUpdate = municipiosRepository.findAll().size();

        // Update the municipios
        Municipios updatedMunicipios = municipiosRepository.findById(municipios.getId()).get();
        // Disconnect from session so that the updates on updatedMunicipios are not directly saved in db
        em.detach(updatedMunicipios);
        updatedMunicipios.nome(UPDATED_NOME).descricao(UPDATED_DESCRICAO);

        restMunicipiosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedMunicipios.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedMunicipios))
            )
            .andExpect(status().isOk());

        // Validate the Municipios in the database
        List<Municipios> municipiosList = municipiosRepository.findAll();
        assertThat(municipiosList).hasSize(databaseSizeBeforeUpdate);
        Municipios testMunicipios = municipiosList.get(municipiosList.size() - 1);
        assertThat(testMunicipios.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testMunicipios.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    void putNonExistingMunicipios() throws Exception {
        int databaseSizeBeforeUpdate = municipiosRepository.findAll().size();
        municipios.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMunicipiosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, municipios.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(municipios))
            )
            .andExpect(status().isBadRequest());

        // Validate the Municipios in the database
        List<Municipios> municipiosList = municipiosRepository.findAll();
        assertThat(municipiosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchMunicipios() throws Exception {
        int databaseSizeBeforeUpdate = municipiosRepository.findAll().size();
        municipios.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMunicipiosMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(municipios))
            )
            .andExpect(status().isBadRequest());

        // Validate the Municipios in the database
        List<Municipios> municipiosList = municipiosRepository.findAll();
        assertThat(municipiosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamMunicipios() throws Exception {
        int databaseSizeBeforeUpdate = municipiosRepository.findAll().size();
        municipios.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMunicipiosMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(municipios)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Municipios in the database
        List<Municipios> municipiosList = municipiosRepository.findAll();
        assertThat(municipiosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateMunicipiosWithPatch() throws Exception {
        // Initialize the database
        municipiosRepository.saveAndFlush(municipios);

        int databaseSizeBeforeUpdate = municipiosRepository.findAll().size();

        // Update the municipios using partial update
        Municipios partialUpdatedMunicipios = new Municipios();
        partialUpdatedMunicipios.setId(municipios.getId());

        restMunicipiosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMunicipios.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMunicipios))
            )
            .andExpect(status().isOk());

        // Validate the Municipios in the database
        List<Municipios> municipiosList = municipiosRepository.findAll();
        assertThat(municipiosList).hasSize(databaseSizeBeforeUpdate);
        Municipios testMunicipios = municipiosList.get(municipiosList.size() - 1);
        assertThat(testMunicipios.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testMunicipios.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
    }

    @Test
    @Transactional
    void fullUpdateMunicipiosWithPatch() throws Exception {
        // Initialize the database
        municipiosRepository.saveAndFlush(municipios);

        int databaseSizeBeforeUpdate = municipiosRepository.findAll().size();

        // Update the municipios using partial update
        Municipios partialUpdatedMunicipios = new Municipios();
        partialUpdatedMunicipios.setId(municipios.getId());

        partialUpdatedMunicipios.nome(UPDATED_NOME).descricao(UPDATED_DESCRICAO);

        restMunicipiosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedMunicipios.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedMunicipios))
            )
            .andExpect(status().isOk());

        // Validate the Municipios in the database
        List<Municipios> municipiosList = municipiosRepository.findAll();
        assertThat(municipiosList).hasSize(databaseSizeBeforeUpdate);
        Municipios testMunicipios = municipiosList.get(municipiosList.size() - 1);
        assertThat(testMunicipios.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testMunicipios.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    void patchNonExistingMunicipios() throws Exception {
        int databaseSizeBeforeUpdate = municipiosRepository.findAll().size();
        municipios.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMunicipiosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, municipios.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(municipios))
            )
            .andExpect(status().isBadRequest());

        // Validate the Municipios in the database
        List<Municipios> municipiosList = municipiosRepository.findAll();
        assertThat(municipiosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchMunicipios() throws Exception {
        int databaseSizeBeforeUpdate = municipiosRepository.findAll().size();
        municipios.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMunicipiosMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(municipios))
            )
            .andExpect(status().isBadRequest());

        // Validate the Municipios in the database
        List<Municipios> municipiosList = municipiosRepository.findAll();
        assertThat(municipiosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamMunicipios() throws Exception {
        int databaseSizeBeforeUpdate = municipiosRepository.findAll().size();
        municipios.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restMunicipiosMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(municipios))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Municipios in the database
        List<Municipios> municipiosList = municipiosRepository.findAll();
        assertThat(municipiosList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteMunicipios() throws Exception {
        // Initialize the database
        municipiosRepository.saveAndFlush(municipios);

        int databaseSizeBeforeDelete = municipiosRepository.findAll().size();

        // Delete the municipios
        restMunicipiosMockMvc
            .perform(delete(ENTITY_API_URL_ID, municipios.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Municipios> municipiosList = municipiosRepository.findAll();
        assertThat(municipiosList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
