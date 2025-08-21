package com.ankleflex.ficha.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "observacoes")
public class Observacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "ficha_id")
    private Ficha ficha;

    @Column(name = "protese")
    private String protese;

    @Column(name = "ortese")
    private String ortese;

    @Column(name = "colete")
    private String colete;

    @Column(name = "palmilha")
    private String palmilha;

    @Column(name = "verso")
    private String verso;

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

    public String getProtese() {
        return protese;
    }

    public void setProtese(String protese) {
        this.protese = protese;
    }

    public String getOrtese() {
        return ortese;
    }

    public void setOrtese(String ortese) {
        this.ortese = ortese;
    }

    public String getColete() {
        return colete;
    }

    public void setColete(String colete) {
        this.colete = colete;
    }

    public String getPalmilha() {
        return palmilha;
    }

    public void setPalmilha(String palmilha) {
        this.palmilha = palmilha;
    }

    public String getVerso() {
        return verso;
    }

    public void setVerso(String verso) {
        this.verso = verso;
    }
}
