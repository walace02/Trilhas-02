package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Trilhas.
 */
@Entity
@Table(name = "trilhas")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Trilhas implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "comprimento")
    private Float comprimento;

    @Column(name = "avaliacao")
    private String avaliacao;

    @OneToOne
    @JoinColumn(unique = true)
    private SituacoesTrilha situacoesTrilha;

    @JsonIgnoreProperties(value = { "municipios" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private PontosCardeais pontosCardeais;

    @OneToMany(mappedBy = "trilhas")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "pontosCardeais", "fotografias", "trilhas" }, allowSetters = true)
    private Set<PontosVenda> pontosVendas = new HashSet<>();

    @OneToMany(mappedBy = "trilhas")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "pontosCardeais", "fotografias", "trilhas" }, allowSetters = true)
    private Set<PontosTuristicos> pontosTuristicos = new HashSet<>();

    @OneToMany(mappedBy = "trilhas")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "trilhas", "pontosTuristicos", "pontosVenda" }, allowSetters = true)
    private Set<Fotografias> fotografias = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Trilhas id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public Trilhas nome(String nome) {
        this.setNome(nome);
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public Trilhas descricao(String descricao) {
        this.setDescricao(descricao);
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Float getComprimento() {
        return this.comprimento;
    }

    public Trilhas comprimento(Float comprimento) {
        this.setComprimento(comprimento);
        return this;
    }

    public void setComprimento(Float comprimento) {
        this.comprimento = comprimento;
    }

    public String getAvaliacao() {
        return this.avaliacao;
    }

    public Trilhas avaliacao(String avaliacao) {
        this.setAvaliacao(avaliacao);
        return this;
    }

    public void setAvaliacao(String avaliacao) {
        this.avaliacao = avaliacao;
    }

    public SituacoesTrilha getSituacoesTrilha() {
        return this.situacoesTrilha;
    }

    public void setSituacoesTrilha(SituacoesTrilha situacoesTrilha) {
        this.situacoesTrilha = situacoesTrilha;
    }

    public Trilhas situacoesTrilha(SituacoesTrilha situacoesTrilha) {
        this.setSituacoesTrilha(situacoesTrilha);
        return this;
    }

    public PontosCardeais getPontosCardeais() {
        return this.pontosCardeais;
    }

    public void setPontosCardeais(PontosCardeais pontosCardeais) {
        this.pontosCardeais = pontosCardeais;
    }

    public Trilhas pontosCardeais(PontosCardeais pontosCardeais) {
        this.setPontosCardeais(pontosCardeais);
        return this;
    }

    public Set<PontosVenda> getPontosVendas() {
        return this.pontosVendas;
    }

    public void setPontosVendas(Set<PontosVenda> pontosVendas) {
        if (this.pontosVendas != null) {
            this.pontosVendas.forEach(i -> i.setTrilhas(null));
        }
        if (pontosVendas != null) {
            pontosVendas.forEach(i -> i.setTrilhas(this));
        }
        this.pontosVendas = pontosVendas;
    }

    public Trilhas pontosVendas(Set<PontosVenda> pontosVendas) {
        this.setPontosVendas(pontosVendas);
        return this;
    }

    public Trilhas addPontosVenda(PontosVenda pontosVenda) {
        this.pontosVendas.add(pontosVenda);
        pontosVenda.setTrilhas(this);
        return this;
    }

    public Trilhas removePontosVenda(PontosVenda pontosVenda) {
        this.pontosVendas.remove(pontosVenda);
        pontosVenda.setTrilhas(null);
        return this;
    }

    public Set<PontosTuristicos> getPontosTuristicos() {
        return this.pontosTuristicos;
    }

    public void setPontosTuristicos(Set<PontosTuristicos> pontosTuristicos) {
        if (this.pontosTuristicos != null) {
            this.pontosTuristicos.forEach(i -> i.setTrilhas(null));
        }
        if (pontosTuristicos != null) {
            pontosTuristicos.forEach(i -> i.setTrilhas(this));
        }
        this.pontosTuristicos = pontosTuristicos;
    }

    public Trilhas pontosTuristicos(Set<PontosTuristicos> pontosTuristicos) {
        this.setPontosTuristicos(pontosTuristicos);
        return this;
    }

    public Trilhas addPontosTuristicos(PontosTuristicos pontosTuristicos) {
        this.pontosTuristicos.add(pontosTuristicos);
        pontosTuristicos.setTrilhas(this);
        return this;
    }

    public Trilhas removePontosTuristicos(PontosTuristicos pontosTuristicos) {
        this.pontosTuristicos.remove(pontosTuristicos);
        pontosTuristicos.setTrilhas(null);
        return this;
    }

    public Set<Fotografias> getFotografias() {
        return this.fotografias;
    }

    public void setFotografias(Set<Fotografias> fotografias) {
        if (this.fotografias != null) {
            this.fotografias.forEach(i -> i.setTrilhas(null));
        }
        if (fotografias != null) {
            fotografias.forEach(i -> i.setTrilhas(this));
        }
        this.fotografias = fotografias;
    }

    public Trilhas fotografias(Set<Fotografias> fotografias) {
        this.setFotografias(fotografias);
        return this;
    }

    public Trilhas addFotografias(Fotografias fotografias) {
        this.fotografias.add(fotografias);
        fotografias.setTrilhas(this);
        return this;
    }

    public Trilhas removeFotografias(Fotografias fotografias) {
        this.fotografias.remove(fotografias);
        fotografias.setTrilhas(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Trilhas)) {
            return false;
        }
        return id != null && id.equals(((Trilhas) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Trilhas{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", comprimento=" + getComprimento() +
            ", avaliacao='" + getAvaliacao() + "'" +
            "}";
    }
}
