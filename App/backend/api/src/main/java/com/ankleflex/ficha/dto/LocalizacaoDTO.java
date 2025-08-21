package com.ankleflex.ficha.dto;

public record LocalizacaoDTO(Long id, Long fichaId, String endereco, Integer nEndereco, String cep, String bairro, String cidade, String estado) {
}
