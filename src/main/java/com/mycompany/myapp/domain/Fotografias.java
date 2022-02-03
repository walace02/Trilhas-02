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
    @OneToMany(mappedBy = "fotografias")
    @OneToMany(mappedBy = "fotografias")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "situacoesTrilhas", "pontosCardeais", "usuario", "fotografias" }, allowSetters = true)
    private Set<Trilha> fotografias = new HashSet<>();

    @OneToMany(mappedBy = "fotografias")
    @OneToMany(mappedBy = "fotografias")
    @OneToMany(mappedBy = "fotografias")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "pontosCardeais", "fotografias" }, allowSetters = true)
    private Set<PontosVenda> fotografias = new HashSet<>();

    @OneToMany(mappedBy = "fotografias")
    @OneToMany(mappedBy = "fotografias")
    @OneToMany(mappedBy = "fotografias")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "pontosCardeais", "fotografias" }, allowSetters = true)
    private Set<PontosTuristicos> fotografias = new HashSet<>();

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

    public Set<Trilha> getFotografias() {
        return this.fotografias;
    }

    public void setFotografias(Set<Trilha> trilhas) {
        if (this.fotografias != null) {
            this.fotografias.forEach(i -> i.setFotografias(null));
        }
        if (trilhas != null) {
            trilhas.forEach(i -> i.setFotografias(this));
        }
        this.fotografias = trilhas;
    }

    public Fotografias fotografias(Set<Trilha> trilhas) {
        this.setFotografias(trilhas);
        return this;
    }

    public Fotografias addFotografias(Trilha trilha) {
        this.fotografias.add(trilha);
        trilha.setFotografias(this);
        return this;
    }

    public Fotografias removeFotografias(Trilha trilha) {
        this.fotografias.remove(trilha);
        trilha.setFotografias(null);
        return this;
    }

    public Set<PontosVenda> getFotografias() {
        return this.fotografias;
    }

    public void setFotografias(Set<PontosVenda> pontosVendas) {
        if (this.fotografias != null) {
            this.fotografias.forEach(i -> i.setFotografias(null));
        }
        if (pontosVendas != null) {
            pontosVendas.forEach(i -> i.setFotografias(this));
        }
        this.fotografias = pontosVendas;
    }

    public Fotografias fotografias(Set<PontosVenda> pontosVendas) {
        this.setFotografias(pontosVendas);
        return this;
    }

    public Fotografias addFotografias(PontosVenda pontosVenda) {
        this.fotografias.add(pontosVenda);
        pontosVenda.setFotografias(this);
        return this;
    }

    public Fotografias removeFotografias(PontosVenda pontosVenda) {
        this.fotografias.remove(pontosVenda);
        pontosVenda.setFotografias(null);
        return this;
    }

    public Set<PontosTuristicos> getFotografias() {
        return this.fotografias;
    }

    public void setFotografias(Set<PontosTuristicos> pontosTuristicos) {
        if (this.fotografias != null) {
            this.fotografias.forEach(i -> i.setFotografias(null));
        }
        if (pontosTuristicos != null) {
            pontosTuristicos.forEach(i -> i.setFotografias(this));
        }
        this.fotografias = pontosTuristicos;
    }

    public Fotografias fotografias(Set<PontosTuristicos> pontosTuristicos) {
        this.setFotografias(pontosTuristicos);
        return this;
    }

    public Fotografias addFotografias(PontosTuristicos pontosTuristicos) {
        this.fotografias.add(pontosTuristicos);
        pontosTuristicos.setFotografias(this);
        return this;
    }

    public Fotografias removeFotografias(PontosTuristicos pontosTuristicos) {
        this.fotografias.remove(pontosTuristicos);
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
