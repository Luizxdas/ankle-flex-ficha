package com.ankleflex.ficha.dto;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

public record IdentidadeDTO(Long id, Long fichaId, String nomePaciente, @JsonFormat(pattern = "dd/MM/yyyy") LocalDate dataFicha, String telefone) {
}
