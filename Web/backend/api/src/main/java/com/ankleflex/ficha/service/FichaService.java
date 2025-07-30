package com.ankleflex.ficha.service;

import com.ankleflex.ficha.dto.*;
import com.ankleflex.ficha.mapper.FichaMapper;
import com.ankleflex.ficha.repository.*;
import com.ankleflex.ficha.entity.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
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

    public Page<ListaFichaDTO> buscarFichasParaLista(Pageable pageable) {
        return fichaRepository.findAll(pageable)
                .map(ficha -> {
                    if (ficha == null) {
                        return null;
                    }

                    Identidade identidade = ficha.getIdentidade();
                    String nomePaciente = (identidade != null) ? identidade.getNomePaciente() : null;

                    List<String> tiposProduto = null;
                    if (ficha.getProdutos() != null) {
                        tiposProduto = ficha.getProdutos().stream()
                                .map(produto -> (produto != null) ? produto.getTipo() : null)
                                .filter(java.util.Objects::nonNull)
                                .toList();
                    } else {
                        tiposProduto = java.util.Collections.emptyList();
                    }

                    java.time.LocalDate dataFicha = (identidade != null) ? identidade.getDataFicha() : null;

                    return new ListaFichaDTO(
                            ficha.getId(),
                            nomePaciente,
                            tiposProduto,
                            dataFicha);
                });
    }

    public Ficha salvarFicha(FichaDTO fichaDTO) {
        if (fichaDTO == null) {
            throw new IllegalArgumentException("FichaDTO não pode ser nulo.");
        } else if (fichaDTO.identidadeDTO().fichaId() == null) {
            throw new IllegalArgumentException("ID da ficha não pode ser nulo");
        }

        Ficha fichaEntity = new Ficha();

        fichaEntity.setId(fichaDTO.identidadeDTO().fichaId());

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
        Ficha fichaEntity = new Ficha();
        fichaEntity.setId(fichaId);

        Ficha fichaExistente = fichaRepository.findById(fichaId)
                .orElseThrow(() -> new EntityNotFoundException("Ficha com ID " + fichaId + " não encontrada"));

        Identidade identidadeEntity = FichaMapper.toIdentidadeEntity(fichaDTO.identidadeDTO());
        if (identidadeEntity != null) {
            identidadeEntity.setFicha(fichaEntity);
            identidadeEntity.setId(fichaExistente.getIdentidade().getId());
            fichaEntity.setIdentidade(identidadeEntity);
        }

        Informacao informacaoEntity = FichaMapper.toInformacaoEntity(fichaDTO.informacaoDTO());
        if (informacaoEntity != null) {
            informacaoEntity.setFicha(fichaEntity);
            informacaoEntity.setId(fichaExistente.getInformacao().getId());
            fichaEntity.setInformacao(informacaoEntity);
        }

        Caracteristica caracteristicaEntity = FichaMapper.toCaracteristicaEntity(fichaDTO.caracteristicasDTO());
        if (caracteristicaEntity != null) {
            caracteristicaEntity.setFicha(fichaEntity);
            caracteristicaEntity.setId(fichaExistente.getCaracteristica().getId());
            fichaEntity.setCaracteristica(caracteristicaEntity);
        }

        Localizacao localizacaoEntity = FichaMapper.toLocalizacaoEntity(fichaDTO.localizacaoDTO());
        if (localizacaoEntity != null) {
            localizacaoEntity.setFicha(fichaEntity);
            localizacaoEntity.setId(fichaExistente.getLocalizacao().getId());
            fichaEntity.setLocalizacao(localizacaoEntity);
        }

        Tipo tipoEntity = FichaMapper.toTipoEntity(fichaDTO.tipoDTO());
        if (tipoEntity != null) {
            tipoEntity.setFicha(fichaEntity);
            tipoEntity.setId(fichaExistente.getTipo().getId());
            fichaEntity.setTipo(tipoEntity);
        }

        Observacao observacaoEntity = FichaMapper.toObservacaoEntity(fichaDTO.observacaoDTO());
        if (observacaoEntity != null) {
            observacaoEntity.setFicha(fichaEntity);
            observacaoEntity.setId(fichaExistente.getObservacao().getId());
            fichaEntity.setObservacao(observacaoEntity);
        }

        List<Produto> produtosEntities = fichaDTO.produtoDTO().stream()
                .map(FichaMapper::toProdutoEntity)
                .peek(produto -> produto.setFicha(fichaEntity))
                .collect(Collectors.toList());
        fichaEntity.setProdutos(produtosEntities);

        return fichaRepository.save(fichaEntity);
    }
}
