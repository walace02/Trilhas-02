package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.PontosVenda;
import com.mycompany.myapp.repository.PontosVendaRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.PontosVenda}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PontosVendaResource {

    private final Logger log = LoggerFactory.getLogger(PontosVendaResource.class);

    private static final String ENTITY_NAME = "pontosVenda";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PontosVendaRepository pontosVendaRepository;

    public PontosVendaResource(PontosVendaRepository pontosVendaRepository) {
        this.pontosVendaRepository = pontosVendaRepository;
    }

    /**
     * {@code POST  /pontos-vendas} : Create a new pontosVenda.
     *
     * @param pontosVenda the pontosVenda to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pontosVenda, or with status {@code 400 (Bad Request)} if the pontosVenda has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pontos-vendas")
    public ResponseEntity<PontosVenda> createPontosVenda(@RequestBody PontosVenda pontosVenda) throws URISyntaxException {
        log.debug("REST request to save PontosVenda : {}", pontosVenda);
        if (pontosVenda.getId() != null) {
            throw new BadRequestAlertException("A new pontosVenda cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PontosVenda result = pontosVendaRepository.save(pontosVenda);
        return ResponseEntity
            .created(new URI("/api/pontos-vendas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pontos-vendas/:id} : Updates an existing pontosVenda.
     *
     * @param id the id of the pontosVenda to save.
     * @param pontosVenda the pontosVenda to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pontosVenda,
     * or with status {@code 400 (Bad Request)} if the pontosVenda is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pontosVenda couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pontos-vendas/{id}")
    public ResponseEntity<PontosVenda> updatePontosVenda(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody PontosVenda pontosVenda
    ) throws URISyntaxException {
        log.debug("REST request to update PontosVenda : {}, {}", id, pontosVenda);
        if (pontosVenda.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pontosVenda.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pontosVendaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        PontosVenda result = pontosVendaRepository.save(pontosVenda);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pontosVenda.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /pontos-vendas/:id} : Partial updates given fields of an existing pontosVenda, field will ignore if it is null
     *
     * @param id the id of the pontosVenda to save.
     * @param pontosVenda the pontosVenda to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pontosVenda,
     * or with status {@code 400 (Bad Request)} if the pontosVenda is not valid,
     * or with status {@code 404 (Not Found)} if the pontosVenda is not found,
     * or with status {@code 500 (Internal Server Error)} if the pontosVenda couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/pontos-vendas/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<PontosVenda> partialUpdatePontosVenda(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody PontosVenda pontosVenda
    ) throws URISyntaxException {
        log.debug("REST request to partial update PontosVenda partially : {}, {}", id, pontosVenda);
        if (pontosVenda.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, pontosVenda.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!pontosVendaRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<PontosVenda> result = pontosVendaRepository
            .findById(pontosVenda.getId())
            .map(existingPontosVenda -> {
                if (pontosVenda.getNome() != null) {
                    existingPontosVenda.setNome(pontosVenda.getNome());
                }
                if (pontosVenda.getDescricao() != null) {
                    existingPontosVenda.setDescricao(pontosVenda.getDescricao());
                }
                if (pontosVenda.getAvaliacao() != null) {
                    existingPontosVenda.setAvaliacao(pontosVenda.getAvaliacao());
                }
                if (pontosVenda.getTiposPontosVenda() != null) {
                    existingPontosVenda.setTiposPontosVenda(pontosVenda.getTiposPontosVenda());
                }

                return existingPontosVenda;
            })
            .map(pontosVendaRepository::save);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pontosVenda.getId().toString())
        );
    }

    /**
     * {@code GET  /pontos-vendas} : get all the pontosVendas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pontosVendas in body.
     */
    @GetMapping("/pontos-vendas")
    public List<PontosVenda> getAllPontosVendas() {
        log.debug("REST request to get all PontosVendas");
        return pontosVendaRepository.findAll();
    }

    /**
     * {@code GET  /pontos-vendas/:id} : get the "id" pontosVenda.
     *
     * @param id the id of the pontosVenda to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pontosVenda, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pontos-vendas/{id}")
    public ResponseEntity<PontosVenda> getPontosVenda(@PathVariable Long id) {
        log.debug("REST request to get PontosVenda : {}", id);
        Optional<PontosVenda> pontosVenda = pontosVendaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pontosVenda);
    }

    /**
     * {@code DELETE  /pontos-vendas/:id} : delete the "id" pontosVenda.
     *
     * @param id the id of the pontosVenda to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pontos-vendas/{id}")
    public ResponseEntity<Void> deletePontosVenda(@PathVariable Long id) {
        log.debug("REST request to delete PontosVenda : {}", id);
        pontosVendaRepository.deleteById(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
