package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CadastroTrilha.
 */
@Entity
@Table(name = "cadastro_trilha")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class CadastroTrilha implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "descricao")
    private String descricao;

    @NotNull
    @Column(name = "comprimento", nullable = false)
    private Float comprimento;

    @Column(name = "avaliacao")
    private String avaliacao;

    @Column(name = "data_hora")
    private String dataHora;

    @JsonIgnoreProperties(
        value = { "situacoesTrilha", "pontosCardeais", "pontosVendas", "pontosTuristicos", "fotografias" },
        allowSetters = true
    )
    @OneToOne
    @JoinColumn(unique = true)
    private Trilhas trilhas;

    @ManyToOne
    @JsonIgnoreProperties(value = { "cadastroTrilhas" }, allowSetters = true)
    private Usuario usuario;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public CadastroTrilha id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return this.nome;
    }

    public CadastroTrilha nome(String nome) {
        this.setNome(nome);
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public CadastroTrilha descricao(String descricao) {
        this.setDescricao(descricao);
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Float getComprimento() {
        return this.comprimento;
    }

    public CadastroTrilha comprimento(Float comprimento) {
        this.setComprimento(comprimento);
        return this;
    }

    public void setComprimento(Float comprimento) {
        this.comprimento = comprimento;
    }

    public String getAvaliacao() {
        return this.avaliacao;
    }

    public CadastroTrilha avaliacao(String avaliacao) {
        this.setAvaliacao(avaliacao);
        return this;
    }

    public void setAvaliacao(String avaliacao) {
        this.avaliacao = avaliacao;
    }

    public String getDataHora() {
        return this.dataHora;
    }

    public CadastroTrilha dataHora(String dataHora) {
        this.setDataHora(dataHora);
        return this;
    }

    public void setDataHora(String dataHora) {
        this.dataHora = dataHora;
    }

    public Trilhas getTrilhas() {
        return this.trilhas;
    }

    public void setTrilhas(Trilhas trilhas) {
        this.trilhas = trilhas;
    }

    public CadastroTrilha trilhas(Trilhas trilhas) {
        this.setTrilhas(trilhas);
        return this;
    }

    public Usuario getUsuario() {
        return this.usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public CadastroTrilha usuario(Usuario usuario) {
        this.setUsuario(usuario);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CadastroTrilha)) {
            return false;
        }
        return id != null && id.equals(((CadastroTrilha) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CadastroTrilha{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", comprimento=" + getComprimento() +
            ", avaliacao='" + getAvaliacao() + "'" +
            ", dataHora='" + getDataHora() + "'" +
            "}";
    }
}
