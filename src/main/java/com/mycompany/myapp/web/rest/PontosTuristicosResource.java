package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.PontosTuristicos;
import com.mycompany.myapp.repository.PontosTuristicosRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.PontosTuristicos}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PontosTuristicosResource {

    private final Logger log = LoggerFactory.getLogger(PontosTuristicosResource.class);

    private static final String ENTITY_NAME = "pontosTuristicos";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PontosTuristicosRepository pontosTuristicosRepository;

    public PontosTuristicosResource(PontosTuristicosRepository pontosTuristicosRepository) {
        this.pontosTuristicosRepository = pontosTuristicosRepository;
    }

    /**
     * {@code POST  /pontos-turisticos} : Create a new pontosTuristicos.
     *
     * @param pontosTuristicos the pontosTuristicos to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pontosTuristicos, or with status {@code 400 (Bad Request)} if the pontosTuristicos has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pontos-turisticos")
    public ResponseEntity<PontosTuristicos> createPontosTuristicos(@RequestBody PontosTuristicos pontosTuristicos)
        throws URISyntaxException {
        log.debug("REST request to save PontosTuristicos : {}", pontosTuristicos);
        if (pontosTuristicos.getId() != null) {
            throw new BadRequestAlertException("A new pontosTuristicos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PontosTuristicos result = pontosTuristicosRepository.save(pontosTuristicos);
        return ResponseEntity
            .created(new URI("/api/pontos-turisticos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pontos-turisticos/:id} : Updates an existing pontosTuristicos.
     *
     * @param id the id of the pontosTuristicos to save.
     * @param pontosTuristicos the pontosTuristicos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pontosTuristicos,
     * or with status {@code 400 (Bad Request)} if the pontosTuristicos is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pontosTuristicos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pontos-turisticos/{id}")
    public ResponseEntity<PontosTuristicos> updatePontosTuristicos(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody PontosTuristicos pontosTuristicos
    ) throws URISyntaxException {
        log.debug("REST request to update PontosTuristicos : {}, {}", id, pontosTuristicos);
        if (pontosTuristicos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pontosTuristicos.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pontosTuristicosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PontosTuristicos result = pontosTuristicosRepository.save(pontosTuristicos);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pontosTuristicos.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /pontos-turisticos/:id} : Partial updates given fields of an existing pontosTuristicos, field will ignore if it is null
     *
     * @param id the id of the pontosTuristicos to save.
     * @param pontosTuristicos the pontosTuristicos to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pontosTuristicos,
     * or with status {@code 400 (Bad Request)} if the pontosTuristicos is not valid,
     * or with status {@code 404 (Not Found)} if the pontosTuristicos is not found,
     * or with status {@code 500 (Internal Server Error)} if the pontosTuristicos couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/pontos-turisticos/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<PontosTuristicos> partialUpdatePontosTuristicos(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody PontosTuristicos pontosTuristicos
    ) throws URISyntaxException {
        log.debug("REST request to partial update PontosTuristicos partially : {}, {}", id, pontosTuristicos);
        if (pontosTuristicos.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pontosTuristicos.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pontosTuristicosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PontosTuristicos> result = pontosTuristicosRepository
            .findById(pontosTuristicos.getId())
            .map(existingPontosTuristicos -> {
                if (pontosTuristicos.getNome() != null) {
                    existingPontosTuristicos.setNome(pontosTuristicos.getNome());
                }
                if (pontosTuristicos.getDescricao() != null) {
                    existingPontosTuristicos.setDescricao(pontosTuristicos.getDescricao());
                }
                if (pontosTuristicos.getAvaliacao() != null) {
                    existingPontosTuristicos.setAvaliacao(pontosTuristicos.getAvaliacao());
                }
                if (pontosTuristicos.getTiposPontosTuristicos() != null) {
                    existingPontosTuristicos.setTiposPontosTuristicos(pontosTuristicos.getTiposPontosTuristicos());
                }

                return existingPontosTuristicos;
            })
            .map(pontosTuristicosRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pontosTuristicos.getId().toString())
        );
    }

    /**
     * {@code GET  /pontos-turisticos} : get all the pontosTuristicos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pontosTuristicos in body.
     */
    @GetMapping("/pontos-turisticos")
    public List<PontosTuristicos> getAllPontosTuristicos() {
        log.debug("REST request to get all PontosTuristicos");
        return pontosTuristicosRepository.findAll();
    }

    /**
     * {@code GET  /pontos-turisticos/:id} : get the "id" pontosTuristicos.
     *
     * @param id the id of the pontosTuristicos to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pontosTuristicos, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pontos-turisticos/{id}")
    public ResponseEntity<PontosTuristicos> getPontosTuristicos(@PathVariable Long id) {
        log.debug("REST request to get PontosTuristicos : {}", id);
        Optional<PontosTuristicos> pontosTuristicos = pontosTuristicosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pontosTuristicos);
    }

    /**
     * {@code DELETE  /pontos-turisticos/:id} : delete the "id" pontosTuristicos.
     *
     * @param id the id of the pontosTuristicos to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pontos-turisticos/{id}")
    public ResponseEntity<Void> deletePontosTuristicos(@PathVariable Long id) {
        log.debug("REST request to delete PontosTuristicos : {}", id);
        pontosTuristicosRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
