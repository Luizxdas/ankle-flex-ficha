package com.ankleflex.ficha.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "informacoes")
public class Informacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "ficha_id")
    private Ficha ficha;

    @Column(name = "lado")
    private Character lado;

    @Column(name = "n_pe")
    private Integer nPe;

    @Column(name = "causa_amputacao")
    private String causaAmputacao;

    @Column(name = "tempo")
    private String tempo;

    @Column(name = "preco")
    private BigDecimal preco;

    @Column(name = "data_entrega")
    private LocalDate dataEntrega;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Ficha getFicha() {
        return ficha;
    }

    public void setFicha(Ficha ficha) {
        this.ficha = ficha;
    }

    public Character getLado() {
        return lado;
    }

    public void setLado(Character lado) {
        this.lado = lado;
    }

    public Integer getNPe() {
        return nPe;
    }

    public void setNPe(Integer nPe) {
        this.nPe = nPe;
    }

    public String getCausaAmputacao() {
        return causaAmputacao;
    }

    public void setCausaAmputacao(String causaAmputacao) {
        this.causaAmputacao = causaAmputacao;
    }

    public String getTempo() {
        return tempo;
    }

    public void setTempo(String tempo) {
        this.tempo = tempo;
    }

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    public LocalDate getDataEntrega() {
        return dataEntrega;
    }

    public void setDataEntrega(LocalDate dataEntrega) {
        this.dataEntrega = dataEntrega;
    }
}
