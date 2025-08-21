package com.ankleflex.ficha.service;

import com.ankleflex.ficha.dto.*;
import com.ankleflex.ficha.exceptions.FichaExistenteException;
import com.ankleflex.ficha.mapper.FichaMapper;
import com.ankleflex.ficha.repository.*;
import com.ankleflex.ficha.entity.*;
import jakarta.persistence.EntityNotFoundException;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FichaService {
    private final FichaRepository fichaRepository;

    public FichaService(FichaRepository fichaRepository) {
        this.fichaRepository = fichaRepository;
    }

    public FichaDTO buscarFicha(Long fichaId) {
        Optional<Ficha> fichaOptional = fichaRepository.findById(fichaId);

        Ficha ficha = fichaOptional.orElseThrow(() -> new EntityNotFoundException("Ficha com ID " + fichaId + " não encontrada"));

        IdentidadeDTO identidadeDTO = (ficha.getIdentidade() != null) ? FichaMapper.toIdentidadeDTO(ficha.getIdentidade()) : null;
        CaracteristicaDTO caracteristicasDTO = (ficha.getCaracteristica() != null) ? FichaMapper.toCaracteristicasDTO(ficha.getCaracteristica()) : null;
        LocalizacaoDTO localizacaoDTO = (ficha.getLocalizacao() != null) ? FichaMapper.toLocalizacaoDTO(ficha.getLocalizacao()) : null;
        InformacaoDTO informacaoDTO = (ficha.getInformacao() != null) ? FichaMapper.toInformacoesDTO(ficha.getInformacao()) : null;
        List<ProdutoDTO> produtosDTO = ficha.getProdutos().stream().map(FichaMapper::toProdutosDTO).toList();
        TipoDTO tipoDTO = (ficha.getTipo() != null) ? FichaMapper.toTiposDTO(ficha.getTipo()) : null;
        ObservacaoDTO observacaoDTO = (ficha.getObservacao() != null) ? FichaMapper.toObservacoesDTO(ficha.getObservacao()) : null;

        return new FichaDTO(
                fichaId,
                identidadeDTO,
                caracteristicasDTO,
                localizacaoDTO,
                informacaoDTO,
                produtosDTO,
                tipoDTO,
                observacaoDTO
        );
    }

    public Page<ListaFichaDTO> buscarFichasParaLista(Pageable pageable, String pesquisa, List<String> tipos) {
        Specification<Ficha> spec = null;

        if (pesquisa != null && !pesquisa.isEmpty()) {
            spec = (root, query, builder) -> {
                Join<Ficha, Identidade> identidadeJoin = root.join("identidade");

                Predicate nomePredicate = builder.like(
                        builder.lower(identidadeJoin.get("nomePaciente")),
                        "%" + pesquisa.toLowerCase() + "%"
                );

                Predicate fichaPredicate = null;
                try {
                    Long fichaId = Long.valueOf(pesquisa);
                    fichaPredicate = builder.equal(root.get("id"), fichaId);
                } catch (NumberFormatException e) {
                }

                if (fichaPredicate != null) {
                    return builder.or(nomePredicate, fichaPredicate);
                } else {
                    return nomePredicate;
                }
            };
        }


        if (tipos != null && !tipos.isEmpty()) {
            Specification<Ficha> tipoSpec = (root, query, builder) -> {
                Join<Ficha, Produto> produtosJoin = root.join("produtos");
                return produtosJoin.get("tipo").in(tipos);
            };

            spec = (spec == null) ? tipoSpec : spec.and(tipoSpec);
        }

        return fichaRepository.findAll(spec, pageable)
                .map(this::converterParaDTO);
    }

    private ListaFichaDTO converterParaDTO(Ficha ficha) {
        if (ficha == null) {
            return null;
        }

        Identidade identidade = ficha.getIdentidade();
        String nomePaciente = (identidade != null) ? identidade.getNomePaciente() : null;
        LocalDate dataFicha = (identidade != null) ? identidade.getDataFicha() : null;

        List<String> tiposProduto = (ficha.getProdutos() != null) ?
                ficha.getProdutos().stream()
                        .map(Produto::getTipo)
                        .filter(Objects::nonNull)
                        .toList() :
                Collections.emptyList();

        return new ListaFichaDTO(
                ficha.getId(),
                nomePaciente,
                tiposProduto,
                dataFicha);
    }

    public Ficha salvarFicha(FichaDTO fichaDTO) {
        if (fichaDTO == null) {
            throw new IllegalArgumentException("FichaDTO não pode ser nulo.");
        } else if (fichaDTO.identidadeDTO().fichaId() == null) {
            throw new IllegalArgumentException("ID da ficha não pode estar vazio.");
        }

        Long fichaId = fichaDTO.identidadeDTO().fichaId();

        if (fichaRepository.existsById(fichaId)) {
            throw new FichaExistenteException("Já existe uma ficha cadastrada com o ID: " + fichaId + ".");
        }

        Ficha fichaEntity = new Ficha();
        fichaEntity.setId(fichaId);

        Identidade identidadeEntity = FichaMapper.toIdentidadeEntity(fichaDTO.identidadeDTO());
        if (identidadeEntity != null) {
            identidadeEntity.setFicha(fichaEntity);
            fichaEntity.setIdentidade(identidadeEntity);
        }

        Caracteristica caracteristicaEntity = FichaMapper.toCaracteristicaEntity(fichaDTO.caracteristicasDTO());
        if (caracteristicaEntity != null) {
            caracteristicaEntity.setFicha(fichaEntity);
            fichaEntity.setCaracteristica(caracteristicaEntity);
        }

        Localizacao localizacaoEntity = FichaMapper.toLocalizacaoEntity(fichaDTO.localizacaoDTO());
        if (localizacaoEntity != null) {
            localizacaoEntity.setFicha(fichaEntity);
            fichaEntity.setLocalizacao(localizacaoEntity);
        }

        Informacao informacaoEntity = FichaMapper.toInformacaoEntity(fichaDTO.informacaoDTO());
        if (informacaoEntity != null) {
            informacaoEntity.setFicha(fichaEntity);
            fichaEntity.setInformacao(informacaoEntity);
        }

        List<Produto> produtosEntities = fichaDTO.produtoDTO().stream()
                .map(FichaMapper::toProdutoEntity)
                .peek(produto -> produto.setFicha(fichaEntity))
                .collect(Collectors.toList());
        fichaEntity.setProdutos(produtosEntities);

        Tipo tipoEntity = FichaMapper.toTipoEntity(fichaDTO.tipoDTO());
        if (tipoEntity != null) {
            tipoEntity.setFicha(fichaEntity);
            fichaEntity.setTipo(tipoEntity);
        }

        Observacao observacaoEntity = FichaMapper.toObservacaoEntity(fichaDTO.observacaoDTO());
        if (observacaoEntity != null) {
            observacaoEntity.setFicha(fichaEntity);
            fichaEntity.setObservacao(observacaoEntity);
        }

        return fichaRepository.save(fichaEntity);
    }

    public Ficha atualizarFicha(FichaDTO fichaDTO) {
        if (fichaDTO == null) {
            throw new IllegalArgumentException("FichaDTO não pode ser nulo.");
        }

        Long fichaId = fichaDTO.identidadeDTO().fichaId();
        Ficha fichaExistente = fichaRepository.findById(fichaId)
                .orElseThrow(() -> new EntityNotFoundException("Ficha com ID " + fichaId + " não encontrada."));

        Identidade identidadeEntity = FichaMapper.toIdentidadeEntity(fichaDTO.identidadeDTO());
        if (identidadeEntity != null) {
            identidadeEntity.setFicha(fichaExistente);
            if (fichaExistente.getIdentidade() != null) {
                identidadeEntity.setId(fichaExistente.getIdentidade().getId());
            }
            fichaExistente.setIdentidade(identidadeEntity);
        }

        Informacao informacaoEntity = FichaMapper.toInformacaoEntity(fichaDTO.informacaoDTO());
        if (informacaoEntity != null) {
            informacaoEntity.setFicha(fichaExistente);
            if (fichaExistente.getInformacao() != null) {
                informacaoEntity.setId(fichaExistente.getInformacao().getId());
            }
            fichaExistente.setInformacao(informacaoEntity);
        }

        Caracteristica caracteristicaEntity = FichaMapper.toCaracteristicaEntity(fichaDTO.caracteristicasDTO());
        if (caracteristicaEntity != null) {
            caracteristicaEntity.setFicha(fichaExistente);
            if (fichaExistente.getCaracteristica() != null) {
                caracteristicaEntity.setId(fichaExistente.getCaracteristica().getId());
            }
            fichaExistente.setCaracteristica(caracteristicaEntity);
        }

        Localizacao localizacaoEntity = FichaMapper.toLocalizacaoEntity(fichaDTO.localizacaoDTO());
        if (localizacaoEntity != null) {
            localizacaoEntity.setFicha(fichaExistente);
            if (fichaExistente.getLocalizacao() != null) {
                localizacaoEntity.setId(fichaExistente.getLocalizacao().getId());
            }
            fichaExistente.setLocalizacao(localizacaoEntity);
        }

        Tipo tipoEntity = FichaMapper.toTipoEntity(fichaDTO.tipoDTO());
        if (tipoEntity != null) {
            tipoEntity.setFicha(fichaExistente);
            if (fichaExistente.getTipo() != null) {
                tipoEntity.setId(fichaExistente.getTipo().getId());
            }
            fichaExistente.setTipo(tipoEntity);
        }

        Observacao observacaoEntity = FichaMapper.toObservacaoEntity(fichaDTO.observacaoDTO());
        if (observacaoEntity != null) {
            observacaoEntity.setFicha(fichaExistente);
            if (fichaExistente.getObservacao() != null) {
                observacaoEntity.setId(fichaExistente.getObservacao().getId());
            }
            fichaExistente.setObservacao(observacaoEntity);
        }

        List<Produto> produtosEntities = fichaDTO.produtoDTO().stream()
                .map(FichaMapper::toProdutoEntity)
                .peek(produto -> produto.setFicha(fichaExistente))
                .collect(Collectors.toList());
        fichaExistente.setProdutos(produtosEntities);

        return fichaRepository.save(fichaExistente);
    }
}
