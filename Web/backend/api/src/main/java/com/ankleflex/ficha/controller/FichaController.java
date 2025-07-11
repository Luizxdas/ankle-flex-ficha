package com.ankleflex.ficha.controller;

import com.ankleflex.ficha.dto.FichaDTO;
import com.ankleflex.ficha.dto.ListaFichaDTO;
import com.ankleflex.ficha.entity.Ficha;
import com.ankleflex.ficha.mapper.FichaMapper;
import com.ankleflex.ficha.service.FichaService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.hateoas.EntityModel;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.PagedModel;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class FichaController {

    private final FichaService fichaService;
    private final PagedResourcesAssembler<ListaFichaDTO> pagedResourcesAssembler;

    public FichaController(FichaService fichaService, PagedResourcesAssembler<ListaFichaDTO> pagedResourcesAssembler) {
        this.fichaService = fichaService;
        this.pagedResourcesAssembler = pagedResourcesAssembler;
    }

    @GetMapping("/fichas")
    public ResponseEntity<PagedModel<EntityModel<ListaFichaDTO>>> buscarTodasAsFichas(
            Pageable pageable) {

        Page<ListaFichaDTO> fichasPage = fichaService.buscarFichasParaLista(pageable);

        PagedModel<EntityModel<ListaFichaDTO>> pagedModel = pagedResourcesAssembler.toModel(
                fichasPage,
                ficha -> EntityModel.of(ficha,
                        WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(FichaController.class).buscarFichaPorId(ficha.id()))
                                .withSelfRel()
                )
        );

        return ResponseEntity.ok(pagedModel);
    }

    @GetMapping("/fichas/{id}")
    public ResponseEntity<FichaDTO> buscarFichaPorId(@PathVariable Long id) {
        FichaDTO ficha = fichaService.buscarFicha(id);
        return ResponseEntity.ok(ficha);
    }

    @PostMapping("/fichas")
    public ResponseEntity<FichaDTO> salvarFicha(@RequestBody FichaDTO fichaDTO) {
        Ficha fichaSalvaEntity = fichaService.salvarFicha(fichaDTO);
        FichaDTO fichaSalvaDTO = FichaMapper.toFichaDTO(fichaSalvaEntity);
        return new ResponseEntity<>(fichaSalvaDTO, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FichaDTO> atualizarFicha(@PathVariable Long id, @RequestBody FichaDTO fichaDTO) {

        Ficha fichaAtualizadaEntity = fichaService.atualizarFicha(fichaDTO);

        if (fichaAtualizadaEntity == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        FichaDTO fichaAtualizadaDTO = FichaMapper.toFichaDTO(fichaAtualizadaEntity);
        return new ResponseEntity<>(fichaAtualizadaDTO, HttpStatus.OK);
    }
}
