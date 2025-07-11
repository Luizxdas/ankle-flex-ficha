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
                .map(ficha -> new ListaFichaDTO(
                        ficha.getId(),
                        ficha.getIdentidade().getNomePaciente(),
                        ficha.getProdutos().stream().map(Produto::getTipo).toList(),
                        ficha.getIdentidade().getDataFicha()));
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

        Ficha fichaEntity = new Ficha();
        Long fichaId = fichaDTO.identidadeDTO().fichaId();

        Ficha fichaExistente = fichaRepository.findById(fichaId)
                .orElseThrow(() -> new EntityNotFoundException("Ficha com ID " + fichaId + " não encontrada"));

        Identidade identidadeEntity = FichaMapper.toIdentidadeEntity(fichaDTO.identidadeDTO());
        if (identidadeEntity != null) {
            identidadeEntity.setFicha(fichaEntity);
            identidadeEntity.setId(fichaExistente.getId());
            fichaEntity.setIdentidade(identidadeEntity);
        }

        if (fichaDTO.informacaoDTO() != null) {
            fichaExistente.setInformacao(FichaMapper.toInformacaoEntity(fichaDTO.informacaoDTO()));
        }

        return fichaRepository.save(fichaEntity);
    }
}
