package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.SituacoesTrilha;
import com.mycompany.myapp.repository.SituacoesTrilhaRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.SituacoesTrilha}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SituacoesTrilhaResource {

    private final Logger log = LoggerFactory.getLogger(SituacoesTrilhaResource.class);

    private static final String ENTITY_NAME = "situacoesTrilha";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SituacoesTrilhaRepository situacoesTrilhaRepository;

    public SituacoesTrilhaResource(SituacoesTrilhaRepository situacoesTrilhaRepository) {
        this.situacoesTrilhaRepository = situacoesTrilhaRepository;
    }

    /**
     * {@code POST  /situacoes-trilhas} : Create a new situacoesTrilha.
     *
     * @param situacoesTrilha the situacoesTrilha to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new situacoesTrilha, or with status {@code 400 (Bad Request)} if the situacoesTrilha has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/situacoes-trilhas")
    public ResponseEntity<SituacoesTrilha> createSituacoesTrilha(@RequestBody SituacoesTrilha situacoesTrilha) throws URISyntaxException {
        log.debug("REST request to save SituacoesTrilha : {}", situacoesTrilha);
        if (situacoesTrilha.getId() != null) {
            throw new BadRequestAlertException("A new situacoesTrilha cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SituacoesTrilha result = situacoesTrilhaRepository.save(situacoesTrilha);
        return ResponseEntity
            .created(new URI("/api/situacoes-trilhas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /situacoes-trilhas/:id} : Updates an existing situacoesTrilha.
     *
     * @param id the id of the situacoesTrilha to save.
     * @param situacoesTrilha the situacoesTrilha to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated situacoesTrilha,
     * or with status {@code 400 (Bad Request)} if the situacoesTrilha is not valid,
     * or with status {@code 500 (Internal Server Error)} if the situacoesTrilha couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/situacoes-trilhas/{id}")
    public ResponseEntity<SituacoesTrilha> updateSituacoesTrilha(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SituacoesTrilha situacoesTrilha
    ) throws URISyntaxException {
        log.debug("REST request to update SituacoesTrilha : {}, {}", id, situacoesTrilha);
        if (situacoesTrilha.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, situacoesTrilha.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!situacoesTrilhaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        SituacoesTrilha result = situacoesTrilhaRepository.save(situacoesTrilha);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, situacoesTrilha.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /situacoes-trilhas/:id} : Partial updates given fields of an existing situacoesTrilha, field will ignore if it is null
     *
     * @param id the id of the situacoesTrilha to save.
     * @param situacoesTrilha the situacoesTrilha to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated situacoesTrilha,
     * or with status {@code 400 (Bad Request)} if the situacoesTrilha is not valid,
     * or with status {@code 404 (Not Found)} if the situacoesTrilha is not found,
     * or with status {@code 500 (Internal Server Error)} if the situacoesTrilha couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/situacoes-trilhas/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<SituacoesTrilha> partialUpdateSituacoesTrilha(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SituacoesTrilha situacoesTrilha
    ) throws URISyntaxException {
        log.debug("REST request to partial update SituacoesTrilha partially : {}, {}", id, situacoesTrilha);
        if (situacoesTrilha.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, situacoesTrilha.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!situacoesTrilhaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SituacoesTrilha> result = situacoesTrilhaRepository
            .findById(situacoesTrilha.getId())
            .map(existingSituacoesTrilha -> {
                if (situacoesTrilha.getSituacao() != null) {
                    existingSituacoesTrilha.setSituacao(situacoesTrilha.getSituacao());
                }

                return existingSituacoesTrilha;
            })
            .map(situacoesTrilhaRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, situacoesTrilha.getId().toString())
        );
    }

    /**
     * {@code GET  /situacoes-trilhas} : get all the situacoesTrilhas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of situacoesTrilhas in body.
     */
    @GetMapping("/situacoes-trilhas")
    public List<SituacoesTrilha> getAllSituacoesTrilhas() {
        log.debug("REST request to get all SituacoesTrilhas");
        return situacoesTrilhaRepository.findAll();
    }

    /**
     * {@code GET  /situacoes-trilhas/:id} : get the "id" situacoesTrilha.
     *
     * @param id the id of the situacoesTrilha to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the situacoesTrilha, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/situacoes-trilhas/{id}")
    public ResponseEntity<SituacoesTrilha> getSituacoesTrilha(@PathVariable Long id) {
        log.debug("REST request to get SituacoesTrilha : {}", id);
        Optional<SituacoesTrilha> situacoesTrilha = situacoesTrilhaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(situacoesTrilha);
    }

    /**
     * {@code DELETE  /situacoes-trilhas/:id} : delete the "id" situacoesTrilha.
     *
     * @param id the id of the situacoesTrilha to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/situacoes-trilhas/{id}")
    public ResponseEntity<Void> deleteSituacoesTrilha(@PathVariable Long id) {
        log.debug("REST request to delete SituacoesTrilha : {}", id);
        situacoesTrilhaRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
