package com.ankleflex.ficha.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "identidade")
public class Identidade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "ficha_id")
    private Ficha ficha;

    @Column(name = "nome_paciente")
    private String nomePaciente;

    @Column(name = "data_ficha")
    private LocalDate dataFicha;

    private String telefone;

    public Long getId() { return id; }

    public void setId(Long id) {this.id = id; }

    public Ficha getFicha() {
        return ficha;
    }

    public void setFicha(Ficha ficha) {
        this.ficha = ficha;
    }

    public String getNomePaciente() {
        return nomePaciente;
    }

    public void setNomePaciente(String nomePaciente) {
        this.nomePaciente = nomePaciente;
    }

    public LocalDate getDataFicha() {
        return dataFicha;
    }

    public void setDataFicha(LocalDate dataFicha) {
        this.dataFicha = dataFicha;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
}