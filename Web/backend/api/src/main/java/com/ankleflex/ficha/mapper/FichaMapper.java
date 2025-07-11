package com.ankleflex.ficha.mapper;

import com.ankleflex.ficha.dto.*;
import com.ankleflex.ficha.entity.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class FichaMapper {

    public static IdentidadeDTO toIdentidadeDTO(Identidade entity) {
        if (entity == null) return null;
        return new IdentidadeDTO(
                entity.getId(),
                entity.getFicha() != null ? entity.getFicha().getId() : null,
                entity.getNomePaciente(),
                entity.getDataFicha(),
                entity.getTelefone()
        );
    }

    public static CaracteristicaDTO toCaracteristicasDTO(Caracteristica entity) {
        if (entity == null) return null;
        return new CaracteristicaDTO(
                entity.getId(),
                entity.getFicha() != null ? entity.getFicha().getId() : null,
                entity.getIdade(),
                entity.getSexo(),
                entity.getAltura(),
                entity.getPeso()
        );
    }

    public static LocalizacaoDTO toLocalizacaoDTO(Localizacao entity) {
        if (entity == null) return null;
        return new LocalizacaoDTO(
                entity.getId(),
                entity.getFicha() != null ? entity.getFicha().getId() : null,
                entity.getEndereco(), entity.getNEndereco(),
                entity.getCep(), entity.getBairro(), entity.getCidade(), entity.getEstado()
        );
    }

    public static InformacaoDTO toInformacoesDTO(Informacao entity) {
        if (entity == null) return null;
        return new InformacaoDTO(
                entity.getId(),
                entity.getFicha() != null ? entity.getFicha().getId() : null,
                entity.getLado(), entity.getNPe(),
                entity.getCausaAmputacao(), entity.getTempo(), entity.getPreco(), entity.getDataEntrega()
        );
    }

    public static ProdutoDTO toProdutosDTO(Produto entity) {
        if (entity == null) return null;
        return new ProdutoDTO(
                entity.getId(),
                entity.getFicha() != null ? entity.getFicha().getId() : null,
                entity.getProduto(), entity.getTipo()
        );
    }

    public static TipoDTO toTiposDTO(Tipo entity) {
        if (entity == null) return null;
        return new TipoDTO(
                entity.getId(),
                entity.getFicha() != null ? entity.getFicha().getId() : null,
                entity.getPe(), entity.getJoelho(),
                entity.getQuadril(), entity.getEncaixe(), entity.getLiner(), entity.getNLiner()
        );
    }

    public static ObservacaoDTO toObservacoesDTO(Observacao entity) {
        if (entity == null) return null;
        return new ObservacaoDTO(
                entity.getId(),
                entity.getFicha() != null ? entity.getFicha().getId() : null,
                entity.getProtese(), entity.getOrtese(),
                entity.getColete(), entity.getColete(), entity.getVerso()
        );
    }

    public static FichaDTO toFichaDTO(Ficha entity) {
        if (entity == null) return null;

        List<ProdutoDTO> produtosDTO = Optional.ofNullable(entity.getProdutos())
                .orElse(Collections.emptyList())
                .stream()
                .map(FichaMapper::toProdutosDTO)
                .collect(Collectors.toList());

        return new FichaDTO(
                entity.getId(),
                toIdentidadeDTO(entity.getIdentidade()),
                toCaracteristicasDTO(entity.getCaracteristica()),
                toLocalizacaoDTO(entity.getLocalizacao()),
                toInformacoesDTO(entity.getInformacao()),
                produtosDTO,
                toTiposDTO(entity.getTipo()),
                toObservacoesDTO(entity.getObservacao())
        );
    }

    public static Identidade toIdentidadeEntity(IdentidadeDTO dto) {
        if (dto == null) return null;
        Identidade entity = new Identidade();
        if (dto.id() != null) entity.setId(dto.id());
        entity.setNomePaciente(dto.nomePaciente());
        entity.setDataFicha(dto.dataFicha());
        entity.setTelefone(dto.telefone());
        return entity;
    }

    public static Caracteristica toCaracteristicaEntity(CaracteristicaDTO dto) {
        if (dto == null) return null;
        Caracteristica entity = new Caracteristica();
        if (dto.id() != null) entity.setId(dto.id());
        entity.setIdade(dto.idade());
        entity.setSexo(dto.sexo());
        entity.setAltura(dto.altura());
        entity.setPeso(dto.peso());
        return entity;
    }

    public static Localizacao toLocalizacaoEntity(LocalizacaoDTO dto) {
        if (dto == null) return null;
        Localizacao entity = new Localizacao();
        if (dto.id() != null) entity.setId(dto.id());
        entity.setEndereco(dto.endereco());
        entity.setNEndereco(dto.nEndereco());
        entity.setCep(dto.cep());
        entity.setBairro(dto.bairro());
        entity.setCidade(dto.cidade());
        entity.setEstado(dto.estado());
        return entity;
    }

    public static Informacao toInformacaoEntity(InformacaoDTO dto) {
        if (dto == null) return null;
        Informacao entity = new Informacao();
        if (dto.id() != null) entity.setId(dto.id());
        entity.setLado(dto.lado());
        entity.setNPe(dto.nPe());
        entity.setCausaAmputacao(dto.causaAmputacao());
        entity.setTempo(dto.tempo());
        entity.setPreco(dto.preco());
        entity.setDataEntrega(dto.dataEntrega());
        return entity;
    }

    public static Produto toProdutoEntity(ProdutoDTO dto) {
        if (dto == null) return null;
        Produto entity = new Produto();
        if (dto.id() != null) entity.setId(dto.id());
        entity.setProduto(dto.produto());
        entity.setTipo(dto.tipo());
        return entity;
    }

    public static Tipo toTipoEntity(TipoDTO dto) {
        if (dto == null) return null;
        Tipo entity = new Tipo();
        if (dto.id() != null) entity.setId(dto.id());
        entity.setPe(dto.pe());
        entity.setJoelho(dto.joelho());
        entity.setQuadril(dto.quadril());
        entity.setEncaixe(dto.encaixe());
        entity.setLiner(dto.liner());
        entity.setNLiner(dto.nLiner());
        return entity;
    }

    public static Observacao toObservacaoEntity(ObservacaoDTO dto) {
        if (dto == null) return null;
        Observacao entity = new Observacao();
        if (dto.id() != null) entity.setId(dto.id());
        entity.setProtese(dto.protese());
        entity.setOrtese(dto.ortese());
        entity.setColete(dto.colete());
        entity.setPalmilha(dto.palmilha());
        entity.setVerso(dto.verso());
        return entity;
    }
}