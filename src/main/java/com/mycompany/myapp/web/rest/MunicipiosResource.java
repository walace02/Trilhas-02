package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Municipios;
import com.mycompany.myapp.repository.MunicipiosRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Municipios}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MunicipiosResource {

    private final Logger log = LoggerFactory.getLogger(MunicipiosResource.class);

    private static final String ENTITY_NAME = "municipios";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MunicipiosRepository municipiosRepository;

    public MunicipiosResource(MunicipiosRepository municipiosRepository) {
        this.municipiosRepository = municipiosRepository;
    }

    /**
     * {@code POST  /municipios} : Create a new municipios.
     *
     * @param municipios the municipios to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new municipios, or with status {@code 400 (Bad Request)} if the municipios has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/municipios")
    public ResponseEntity<Municipios> createMunicipios(@RequestBody Municipios municipios) throws URISyntaxException {
        log.debug("REST request to save Municipios : {}", municipios);
        if (municipios.getId() != null) {
            throw new BadRequestAlertException("A new municipios cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Municipios result = municipiosRepository.save(municipios);
        return ResponseEntity
            .created(new URI("/api/municipios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /municipios/:id} : Updates an existing municipios.
     *
     * @param id the id of the municipios to save.
     * @param municipios the municipios to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated municipios,
     * or with status {@code 400 (Bad Request)} if the municipios is not valid,
     * or with status {@code 500 (Internal Server Error)} if the municipios couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/municipios/{id}")
    public ResponseEntity<Municipios> updateMunicipios(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Municipios municipios
    ) throws URISyntaxException {
        log.debug("REST request to update Municipios : {}, {}", id, municipios);
        if (municipios.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, municipios.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!municipiosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Municipios result = municipiosRepository.save(municipios);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, municipios.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /municipios/:id} : Partial updates given fields of an existing municipios, field will ignore if it is null
     *
     * @param id the id of the municipios to save.
     * @param municipios the municipios to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated municipios,
     * or with status {@code 400 (Bad Request)} if the municipios is not valid,
     * or with status {@code 404 (Not Found)} if the municipios is not found,
     * or with status {@code 500 (Internal Server Error)} if the municipios couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/municipios/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<Municipios> partialUpdateMunicipios(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody Municipios municipios
    ) throws URISyntaxException {
        log.debug("REST request to partial update Municipios partially : {}, {}", id, municipios);
        if (municipios.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, municipios.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!municipiosRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Municipios> result = municipiosRepository
            .findById(municipios.getId())
            .map(existingMunicipios -> {
                if (municipios.getNome() != null) {
                    existingMunicipios.setNome(municipios.getNome());
                }
                if (municipios.getDescricao() != null) {
                    existingMunicipios.setDescricao(municipios.getDescricao());
                }

                return existingMunicipios;
            })
            .map(municipiosRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, municipios.getId().toString())
        );
    }

    /**
     * {@code GET  /municipios} : get all the municipios.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of municipios in body.
     */
    @GetMapping("/municipios")
    public List<Municipios> getAllMunicipios() {
        log.debug("REST request to get all Municipios");
        return municipiosRepository.findAll();
    }

    /**
     * {@code GET  /municipios/:id} : get the "id" municipios.
     *
     * @param id the id of the municipios to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the municipios, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/municipios/{id}")
    public ResponseEntity<Municipios> getMunicipios(@PathVariable Long id) {
        log.debug("REST request to get Municipios : {}", id);
        Optional<Municipios> municipios = municipiosRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(municipios);
    }

    /**
     * {@code DELETE  /municipios/:id} : delete the "id" municipios.
     *
     * @param id the id of the municipios to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/municipios/{id}")
    public ResponseEntity<Void> deleteMunicipios(@PathVariable Long id) {
        log.debug("REST request to delete Municipios : {}", id);
        municipiosRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
