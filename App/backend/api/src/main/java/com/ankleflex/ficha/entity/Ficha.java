package com.ankleflex.ficha.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "fichas")
public class Ficha {

    @Id
    @Column(name = "id")
    private Long id;

    @OneToOne(mappedBy = "ficha", cascade = CascadeType.ALL, orphanRemoval = true)
    private Identidade identidade;

    @OneToOne(mappedBy = "ficha", cascade = CascadeType.ALL, orphanRemoval = true)
    private Caracteristica caracteristica;

    @OneToOne(mappedBy = "ficha", cascade = CascadeType.ALL, orphanRemoval = true)
    private Localizacao localizacao;

    @OneToOne(mappedBy = "ficha", cascade = CascadeType.ALL, orphanRemoval = true)
    private Informacao informacao;

    @OneToOne(mappedBy = "ficha", cascade = CascadeType.ALL, orphanRemoval = true)
    private Tipo tipo;

    @OneToOne(mappedBy = "ficha", cascade = CascadeType.ALL, orphanRemoval = true)
    private Observacao observacao;


    @OneToMany(mappedBy = "ficha", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Produto> produtos = new ArrayList<>();

    public Ficha() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Identidade getIdentidade() {
        return identidade;
    }

    public void setIdentidade(Identidade identidade) {
        if (identidade != null) {
            identidade.setFicha(this);
        }
        this.identidade = identidade;
    }

    public Caracteristica getCaracteristica() {
        return caracteristica;
    }

    public void setCaracteristica(Caracteristica caracteristica) {
        if (caracteristica != null) {
            caracteristica.setFicha(this);
        }
        this.caracteristica = caracteristica;
    }

    public Localizacao getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(Localizacao localizacao) {
        if (localizacao != null) {
            localizacao.setFicha(this);
        }
        this.localizacao = localizacao;
    }

    public Informacao getInformacao() {
        return informacao;
    }

    public void setInformacao(Informacao informacao) {
        if (informacao != null) {
            informacao.setFicha(this);
        }
        this.informacao = informacao;
    }

    public Tipo getTipo() {
        return tipo;
    }

    public void setTipo(Tipo tipo) {
        if (tipo != null) {
            tipo.setFicha(this);
        }
        this.tipo = tipo;
    }

    public Observacao getObservacao() {
        return observacao;
    }

    public void setObservacao(Observacao observacao) {
        if (observacao != null) {
            observacao.setFicha(this);
        }
        this.observacao = observacao;
    }


    public List<Produto> getProdutos() {
        return produtos;
    }

    public void setProdutos(List<Produto> produtos) {
        this.produtos.clear();
        if (produtos != null) {
            for (Produto produto : produtos) {
                addProduto(produto);
            }
        }
    }

    public void addProduto(Produto produto) {
        this.produtos.add(produto);
        produto.setFicha(this);
    }

    public void removeProduto(Produto produto) {
        this.produtos.remove(produto);
        produto.setFicha(null);
    }
}