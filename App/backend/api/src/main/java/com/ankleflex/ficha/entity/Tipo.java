package com.ankleflex.ficha.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tipos")
public class Tipo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "ficha_id")
    private Ficha ficha;

    @Column(name = "pe")
    private String pe;

    @Column(name = "joelho")
    private String joelho;

    @Column(name = "quadril")
    private String quadril;

    @Column(name = "encaixe")
    private String encaixe;

    @Column(name = "liner")
    private String liner;

    @Column(name = "n_liner")
    private Integer nLiner;

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

    public String getPe() {
        return pe;
    }

    public void setPe(String pe) {
        this.pe = pe;
    }

    public String getJoelho() {
        return joelho;
    }

    public void setJoelho(String joelho) {
        this.joelho = joelho;
    }

    public String getQuadril() {
        return quadril;
    }

    public void setQuadril(String quadril) {
        this.quadril = quadril;
    }

    public String getEncaixe() {
        return encaixe;
    }

    public void setEncaixe(String encaixe) {
        this.encaixe = encaixe;
    }

    public String getLiner() {
        return liner;
    }

    public void setLiner(String liner) {
        this.liner = liner;
    }

    public Integer getNLiner() {
        return nLiner;
    }

    public void setNLiner(Integer nLiner) {
        this.nLiner = nLiner;
    }
}
