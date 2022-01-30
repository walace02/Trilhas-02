package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A PontosTuristicos.
 */
@Entity
@Table(name = "pontos_turisticos")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PontosTuristicos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "avaliacao")
    private String avaliacao;

    @Column(name = "tipos_pontos_turisticos")
    private String tiposPontosTuristicos;

    @JsonIgnoreProperties(value = { "cadastroTrilha" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private PontosCardeais pontosCardeais;

    @OneToMany(mappedBy = "pontosTuristicos")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "cadastroTrilha", "pontosTuristicos", "pontosVenda" }, allowSetters = true)
    private Set<Fotografias> fotografias = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(
        value = { "pontosVendas", "pontosTuristicos", "fotografias", "situacoesTrilhas", "pontosCardeais", "usuario" },
        allowSetters = true
    )
    private CadastroTrilha cadastroTrilha;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public PontosTuristicos id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public PontosTuristicos nome(String nome) {
        this.setNome(nome);
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public PontosTuristicos descricao(String descricao) {
        this.setDescricao(descricao);
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getAvaliacao() {
        return this.avaliacao;
    }

    public PontosTuristicos avaliacao(String avaliacao) {
        this.setAvaliacao(avaliacao);
        return this;
    }

    public void setAvaliacao(String avaliacao) {
        this.avaliacao = avaliacao;
    }

    public String getTiposPontosTuristicos() {
        return this.tiposPontosTuristicos;
    }

    public PontosTuristicos tiposPontosTuristicos(String tiposPontosTuristicos) {
        this.setTiposPontosTuristicos(tiposPontosTuristicos);
        return this;
    }

    public void setTiposPontosTuristicos(String tiposPontosTuristicos) {
        this.tiposPontosTuristicos = tiposPontosTuristicos;
    }

    public PontosCardeais getPontosCardeais() {
        return this.pontosCardeais;
    }

    public void setPontosCardeais(PontosCardeais pontosCardeais) {
        this.pontosCardeais = pontosCardeais;
    }

    public PontosTuristicos pontosCardeais(PontosCardeais pontosCardeais) {
        this.setPontosCardeais(pontosCardeais);
        return this;
    }

    public Set<Fotografias> getFotografias() {
        return this.fotografias;
    }

    public void setFotografias(Set<Fotografias> fotografias) {
        if (this.fotografias != null) {
            this.fotografias.forEach(i -> i.setPontosTuristicos(null));
        }
        if (fotografias != null) {
            fotografias.forEach(i -> i.setPontosTuristicos(this));
        }
        this.fotografias = fotografias;
    }

    public PontosTuristicos fotografias(Set<Fotografias> fotografias) {
        this.setFotografias(fotografias);
        return this;
    }

    public PontosTuristicos addFotografias(Fotografias fotografias) {
        this.fotografias.add(fotografias);
        fotografias.setPontosTuristicos(this);
        return this;
    }

    public PontosTuristicos removeFotografias(Fotografias fotografias) {
        this.fotografias.remove(fotografias);
        fotografias.setPontosTuristicos(null);
        return this;
    }

    public CadastroTrilha getCadastroTrilha() {
        return this.cadastroTrilha;
    }

    public void setCadastroTrilha(CadastroTrilha cadastroTrilha) {
        this.cadastroTrilha = cadastroTrilha;
    }

    public PontosTuristicos cadastroTrilha(CadastroTrilha cadastroTrilha) {
        this.setCadastroTrilha(cadastroTrilha);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PontosTuristicos)) {
            return false;
        }
        return id != null && id.equals(((PontosTuristicos) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PontosTuristicos{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", avaliacao='" + getAvaliacao() + "'" +
            ", tiposPontosTuristicos='" + getTiposPontosTuristicos() + "'" +
            "}";
    }
}
