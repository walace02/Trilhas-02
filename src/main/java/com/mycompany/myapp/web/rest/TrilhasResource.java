package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Trilhas;
import com.mycompany.myapp.repository.TrilhasRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Trilhas}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TrilhasResource {

    private final Logger log = LoggerFactory.getLogger(TrilhasResource.class);

    private static final String ENTITY_NAME = "trilhas";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TrilhasRepository trilhasRepository;

    public TrilhasResource(TrilhasRepository trilhasRepository) {
        this.trilhasRepository = trilhasRepository;
    }

    /**
     * {@code POST  /trilhas} : Create a new trilhas.
     *
     * @param trilhas the trilhas to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new trilhas, or with status {@code 400 (Bad Request)} if the trilhas has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/trilhas")
    public ResponseEntity<Trilhas> createTrilhas(@Valid @RequestBody Trilhas trilhas) throws URISyntaxException {
        log.debug("REST request to save Trilhas : {}", trilhas);
        if (trilhas.getId() != null) {
            throw new BadRequestAlertException("A new trilhas cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Trilhas result = trilhasRepository.save(trilhas);
        return ResponseEntity
            .created(new URI("/api/trilhas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /trilhas/:id} : Updates an existing trilhas.
     *
     * @param id the id of the trilhas to save.
     * @param trilhas the trilhas to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated trilhas,
     * or with status {@code 400 (Bad Request)} if the trilhas is not valid,
     * or with status {@code 500 (Internal Server Error)} if the trilhas couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/trilhas/{id}")
    public ResponseEntity<Trilhas> updateTrilhas(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Trilhas trilhas
    ) throws URISyntaxException {
        log.debug("REST request to update Trilhas : {}, {}", id, trilhas);
        if (trilhas.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, trilhas.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!trilhasRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Trilhas result = trilhasRepository.save(trilhas);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, trilhas.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /trilhas/:id} : Partial updates given fields of an existing trilhas, field will ignore if it is null
     *
     * @param id the id of the trilhas to save.
     * @param trilhas the trilhas to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated trilhas,
     * or with status {@code 400 (Bad Request)} if the trilhas is not valid,
     * or with status {@code 404 (Not Found)} if the trilhas is not found,
     * or with status {@code 500 (Internal Server Error)} if the trilhas couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/trilhas/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Trilhas> partialUpdateTrilhas(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Trilhas trilhas
    ) throws URISyntaxException {
        log.debug("REST request to partial update Trilhas partially : {}, {}", id, trilhas);
        if (trilhas.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, trilhas.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!trilhasRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Trilhas> result = trilhasRepository
            .findById(trilhas.getId())
            .map(existingTrilhas -> {
                if (trilhas.getNome() != null) {
                    existingTrilhas.setNome(trilhas.getNome());
                }
                if (trilhas.getDescricao() != null) {
                    existingTrilhas.setDescricao(trilhas.getDescricao());
                }
                if (trilhas.getComprimento() != null) {
                    existingTrilhas.setComprimento(trilhas.getComprimento());
                }
                if (trilhas.getAvaliacao() != null) {
                    existingTrilhas.setAvaliacao(trilhas.getAvaliacao());
                }

                return existingTrilhas;
            })
            .map(trilhasRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, trilhas.getId().toString())
        );
    }

    /**
     * {@code GET  /trilhas} : get all the trilhas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of trilhas in body.
     */
    @GetMapping("/trilhas")
    public List<Trilhas> getAllTrilhas() {
        log.debug("REST request to get all Trilhas");
        return trilhasRepository.findAll();
    }

    /**
     * {@code GET  /trilhas/:id} : get the "id" trilhas.
     *
     * @param id the id of the trilhas to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the trilhas, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/trilhas/{id}")
    public ResponseEntity<Trilhas> getTrilhas(@PathVariable Long id) {
        log.debug("REST request to get Trilhas : {}", id);
        Optional<Trilhas> trilhas = trilhasRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(trilhas);
    }

    /**
     * {@code DELETE  /trilhas/:id} : delete the "id" trilhas.
     *
     * @param id the id of the trilhas to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/trilhas/{id}")
    public ResponseEntity<Void> deleteTrilhas(@PathVariable Long id) {
        log.debug("REST request to delete Trilhas : {}", id);
        trilhasRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
