package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Fotografias.
 */
@Entity
@Table(name = "fotografias")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Fotografias implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "autor")
    private String autor;

    @Column(name = "avaliacao")
    private String avaliacao;

    @OneToMany(mappedBy = "fotografias")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "situacoesTrilhas", "pontosCardeais", "usuario", "fotografias" }, allowSetters = true)
    private Set<Trilha> trilhas = new HashSet<>();

    @OneToMany(mappedBy = "fotografias")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "pontosCardeais", "fotografias" }, allowSetters = true)
    private Set<PontosVenda> pontosVendas = new HashSet<>();

    @OneToMany(mappedBy = "fotografias")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "pontosCardeais", "fotografias" }, allowSetters = true)
    private Set<PontosTuristicos> pontosTuristicos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Fotografias id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public Fotografias nome(String nome) {
        this.setNome(nome);
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public Fotografias descricao(String descricao) {
        this.setDescricao(descricao);
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getAutor() {
        return this.autor;
    }

    public Fotografias autor(String autor) {
        this.setAutor(autor);
        return this;
    }

    public void setAutor(String autor) {
        this.autor = autor;
    }

    public String getAvaliacao() {
        return this.avaliacao;
    }

    public Fotografias avaliacao(String avaliacao) {
        this.setAvaliacao(avaliacao);
        return this;
    }

    public void setAvaliacao(String avaliacao) {
        this.avaliacao = avaliacao;
    }

    public Set<Trilha> getTrilhas() {
        return this.trilhas;
    }

    public void setTrilhas(Set<Trilha> trilhas) {
        if (this.trilhas != null) {
            this.trilhas.forEach(i -> i.setFotografias(null));
        }
        if (trilhas != null) {
            trilhas.forEach(i -> i.setFotografias(this));
        }
        this.trilhas = trilhas;
    }

    public Fotografias trilhas(Set<Trilha> trilhas) {
        this.setTrilhas(trilhas);
        return this;
    }

    public Fotografias addTrilha(Trilha trilha) {
        this.trilhas.add(trilha);
        trilha.setFotografias(this);
        return this;
    }

    public Fotografias removeTrilha(Trilha trilha) {
        this.trilhas.remove(trilha);
        trilha.setFotografias(null);
        return this;
    }

    public Set<PontosVenda> getPontosVendas() {
        return this.pontosVendas;
    }

    public void setPontosVendas(Set<PontosVenda> pontosVendas) {
        if (this.pontosVendas != null) {
            this.pontosVendas.forEach(i -> i.setFotografias(null));
        }
        if (pontosVendas != null) {
            pontosVendas.forEach(i -> i.setFotografias(this));
        }
        this.pontosVendas = pontosVendas;
    }

    public Fotografias pontosVendas(Set<PontosVenda> pontosVendas) {
        this.setPontosVendas(pontosVendas);
        return this;
    }

    public Fotografias addPontosVenda(PontosVenda pontosVenda) {
        this.pontosVendas.add(pontosVenda);
        pontosVenda.setFotografias(this);
        return this;
    }

    public Fotografias removePontosVenda(PontosVenda pontosVenda) {
        this.pontosVendas.remove(pontosVenda);
        pontosVenda.setFotografias(null);
        return this;
    }

    public Set<PontosTuristicos> getPontosTuristicos() {
        return this.pontosTuristicos;
    }

    public void setPontosTuristicos(Set<PontosTuristicos> pontosTuristicos) {
        if (this.pontosTuristicos != null) {
            this.pontosTuristicos.forEach(i -> i.setFotografias(null));
        }
        if (pontosTuristicos != null) {
            pontosTuristicos.forEach(i -> i.setFotografias(this));
        }
        this.pontosTuristicos = pontosTuristicos;
    }

    public Fotografias pontosTuristicos(Set<PontosTuristicos> pontosTuristicos) {
        this.setPontosTuristicos(pontosTuristicos);
        return this;
    }

    public Fotografias addPontosTuristicos(PontosTuristicos pontosTuristicos) {
        this.pontosTuristicos.add(pontosTuristicos);
        pontosTuristicos.setFotografias(this);
        return this;
    }

    public Fotografias removePontosTuristicos(PontosTuristicos pontosTuristicos) {
        this.pontosTuristicos.remove(pontosTuristicos);
        pontosTuristicos.setFotografias(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Fotografias)) {
            return false;
        }
        return id != null && id.equals(((Fotografias) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Fotografias{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", autor='" + getAutor() + "'" +
            ", avaliacao='" + getAvaliacao() + "'" +
            "}";
    }
}
