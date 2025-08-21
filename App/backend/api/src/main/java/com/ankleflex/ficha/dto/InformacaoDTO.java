package com.ankleflex.ficha.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.math.BigDecimal;
import java.time.LocalDate;

public record InformacaoDTO(Long id, Long fichaId, Character lado, Integer nPe, String causaAmputacao, String tempo, BigDecimal preco, @JsonFormat(pattern = "dd/MM/yyyy") LocalDate dataEntrega) {
}
