package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Trilha;
import com.mycompany.myapp.repository.TrilhaRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Trilha}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TrilhaResource {

    private final Logger log = LoggerFactory.getLogger(TrilhaResource.class);

    private static final String ENTITY_NAME = "trilha";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TrilhaRepository trilhaRepository;

    public TrilhaResource(TrilhaRepository trilhaRepository) {
        this.trilhaRepository = trilhaRepository;
    }

    /**
     * {@code POST  /trilhas} : Create a new trilha.
     *
     * @param trilha the trilha to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new trilha, or with status {@code 400 (Bad Request)} if the trilha has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/trilhas")
    public ResponseEntity<Trilha> createTrilha(@Valid @RequestBody Trilha trilha) throws URISyntaxException {
        log.debug("REST request to save Trilha : {}", trilha);
        if (trilha.getId() != null) {
            throw new BadRequestAlertException("A new trilha cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Trilha result = trilhaRepository.save(trilha);
        return ResponseEntity
            .created(new URI("/api/trilhas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /trilhas/:id} : Updates an existing trilha.
     *
     * @param id the id of the trilha to save.
     * @param trilha the trilha to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated trilha,
     * or with status {@code 400 (Bad Request)} if the trilha is not valid,
     * or with status {@code 500 (Internal Server Error)} if the trilha couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/trilhas/{id}")
    public ResponseEntity<Trilha> updateTrilha(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Trilha trilha
    ) throws URISyntaxException {
        log.debug("REST request to update Trilha : {}, {}", id, trilha);
        if (trilha.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, trilha.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!trilhaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Trilha result = trilhaRepository.save(trilha);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, trilha.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /trilhas/:id} : Partial updates given fields of an existing trilha, field will ignore if it is null
     *
     * @param id the id of the trilha to save.
     * @param trilha the trilha to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated trilha,
     * or with status {@code 400 (Bad Request)} if the trilha is not valid,
     * or with status {@code 404 (Not Found)} if the trilha is not found,
     * or with status {@code 500 (Internal Server Error)} if the trilha couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/trilhas/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Trilha> partialUpdateTrilha(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Trilha trilha
    ) throws URISyntaxException {
        log.debug("REST request to partial update Trilha partially : {}, {}", id, trilha);
        if (trilha.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, trilha.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!trilhaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Trilha> result = trilhaRepository
            .findById(trilha.getId())
            .map(existingTrilha -> {
                if (trilha.getNomeTrilha() != null) {
                    existingTrilha.setNomeTrilha(trilha.getNomeTrilha());
                }
                if (trilha.getNomeMunicipio() != null) {
                    existingTrilha.setNomeMunicipio(trilha.getNomeMunicipio());
                }
                if (trilha.getDescricao() != null) {
                    existingTrilha.setDescricao(trilha.getDescricao());
                }
                if (trilha.getComprimento() != null) {
                    existingTrilha.setComprimento(trilha.getComprimento());
                }
                if (trilha.getDataHora() != null) {
                    existingTrilha.setDataHora(trilha.getDataHora());
                }

                return existingTrilha;
            })
            .map(trilhaRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, trilha.getId().toString())
        );
    }

    /**
     * {@code GET  /trilhas} : get all the trilhas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of trilhas in body.
     */
    @GetMapping("/trilhas")
    public List<Trilha> getAllTrilhas() {
        log.debug("REST request to get all Trilhas");
        return trilhaRepository.findAll();
    }

    /**
     * {@code GET  /trilhas/:id} : get the "id" trilha.
     *
     * @param id the id of the trilha to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the trilha, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/trilhas/{id}")
    public ResponseEntity<Trilha> getTrilha(@PathVariable Long id) {
        log.debug("REST request to get Trilha : {}", id);
        Optional<Trilha> trilha = trilhaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(trilha);
    }

    /**
     * {@code DELETE  /trilhas/:id} : delete the "id" trilha.
     *
     * @param id the id of the trilha to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/trilhas/{id}")
    public ResponseEntity<Void> deleteTrilha(@PathVariable Long id) {
        log.debug("REST request to delete Trilha : {}", id);
        trilhaRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
