package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
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

    @ManyToOne
    @JsonIgnoreProperties(
        value = { "pontosVendas", "pontosTuristicos", "fotografias", "situacoesTrilhas", "pontosCardeais", "usuario" },
        allowSetters = true
    )
    private CadastroTrilha cadastroTrilha;

    @ManyToOne
    @JsonIgnoreProperties(value = { "pontosCardeais", "fotografias", "cadastroTrilha" }, allowSetters = true)
    private PontosTuristicos pontosTuristicos;

    @ManyToOne
    @JsonIgnoreProperties(value = { "pontosCardeais", "fotografias", "cadastroTrilha" }, allowSetters = true)
    private PontosVenda pontosVenda;

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

    public CadastroTrilha getCadastroTrilha() {
        return this.cadastroTrilha;
    }

    public void setCadastroTrilha(CadastroTrilha cadastroTrilha) {
        this.cadastroTrilha = cadastroTrilha;
    }

    public Fotografias cadastroTrilha(CadastroTrilha cadastroTrilha) {
        this.setCadastroTrilha(cadastroTrilha);
        return this;
    }

    public PontosTuristicos getPontosTuristicos() {
        return this.pontosTuristicos;
    }

    public void setPontosTuristicos(PontosTuristicos pontosTuristicos) {
        this.pontosTuristicos = pontosTuristicos;
    }

    public Fotografias pontosTuristicos(PontosTuristicos pontosTuristicos) {
        this.setPontosTuristicos(pontosTuristicos);
        return this;
    }

    public PontosVenda getPontosVenda() {
        return this.pontosVenda;
    }

    public void setPontosVenda(PontosVenda pontosVenda) {
        this.pontosVenda = pontosVenda;
    }

    public Fotografias pontosVenda(PontosVenda pontosVenda) {
        this.setPontosVenda(pontosVenda);
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
