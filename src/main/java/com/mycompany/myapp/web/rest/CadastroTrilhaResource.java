package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.CadastroTrilha;
import com.mycompany.myapp.repository.CadastroTrilhaRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.CadastroTrilha}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CadastroTrilhaResource {

    private final Logger log = LoggerFactory.getLogger(CadastroTrilhaResource.class);

    private static final String ENTITY_NAME = "cadastroTrilha";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CadastroTrilhaRepository cadastroTrilhaRepository;

    public CadastroTrilhaResource(CadastroTrilhaRepository cadastroTrilhaRepository) {
        this.cadastroTrilhaRepository = cadastroTrilhaRepository;
    }

    /**
     * {@code POST  /cadastro-trilhas} : Create a new cadastroTrilha.
     *
     * @param cadastroTrilha the cadastroTrilha to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cadastroTrilha, or with status {@code 400 (Bad Request)} if the cadastroTrilha has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cadastro-trilhas")
    public ResponseEntity<CadastroTrilha> createCadastroTrilha(@Valid @RequestBody CadastroTrilha cadastroTrilha)
        throws URISyntaxException {
        log.debug("REST request to save CadastroTrilha : {}", cadastroTrilha);
        if (cadastroTrilha.getId() != null) {
            throw new BadRequestAlertException("A new cadastroTrilha cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CadastroTrilha result = cadastroTrilhaRepository.save(cadastroTrilha);
        return ResponseEntity
            .created(new URI("/api/cadastro-trilhas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cadastro-trilhas/:id} : Updates an existing cadastroTrilha.
     *
     * @param id the id of the cadastroTrilha to save.
     * @param cadastroTrilha the cadastroTrilha to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cadastroTrilha,
     * or with status {@code 400 (Bad Request)} if the cadastroTrilha is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cadastroTrilha couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cadastro-trilhas/{id}")
    public ResponseEntity<CadastroTrilha> updateCadastroTrilha(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CadastroTrilha cadastroTrilha
    ) throws URISyntaxException {
        log.debug("REST request to update CadastroTrilha : {}, {}", id, cadastroTrilha);
        if (cadastroTrilha.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cadastroTrilha.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cadastroTrilhaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CadastroTrilha result = cadastroTrilhaRepository.save(cadastroTrilha);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cadastroTrilha.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /cadastro-trilhas/:id} : Partial updates given fields of an existing cadastroTrilha, field will ignore if it is null
     *
     * @param id the id of the cadastroTrilha to save.
     * @param cadastroTrilha the cadastroTrilha to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cadastroTrilha,
     * or with status {@code 400 (Bad Request)} if the cadastroTrilha is not valid,
     * or with status {@code 404 (Not Found)} if the cadastroTrilha is not found,
     * or with status {@code 500 (Internal Server Error)} if the cadastroTrilha couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/cadastro-trilhas/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CadastroTrilha> partialUpdateCadastroTrilha(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CadastroTrilha cadastroTrilha
    ) throws URISyntaxException {
        log.debug("REST request to partial update CadastroTrilha partially : {}, {}", id, cadastroTrilha);
        if (cadastroTrilha.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cadastroTrilha.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!cadastroTrilhaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CadastroTrilha> result = cadastroTrilhaRepository
            .findById(cadastroTrilha.getId())
            .map(existingCadastroTrilha -> {
                if (cadastroTrilha.getNome() != null) {
                    existingCadastroTrilha.setNome(cadastroTrilha.getNome());
                }
                if (cadastroTrilha.getDescricao() != null) {
                    existingCadastroTrilha.setDescricao(cadastroTrilha.getDescricao());
                }
                if (cadastroTrilha.getComprimento() != null) {
                    existingCadastroTrilha.setComprimento(cadastroTrilha.getComprimento());
                }
                if (cadastroTrilha.getAvaliacao() != null) {
                    existingCadastroTrilha.setAvaliacao(cadastroTrilha.getAvaliacao());
                }
                if (cadastroTrilha.getDataHora() != null) {
                    existingCadastroTrilha.setDataHora(cadastroTrilha.getDataHora());
                }

                return existingCadastroTrilha;
            })
            .map(cadastroTrilhaRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cadastroTrilha.getId().toString())
        );
    }

    /**
     * {@code GET  /cadastro-trilhas} : get all the cadastroTrilhas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cadastroTrilhas in body.
     */
    @GetMapping("/cadastro-trilhas")
    public List<CadastroTrilha> getAllCadastroTrilhas() {
        log.debug("REST request to get all CadastroTrilhas");
        return cadastroTrilhaRepository.findAll();
    }

    /**
     * {@code GET  /cadastro-trilhas/:id} : get the "id" cadastroTrilha.
     *
     * @param id the id of the cadastroTrilha to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cadastroTrilha, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cadastro-trilhas/{id}")
    public ResponseEntity<CadastroTrilha> getCadastroTrilha(@PathVariable Long id) {
        log.debug("REST request to get CadastroTrilha : {}", id);
        Optional<CadastroTrilha> cadastroTrilha = cadastroTrilhaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cadastroTrilha);
    }

    /**
     * {@code DELETE  /cadastro-trilhas/:id} : delete the "id" cadastroTrilha.
     *
     * @param id the id of the cadastroTrilha to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cadastro-trilhas/{id}")
    public ResponseEntity<Void> deleteCadastroTrilha(@PathVariable Long id) {
        log.debug("REST request to delete CadastroTrilha : {}", id);
        cadastroTrilhaRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
