package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.PontosCardeais;
import com.mycompany.myapp.repository.PontosCardeaisRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.PontosCardeais}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PontosCardeaisResource {

    private final Logger log = LoggerFactory.getLogger(PontosCardeaisResource.class);

    private static final String ENTITY_NAME = "pontosCardeais";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PontosCardeaisRepository pontosCardeaisRepository;

    public PontosCardeaisResource(PontosCardeaisRepository pontosCardeaisRepository) {
        this.pontosCardeaisRepository = pontosCardeaisRepository;
    }

    /**
     * {@code POST  /pontos-cardeais} : Create a new pontosCardeais.
     *
     * @param pontosCardeais the pontosCardeais to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pontosCardeais, or with status {@code 400 (Bad Request)} if the pontosCardeais has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pontos-cardeais")
    public ResponseEntity<PontosCardeais> createPontosCardeais(@RequestBody PontosCardeais pontosCardeais) throws URISyntaxException {
        log.debug("REST request to save PontosCardeais : {}", pontosCardeais);
        if (pontosCardeais.getId() != null) {
            throw new BadRequestAlertException("A new pontosCardeais cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PontosCardeais result = pontosCardeaisRepository.save(pontosCardeais);
        return ResponseEntity
            .created(new URI("/api/pontos-cardeais/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pontos-cardeais/:id} : Updates an existing pontosCardeais.
     *
     * @param id the id of the pontosCardeais to save.
     * @param pontosCardeais the pontosCardeais to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pontosCardeais,
     * or with status {@code 400 (Bad Request)} if the pontosCardeais is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pontosCardeais couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pontos-cardeais/{id}")
    public ResponseEntity<PontosCardeais> updatePontosCardeais(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody PontosCardeais pontosCardeais
    ) throws URISyntaxException {
        log.debug("REST request to update PontosCardeais : {}, {}", id, pontosCardeais);
        if (pontosCardeais.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pontosCardeais.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pontosCardeaisRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PontosCardeais result = pontosCardeaisRepository.save(pontosCardeais);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pontosCardeais.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /pontos-cardeais/:id} : Partial updates given fields of an existing pontosCardeais, field will ignore if it is null
     *
     * @param id the id of the pontosCardeais to save.
     * @param pontosCardeais the pontosCardeais to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pontosCardeais,
     * or with status {@code 400 (Bad Request)} if the pontosCardeais is not valid,
     * or with status {@code 404 (Not Found)} if the pontosCardeais is not found,
     * or with status {@code 500 (Internal Server Error)} if the pontosCardeais couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/pontos-cardeais/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<PontosCardeais> partialUpdatePontosCardeais(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody PontosCardeais pontosCardeais
    ) throws URISyntaxException {
        log.debug("REST request to partial update PontosCardeais partially : {}, {}", id, pontosCardeais);
        if (pontosCardeais.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pontosCardeais.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pontosCardeaisRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PontosCardeais> result = pontosCardeaisRepository
            .findById(pontosCardeais.getId())
            .map(existingPontosCardeais -> {
                if (pontosCardeais.getLatitude() != null) {
                    existingPontosCardeais.setLatitude(pontosCardeais.getLatitude());
                }
                if (pontosCardeais.getLongitude() != null) {
                    existingPontosCardeais.setLongitude(pontosCardeais.getLongitude());
                }

                return existingPontosCardeais;
            })
            .map(pontosCardeaisRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pontosCardeais.getId().toString())
        );
    }

    /**
     * {@code GET  /pontos-cardeais} : get all the pontosCardeais.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pontosCardeais in body.
     */
    @GetMapping("/pontos-cardeais")
    public List<PontosCardeais> getAllPontosCardeais() {
        log.debug("REST request to get all PontosCardeais");
        return pontosCardeaisRepository.findAll();
    }

    /**
     * {@code GET  /pontos-cardeais/:id} : get the "id" pontosCardeais.
     *
     * @param id the id of the pontosCardeais to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pontosCardeais, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pontos-cardeais/{id}")
    public ResponseEntity<PontosCardeais> getPontosCardeais(@PathVariable Long id) {
        log.debug("REST request to get PontosCardeais : {}", id);
        Optional<PontosCardeais> pontosCardeais = pontosCardeaisRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pontosCardeais);
    }

    /**
     * {@code DELETE  /pontos-cardeais/:id} : delete the "id" pontosCardeais.
     *
     * @param id the id of the pontosCardeais to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pontos-cardeais/{id}")
    public ResponseEntity<Void> deletePontosCardeais(@PathVariable Long id) {
        log.debug("REST request to delete PontosCardeais : {}", id);
        pontosCardeaisRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
