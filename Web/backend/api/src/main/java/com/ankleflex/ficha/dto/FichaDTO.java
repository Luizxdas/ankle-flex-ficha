package com.ankleflex.ficha.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public record FichaDTO(
        Long fichaId,
        @JsonProperty("identidade") IdentidadeDTO identidadeDTO,
        @JsonProperty("caracteristicas") CaracteristicaDTO caracteristicasDTO,
        @JsonProperty("localizacao") LocalizacaoDTO localizacaoDTO,
        @JsonProperty("informacoes") InformacaoDTO informacaoDTO,
        @JsonProperty("produtos") List<ProdutoDTO> produtoDTO,
        @JsonProperty("tipos") TipoDTO tipoDTO,
        @JsonProperty("observacoes") ObservacaoDTO observacaoDTO
) {

}