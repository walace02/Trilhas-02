package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Trilhas;
import com.mycompany.myapp.repository.TrilhasRepository;
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
 * Integration tests for the {@link TrilhasResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class TrilhasResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final Float DEFAULT_COMPRIMENTO = 1F;
    private static final Float UPDATED_COMPRIMENTO = 2F;

    private static final String DEFAULT_AVALIACAO = "AAAAAAAAAA";
    private static final String UPDATED_AVALIACAO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/trilhas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private TrilhasRepository trilhasRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTrilhasMockMvc;

    private Trilhas trilhas;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Trilhas createEntity(EntityManager em) {
        Trilhas trilhas = new Trilhas()
            .nome(DEFAULT_NOME)
            .descricao(DEFAULT_DESCRICAO)
            .comprimento(DEFAULT_COMPRIMENTO)
            .avaliacao(DEFAULT_AVALIACAO);
        return trilhas;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Trilhas createUpdatedEntity(EntityManager em) {
        Trilhas trilhas = new Trilhas()
            .nome(UPDATED_NOME)
            .descricao(UPDATED_DESCRICAO)
            .comprimento(UPDATED_COMPRIMENTO)
            .avaliacao(UPDATED_AVALIACAO);
        return trilhas;
    }

    @BeforeEach
    public void initTest() {
        trilhas = createEntity(em);
    }

    @Test
    @Transactional
    void createTrilhas() throws Exception {
        int databaseSizeBeforeCreate = trilhasRepository.findAll().size();
        // Create the Trilhas
        restTrilhasMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(trilhas)))
            .andExpect(status().isCreated());

        // Validate the Trilhas in the database
        List<Trilhas> trilhasList = trilhasRepository.findAll();
        assertThat(trilhasList).hasSize(databaseSizeBeforeCreate + 1);
        Trilhas testTrilhas = trilhasList.get(trilhasList.size() - 1);
        assertThat(testTrilhas.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testTrilhas.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testTrilhas.getComprimento()).isEqualTo(DEFAULT_COMPRIMENTO);
        assertThat(testTrilhas.getAvaliacao()).isEqualTo(DEFAULT_AVALIACAO);
    }

    @Test
    @Transactional
    void createTrilhasWithExistingId() throws Exception {
        // Create the Trilhas with an existing ID
        trilhas.setId(1L);

        int databaseSizeBeforeCreate = trilhasRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrilhasMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(trilhas)))
            .andExpect(status().isBadRequest());

        // Validate the Trilhas in the database
        List<Trilhas> trilhasList = trilhasRepository.findAll();
        assertThat(trilhasList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = trilhasRepository.findAll().size();
        // set the field null
        trilhas.setNome(null);

        // Create the Trilhas, which fails.

        restTrilhasMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(trilhas)))
            .andExpect(status().isBadRequest());

        List<Trilhas> trilhasList = trilhasRepository.findAll();
        assertThat(trilhasList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkComprimentoIsRequired() throws Exception {
        int databaseSizeBeforeTest = trilhasRepository.findAll().size();
        // set the field null
        trilhas.setComprimento(null);

        // Create the Trilhas, which fails.

        restTrilhasMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(trilhas)))
            .andExpect(status().isBadRequest());

        List<Trilhas> trilhasList = trilhasRepository.findAll();
        assertThat(trilhasList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllTrilhas() throws Exception {
        // Initialize the database
        trilhasRepository.saveAndFlush(trilhas);

        // Get all the trilhasList
        restTrilhasMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(trilhas.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)))
            .andExpect(jsonPath("$.[*].comprimento").value(hasItem(DEFAULT_COMPRIMENTO.doubleValue())))
            .andExpect(jsonPath("$.[*].avaliacao").value(hasItem(DEFAULT_AVALIACAO)));
    }

    @Test
    @Transactional
    void getTrilhas() throws Exception {
        // Initialize the database
        trilhasRepository.saveAndFlush(trilhas);

        // Get the trilhas
        restTrilhasMockMvc
            .perform(get(ENTITY_API_URL_ID, trilhas.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(trilhas.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO))
            .andExpect(jsonPath("$.comprimento").value(DEFAULT_COMPRIMENTO.doubleValue()))
            .andExpect(jsonPath("$.avaliacao").value(DEFAULT_AVALIACAO));
    }

    @Test
    @Transactional
    void getNonExistingTrilhas() throws Exception {
        // Get the trilhas
        restTrilhasMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putNewTrilhas() throws Exception {
        // Initialize the database
        trilhasRepository.saveAndFlush(trilhas);

        int databaseSizeBeforeUpdate = trilhasRepository.findAll().size();

        // Update the trilhas
        Trilhas updatedTrilhas = trilhasRepository.findById(trilhas.getId()).get();
        // Disconnect from session so that the updates on updatedTrilhas are not directly saved in db
        em.detach(updatedTrilhas);
        updatedTrilhas.nome(UPDATED_NOME).descricao(UPDATED_DESCRICAO).comprimento(UPDATED_COMPRIMENTO).avaliacao(UPDATED_AVALIACAO);

        restTrilhasMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedTrilhas.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedTrilhas))
            )
            .andExpect(status().isOk());

        // Validate the Trilhas in the database
        List<Trilhas> trilhasList = trilhasRepository.findAll();
        assertThat(trilhasList).hasSize(databaseSizeBeforeUpdate);
        Trilhas testTrilhas = trilhasList.get(trilhasList.size() - 1);
        assertThat(testTrilhas.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testTrilhas.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testTrilhas.getComprimento()).isEqualTo(UPDATED_COMPRIMENTO);
        assertThat(testTrilhas.getAvaliacao()).isEqualTo(UPDATED_AVALIACAO);
    }

    @Test
    @Transactional
    void putNonExistingTrilhas() throws Exception {
        int databaseSizeBeforeUpdate = trilhasRepository.findAll().size();
        trilhas.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTrilhasMockMvc
            .perform(
                put(ENTITY_API_URL_ID, trilhas.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(trilhas))
            )
            .andExpect(status().isBadRequest());

        // Validate the Trilhas in the database
        List<Trilhas> trilhasList = trilhasRepository.findAll();
        assertThat(trilhasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchTrilhas() throws Exception {
        int databaseSizeBeforeUpdate = trilhasRepository.findAll().size();
        trilhas.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTrilhasMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(trilhas))
            )
            .andExpect(status().isBadRequest());

        // Validate the Trilhas in the database
        List<Trilhas> trilhasList = trilhasRepository.findAll();
        assertThat(trilhasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamTrilhas() throws Exception {
        int databaseSizeBeforeUpdate = trilhasRepository.findAll().size();
        trilhas.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTrilhasMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(trilhas)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Trilhas in the database
        List<Trilhas> trilhasList = trilhasRepository.findAll();
        assertThat(trilhasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateTrilhasWithPatch() throws Exception {
        // Initialize the database
        trilhasRepository.saveAndFlush(trilhas);

        int databaseSizeBeforeUpdate = trilhasRepository.findAll().size();

        // Update the trilhas using partial update
        Trilhas partialUpdatedTrilhas = new Trilhas();
        partialUpdatedTrilhas.setId(trilhas.getId());

        partialUpdatedTrilhas.comprimento(UPDATED_COMPRIMENTO);

        restTrilhasMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTrilhas.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTrilhas))
            )
            .andExpect(status().isOk());

        // Validate the Trilhas in the database
        List<Trilhas> trilhasList = trilhasRepository.findAll();
        assertThat(trilhasList).hasSize(databaseSizeBeforeUpdate);
        Trilhas testTrilhas = trilhasList.get(trilhasList.size() - 1);
        assertThat(testTrilhas.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testTrilhas.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testTrilhas.getComprimento()).isEqualTo(UPDATED_COMPRIMENTO);
        assertThat(testTrilhas.getAvaliacao()).isEqualTo(DEFAULT_AVALIACAO);
    }

    @Test
    @Transactional
    void fullUpdateTrilhasWithPatch() throws Exception {
        // Initialize the database
        trilhasRepository.saveAndFlush(trilhas);

        int databaseSizeBeforeUpdate = trilhasRepository.findAll().size();

        // Update the trilhas using partial update
        Trilhas partialUpdatedTrilhas = new Trilhas();
        partialUpdatedTrilhas.setId(trilhas.getId());

        partialUpdatedTrilhas.nome(UPDATED_NOME).descricao(UPDATED_DESCRICAO).comprimento(UPDATED_COMPRIMENTO).avaliacao(UPDATED_AVALIACAO);

        restTrilhasMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedTrilhas.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedTrilhas))
            )
            .andExpect(status().isOk());

        // Validate the Trilhas in the database
        List<Trilhas> trilhasList = trilhasRepository.findAll();
        assertThat(trilhasList).hasSize(databaseSizeBeforeUpdate);
        Trilhas testTrilhas = trilhasList.get(trilhasList.size() - 1);
        assertThat(testTrilhas.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testTrilhas.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testTrilhas.getComprimento()).isEqualTo(UPDATED_COMPRIMENTO);
        assertThat(testTrilhas.getAvaliacao()).isEqualTo(UPDATED_AVALIACAO);
    }

    @Test
    @Transactional
    void patchNonExistingTrilhas() throws Exception {
        int databaseSizeBeforeUpdate = trilhasRepository.findAll().size();
        trilhas.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTrilhasMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, trilhas.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(trilhas))
            )
            .andExpect(status().isBadRequest());

        // Validate the Trilhas in the database
        List<Trilhas> trilhasList = trilhasRepository.findAll();
        assertThat(trilhasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchTrilhas() throws Exception {
        int databaseSizeBeforeUpdate = trilhasRepository.findAll().size();
        trilhas.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTrilhasMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(trilhas))
            )
            .andExpect(status().isBadRequest());

        // Validate the Trilhas in the database
        List<Trilhas> trilhasList = trilhasRepository.findAll();
        assertThat(trilhasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamTrilhas() throws Exception {
        int databaseSizeBeforeUpdate = trilhasRepository.findAll().size();
        trilhas.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restTrilhasMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(trilhas)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Trilhas in the database
        List<Trilhas> trilhasList = trilhasRepository.findAll();
        assertThat(trilhasList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteTrilhas() throws Exception {
        // Initialize the database
        trilhasRepository.saveAndFlush(trilhas);

        int databaseSizeBeforeDelete = trilhasRepository.findAll().size();

        // Delete the trilhas
        restTrilhasMockMvc
            .perform(delete(ENTITY_API_URL_ID, trilhas.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Trilhas> trilhasList = trilhasRepository.findAll();
        assertThat(trilhasList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
