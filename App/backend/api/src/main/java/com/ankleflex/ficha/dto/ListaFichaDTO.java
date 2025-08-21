package com.ankleflex.ficha.dto;


import java.time.LocalDate;
import java.util.List;

public record ListaFichaDTO(Long id, String nome, List<String> tipoProduto, LocalDate data) {
}
