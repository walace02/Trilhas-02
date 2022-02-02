package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A PontosVenda.
 */
@Entity
@Table(name = "pontos_venda")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PontosVenda implements Serializable {

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

    @Column(name = "tipos_pontos_venda")
    private String tiposPontosVenda;

    @JsonIgnoreProperties(value = { "trilha" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private PontosCardeais pontosCardeais;

    @ManyToOne
    @JsonIgnoreProperties(value = { "fotografias", "fotografias", "fotografias" }, allowSetters = true)
    private Fotografias fotografias;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public PontosVenda id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public PontosVenda nome(String nome) {
        this.setNome(nome);
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public PontosVenda descricao(String descricao) {
        this.setDescricao(descricao);
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getAvaliacao() {
        return this.avaliacao;
    }

    public PontosVenda avaliacao(String avaliacao) {
        this.setAvaliacao(avaliacao);
        return this;
    }

    public void setAvaliacao(String avaliacao) {
        this.avaliacao = avaliacao;
    }

    public String getTiposPontosVenda() {
        return this.tiposPontosVenda;
    }

    public PontosVenda tiposPontosVenda(String tiposPontosVenda) {
        this.setTiposPontosVenda(tiposPontosVenda);
        return this;
    }

    public void setTiposPontosVenda(String tiposPontosVenda) {
        this.tiposPontosVenda = tiposPontosVenda;
    }

    public PontosCardeais getPontosCardeais() {
        return this.pontosCardeais;
    }

    public void setPontosCardeais(PontosCardeais pontosCardeais) {
        this.pontosCardeais = pontosCardeais;
    }

    public PontosVenda pontosCardeais(PontosCardeais pontosCardeais) {
        this.setPontosCardeais(pontosCardeais);
        return this;
    }

    public Fotografias getFotografias() {
        return this.fotografias;
    }

    public void setFotografias(Fotografias fotografias) {
        this.fotografias = fotografias;
    }

    public PontosVenda fotografias(Fotografias fotografias) {
        this.setFotografias(fotografias);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PontosVenda)) {
            return false;
        }
        return id != null && id.equals(((PontosVenda) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PontosVenda{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", avaliacao='" + getAvaliacao() + "'" +
            ", tiposPontosVenda='" + getTiposPontosVenda() + "'" +
            "}";
    }
}
