package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Trilha;
import com.mycompany.myapp.repository.TrilhaRepository;
import java.time.LocalDate;
import java.time.ZoneId;
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
 * Integration tests for the {@link TrilhaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TrilhaResourceIT {

    private static final String DEFAULT_NOME_TRILHA = "AAAAAAAAAA";
    private static final String UPDATED_NOME_TRILHA = "BBBBBBBBBB";

    private static final String DEFAULT_NOME_MUNICIPIO = "AAAAAAAAAA";
    private static final String UPDATED_NOME_MUNICIPIO = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final Float DEFAULT_COMPRIMENTO = 1F;
    private static final Float UPDATED_COMPRIMENTO = 2F;

    private static final LocalDate DEFAULT_DATA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA = LocalDate.now(ZoneId.systemDefault());

    private static final String ENTITY_API_URL = "/api/trilhas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TrilhaRepository trilhaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTrilhaMockMvc;

    private Trilha trilha;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Trilha createEntity(EntityManager em) {
        Trilha trilha = new Trilha()
            .nomeTrilha(DEFAULT_NOME_TRILHA)
            .nomeMunicipio(DEFAULT_NOME_MUNICIPIO)
            .descricao(DEFAULT_DESCRICAO)
            .comprimento(DEFAULT_COMPRIMENTO)
            .data(DEFAULT_DATA);
        return trilha;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Trilha createUpdatedEntity(EntityManager em) {
        Trilha trilha = new Trilha()
            .nomeTrilha(UPDATED_NOME_TRILHA)
            .nomeMunicipio(UPDATED_NOME_MUNICIPIO)
            .descricao(UPDATED_DESCRICAO)
            .comprimento(UPDATED_COMPRIMENTO)
            .data(UPDATED_DATA);
        return trilha;
    }

    @BeforeEach
    public void initTest() {
        trilha = createEntity(em);
    }

    @Test
    @Transactional
    void createTrilha() throws Exception {
        int databaseSizeBeforeCreate = trilhaRepository.findAll().size();
        // Create the Trilha
        restTrilhaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(trilha)))
            .andExpect(status().isCreated());

        // Validate the Trilha in the database
        List<Trilha> trilhaList = trilhaRepository.findAll();
        assertThat(trilhaList).hasSize(databaseSizeBeforeCreate + 1);
        Trilha testTrilha = trilhaList.get(trilhaList.size() - 1);
        assertThat(testTrilha.getNomeTrilha()).isEqualTo(DEFAULT_NOME_TRILHA);
        assertThat(testTrilha.getNomeMunicipio()).isEqualTo(DEFAULT_NOME_MUNICIPIO);
        assertThat(testTrilha.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testTrilha.getComprimento()).isEqualTo(DEFAULT_COMPRIMENTO);
        assertThat(testTrilha.getData()).isEqualTo(DEFAULT_DATA);
    }

    @Test
    @Transactional
    void createTrilhaWithExistingId() throws Exception {
        // Create the Trilha with an existing ID
        trilha.setId(1L);

        int databaseSizeBeforeCreate = trilhaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrilhaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(trilha)))
            .andExpect(status().isBadRequest());

        // Validate the Trilha in the database
        List<Trilha> trilhaList = trilhaRepository.findAll();
        assertThat(trilhaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomeTrilhaIsRequired() throws Exception {
        int databaseSizeBeforeTest = trilhaRepository.findAll().size();
        // set the field null
        trilha.setNomeTrilha(null);

        // Create the Trilha, which fails.

        restTrilhaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(trilha)))
            .andExpect(status().isBadRequest());

        List<Trilha> trilhaList = trilhaRepository.findAll();
        assertThat(trilhaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkNomeMunicipioIsRequired() throws Exception {
        int databaseSizeBeforeTest = trilhaRepository.findAll().size();
        // set the field null
        trilha.setNomeMunicipio(null);

        // Create the Trilha, which fails.

        restTrilhaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(trilha)))
            .andExpect(status().isBadRequest());

        List<Trilha> trilhaList = trilhaRepository.findAll();
        assertThat(trilhaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkComprimentoIsRequired() throws Exception {
        int databaseSizeBeforeTest = trilhaRepository.findAll().size();
        // set the field null
        trilha.setComprimento(null);

        // Create the Trilha, which fails.

        restTrilhaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(trilha)))
            .andExpect(status().isBadRequest());

        List<Trilha> trilhaList = trilhaRepository.findAll();
        assertThat(trilhaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTrilhas() throws Exception {
        // Initialize the database
        trilhaRepository.saveAndFlush(trilha);

        // Get all the trilhaList
        restTrilhaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(trilha.getId().intValue())))
            .andExpect(jsonPath("$.[*].nomeTrilha").value(hasItem(DEFAULT_NOME_TRILHA)))
            .andExpect(jsonPath("$.[*].nomeMunicipio").value(hasItem(DEFAULT_NOME_MUNICIPIO)))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)))
            .andExpect(jsonPath("$.[*].comprimento").value(hasItem(DEFAULT_COMPRIMENTO.doubleValue())))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA.toString())));
    }

    @Test
    @Transactional
    void getTrilha() throws Exception {
        // Initialize the database
        trilhaRepository.saveAndFlush(trilha);

        // Get the trilha
        restTrilhaMockMvc
            .perform(get(ENTITY_API_URL_ID, trilha.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(trilha.getId().intValue()))
            .andExpect(jsonPath("$.nomeTrilha").value(DEFAULT_NOME_TRILHA))
            .andExpect(jsonPath("$.nomeMunicipio").value(DEFAULT_NOME_MUNICIPIO))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO))
            .andExpect(jsonPath("$.comprimento").value(DEFAULT_COMPRIMENTO.doubleValue()))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA.toString()));
    }

    @Test
    @Transactional
    void getNonExistingTrilha() throws Exception {
        // Get the trilha
        restTrilhaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTrilha() throws Exception {
        // Initialize the database
        trilhaRepository.saveAndFlush(trilha);

        int databaseSizeBeforeUpdate = trilhaRepository.findAll().size();

        // Update the trilha
        Trilha updatedTrilha = trilhaRepository.findById(trilha.getId()).get();
        // Disconnect from session so that the updates on updatedTrilha are not directly saved in db
        em.detach(updatedTrilha);
        updatedTrilha
            .nomeTrilha(UPDATED_NOME_TRILHA)
            .nomeMunicipio(UPDATED_NOME_MUNICIPIO)
            .descricao(UPDATED_DESCRICAO)
            .comprimento(UPDATED_COMPRIMENTO)
            .data(UPDATED_DATA);

        restTrilhaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTrilha.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTrilha))
            )
            .andExpect(status().isOk());

        // Validate the Trilha in the database
        List<Trilha> trilhaList = trilhaRepository.findAll();
        assertThat(trilhaList).hasSize(databaseSizeBeforeUpdate);
        Trilha testTrilha = trilhaList.get(trilhaList.size() - 1);
        assertThat(testTrilha.getNomeTrilha()).isEqualTo(UPDATED_NOME_TRILHA);
        assertThat(testTrilha.getNomeMunicipio()).isEqualTo(UPDATED_NOME_MUNICIPIO);
        assertThat(testTrilha.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testTrilha.getComprimento()).isEqualTo(UPDATED_COMPRIMENTO);
        assertThat(testTrilha.getData()).isEqualTo(UPDATED_DATA);
    }

    @Test
    @Transactional
    void putNonExistingTrilha() throws Exception {
        int databaseSizeBeforeUpdate = trilhaRepository.findAll().size();
        trilha.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTrilhaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, trilha.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(trilha))
            )
            .andExpect(status().isBadRequest());

        // Validate the Trilha in the database
        List<Trilha> trilhaList = trilhaRepository.findAll();
        assertThat(trilhaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTrilha() throws Exception {
        int databaseSizeBeforeUpdate = trilhaRepository.findAll().size();
        trilha.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTrilhaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(trilha))
            )
            .andExpect(status().isBadRequest());

        // Validate the Trilha in the database
        List<Trilha> trilhaList = trilhaRepository.findAll();
        assertThat(trilhaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTrilha() throws Exception {
        int databaseSizeBeforeUpdate = trilhaRepository.findAll().size();
        trilha.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTrilhaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(trilha)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Trilha in the database
        List<Trilha> trilhaList = trilhaRepository.findAll();
        assertThat(trilhaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTrilhaWithPatch() throws Exception {
        // Initialize the database
        trilhaRepository.saveAndFlush(trilha);

        int databaseSizeBeforeUpdate = trilhaRepository.findAll().size();

        // Update the trilha using partial update
        Trilha partialUpdatedTrilha = new Trilha();
        partialUpdatedTrilha.setId(trilha.getId());

        partialUpdatedTrilha.nomeTrilha(UPDATED_NOME_TRILHA).descricao(UPDATED_DESCRICAO).data(UPDATED_DATA);

        restTrilhaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTrilha.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTrilha))
            )
            .andExpect(status().isOk());

        // Validate the Trilha in the database
        List<Trilha> trilhaList = trilhaRepository.findAll();
        assertThat(trilhaList).hasSize(databaseSizeBeforeUpdate);
        Trilha testTrilha = trilhaList.get(trilhaList.size() - 1);
        assertThat(testTrilha.getNomeTrilha()).isEqualTo(UPDATED_NOME_TRILHA);
        assertThat(testTrilha.getNomeMunicipio()).isEqualTo(DEFAULT_NOME_MUNICIPIO);
        assertThat(testTrilha.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testTrilha.getComprimento()).isEqualTo(DEFAULT_COMPRIMENTO);
        assertThat(testTrilha.getData()).isEqualTo(UPDATED_DATA);
    }

    @Test
    @Transactional
    void fullUpdateTrilhaWithPatch() throws Exception {
        // Initialize the database
        trilhaRepository.saveAndFlush(trilha);

        int databaseSizeBeforeUpdate = trilhaRepository.findAll().size();

        // Update the trilha using partial update
        Trilha partialUpdatedTrilha = new Trilha();
        partialUpdatedTrilha.setId(trilha.getId());

        partialUpdatedTrilha
            .nomeTrilha(UPDATED_NOME_TRILHA)
            .nomeMunicipio(UPDATED_NOME_MUNICIPIO)
            .descricao(UPDATED_DESCRICAO)
            .comprimento(UPDATED_COMPRIMENTO)
            .data(UPDATED_DATA);

        restTrilhaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTrilha.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTrilha))
            )
            .andExpect(status().isOk());

        // Validate the Trilha in the database
        List<Trilha> trilhaList = trilhaRepository.findAll();
        assertThat(trilhaList).hasSize(databaseSizeBeforeUpdate);
        Trilha testTrilha = trilhaList.get(trilhaList.size() - 1);
        assertThat(testTrilha.getNomeTrilha()).isEqualTo(UPDATED_NOME_TRILHA);
        assertThat(testTrilha.getNomeMunicipio()).isEqualTo(UPDATED_NOME_MUNICIPIO);
        assertThat(testTrilha.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testTrilha.getComprimento()).isEqualTo(UPDATED_COMPRIMENTO);
        assertThat(testTrilha.getData()).isEqualTo(UPDATED_DATA);
    }

    @Test
    @Transactional
    void patchNonExistingTrilha() throws Exception {
        int databaseSizeBeforeUpdate = trilhaRepository.findAll().size();
        trilha.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTrilhaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, trilha.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(trilha))
            )
            .andExpect(status().isBadRequest());

        // Validate the Trilha in the database
        List<Trilha> trilhaList = trilhaRepository.findAll();
        assertThat(trilhaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTrilha() throws Exception {
        int databaseSizeBeforeUpdate = trilhaRepository.findAll().size();
        trilha.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTrilhaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(trilha))
            )
            .andExpect(status().isBadRequest());

        // Validate the Trilha in the database
        List<Trilha> trilhaList = trilhaRepository.findAll();
        assertThat(trilhaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTrilha() throws Exception {
        int databaseSizeBeforeUpdate = trilhaRepository.findAll().size();
        trilha.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTrilhaMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(trilha)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Trilha in the database
        List<Trilha> trilhaList = trilhaRepository.findAll();
        assertThat(trilhaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTrilha() throws Exception {
        // Initialize the database
        trilhaRepository.saveAndFlush(trilha);

        int databaseSizeBeforeDelete = trilhaRepository.findAll().size();

        // Delete the trilha
        restTrilhaMockMvc
            .perform(delete(ENTITY_API_URL_ID, trilha.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Trilha> trilhaList = trilhaRepository.findAll();
        assertThat(trilhaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
