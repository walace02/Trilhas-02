package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Fotografias;
import com.mycompany.myapp.repository.FotografiasRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Fotografias}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FotografiasResource {

    private final Logger log = LoggerFactory.getLogger(FotografiasResource.class);

    private static final String ENTITY_NAME = "fotografias";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FotografiasRepository fotografiasRepository;

    public FotografiasResource(FotografiasRepository fotografiasRepository) {
        this.fotografiasRepository = fotografiasRepository;
    }

    /**
     * {@code POST  /fotografias} : Create a new fotografias.
     *
     * @param fotografias the fotografias to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fotografias, or with status {@code 400 (Bad Request)} if the fotografias has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/fotografias")
    public ResponseEntity<Fotografias> createFotografias(@RequestBody Fotografias fotografias) throws URISyntaxException {
        log.debug("REST request to save Fotografias : {}", fotografias);
        if (fotografias.getId() != null) {
            throw new BadRequestAlertException("A new fotografias cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Fotografias result = fotografiasRepository.save(fotografias);
        return ResponseEntity
            .created(new URI("/api/fotografias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /fotografias/:id} : Updates an existing fotografias.
     *
     * @param id the id of the fotografias to save.
     * @param fotografias the fotografias to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fotografias,
     * or with status {@code 400 (Bad Request)} if the fotografias is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fotografias couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/fotografias/{id}")
    public ResponseEntity<Fotografias> updateFotografias(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Fotografias fotografias
    ) throws URISyntaxException {
        log.debug("REST request to update Fotografias : {}, {}", id, fotografias);
        if (fotografias.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, fotografias.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!fotografiasRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Fotografias result = fotografiasRepository.save(fotografias);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fotografias.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /fotografias/:id} : Partial updates given fields of an existing fotografias, field will ignore if it is null
     *
     * @param id the id of the fotografias to save.
     * @param fotografias the fotografias to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fotografias,
     * or with status {@code 400 (Bad Request)} if the fotografias is not valid,
     * or with status {@code 404 (Not Found)} if the fotografias is not found,
     * or with status {@code 500 (Internal Server Error)} if the fotografias couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/fotografias/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Fotografias> partialUpdateFotografias(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Fotografias fotografias
    ) throws URISyntaxException {
        log.debug("REST request to partial update Fotografias partially : {}, {}", id, fotografias);
        if (fotografias.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, fotografias.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!fotografiasRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Fotografias> result = fotografiasRepository
            .findById(fotografias.getId())
            .map(existingFotografias -> {
                if (fotografias.getNome() != null) {
                    existingFotografias.setNome(fotografias.getNome());
                }
                if (fotografias.getDescricao() != null) {
                    existingFotografias.setDescricao(fotografias.getDescricao());
                }
                if (fotografias.getAutor() != null) {
                    existingFotografias.setAutor(fotografias.getAutor());
                }
                if (fotografias.getAvaliacao() != null) {
                    existingFotografias.setAvaliacao(fotografias.getAvaliacao());
                }

                return existingFotografias;
            })
            .map(fotografiasRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fotografias.getId().toString())
        );
    }

    /**
     * {@code GET  /fotografias} : get all the fotografias.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fotografias in body.
     */
    @GetMapping("/fotografias")
    public List<Fotografias> getAllFotografias() {
        log.debug("REST request to get all Fotografias");
        return fotografiasRepository.findAll();
    }

    /**
     * {@code GET  /fotografias/:id} : get the "id" fotografias.
     *
     * @param id the id of the fotografias to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fotografias, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/fotografias/{id}")
    public ResponseEntity<Fotografias> getFotografias(@PathVariable Long id) {
        log.debug("REST request to get Fotografias : {}", id);
        Optional<Fotografias> fotografias = fotografiasRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fotografias);
    }

    /**
     * {@code DELETE  /fotografias/:id} : delete the "id" fotografias.
     *
     * @param id the id of the fotografias to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/fotografias/{id}")
    public ResponseEntity<Void> deleteFotografias(@PathVariable Long id) {
        log.debug("REST request to delete Fotografias : {}", id);
        fotografiasRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
