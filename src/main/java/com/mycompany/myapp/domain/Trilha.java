package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Trilha.
 */
@Entity
@Table(name = "trilha")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Trilha implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "nome_trilha", nullable = false)
    private String nomeTrilha;

    @NotNull
    @Column(name = "nome_municipio", nullable = false)
    private String nomeMunicipio;

    @Column(name = "descricao")
    private String descricao;

    @NotNull
    @Column(name = "comprimento", nullable = false)
    private Float comprimento;

    @Column(name = "data_hora")
    private LocalDate dataHora;

    @OneToMany(mappedBy = "trilha")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "trilha" }, allowSetters = true)
    private Set<SituacoesTrilha> situacoesTrilhas = new HashSet<>();

    @OneToMany(mappedBy = "trilha")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "trilha" }, allowSetters = true)
    private Set<PontosCardeais> pontosCardeais = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "cadastroTrilhas" }, allowSetters = true)
    private Usuario usuario;

    @ManyToOne
    @JsonIgnoreProperties(value = { "fotografias", "fotografias", "fotografias" }, allowSetters = true)
    private Fotografias fotografias;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Trilha id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeTrilha() {
        return this.nomeTrilha;
    }

    public Trilha nomeTrilha(String nomeTrilha) {
        this.setNomeTrilha(nomeTrilha);
        return this;
    }

    public void setNomeTrilha(String nomeTrilha) {
        this.nomeTrilha = nomeTrilha;
    }

    public String getNomeMunicipio() {
        return this.nomeMunicipio;
    }

    public Trilha nomeMunicipio(String nomeMunicipio) {
        this.setNomeMunicipio(nomeMunicipio);
        return this;
    }

    public void setNomeMunicipio(String nomeMunicipio) {
        this.nomeMunicipio = nomeMunicipio;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public Trilha descricao(String descricao) {
        this.setDescricao(descricao);
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Float getComprimento() {
        return this.comprimento;
    }

    public Trilha comprimento(Float comprimento) {
        this.setComprimento(comprimento);
        return this;
    }

    public void setComprimento(Float comprimento) {
        this.comprimento = comprimento;
    }

    public LocalDate getDataHora() {
        return this.dataHora;
    }

    public Trilha dataHora(LocalDate dataHora) {
        this.setDataHora(dataHora);
        return this;
    }

    public void setDataHora(LocalDate dataHora) {
        this.dataHora = dataHora;
    }

    public Set<SituacoesTrilha> getSituacoesTrilhas() {
        return this.situacoesTrilhas;
    }

    public void setSituacoesTrilhas(Set<SituacoesTrilha> situacoesTrilhas) {
        if (this.situacoesTrilhas != null) {
            this.situacoesTrilhas.forEach(i -> i.setTrilha(null));
        }
        if (situacoesTrilhas != null) {
            situacoesTrilhas.forEach(i -> i.setTrilha(this));
        }
        this.situacoesTrilhas = situacoesTrilhas;
    }

    public Trilha situacoesTrilhas(Set<SituacoesTrilha> situacoesTrilhas) {
        this.setSituacoesTrilhas(situacoesTrilhas);
        return this;
    }

    public Trilha addSituacoesTrilha(SituacoesTrilha situacoesTrilha) {
        this.situacoesTrilhas.add(situacoesTrilha);
        situacoesTrilha.setTrilha(this);
        return this;
    }

    public Trilha removeSituacoesTrilha(SituacoesTrilha situacoesTrilha) {
        this.situacoesTrilhas.remove(situacoesTrilha);
        situacoesTrilha.setTrilha(null);
        return this;
    }

    public Set<PontosCardeais> getPontosCardeais() {
        return this.pontosCardeais;
    }

    public void setPontosCardeais(Set<PontosCardeais> pontosCardeais) {
        if (this.pontosCardeais != null) {
            this.pontosCardeais.forEach(i -> i.setTrilha(null));
        }
        if (pontosCardeais != null) {
            pontosCardeais.forEach(i -> i.setTrilha(this));
        }
        this.pontosCardeais = pontosCardeais;
    }

    public Trilha pontosCardeais(Set<PontosCardeais> pontosCardeais) {
        this.setPontosCardeais(pontosCardeais);
        return this;
    }

    public Trilha addPontosCardeais(PontosCardeais pontosCardeais) {
        this.pontosCardeais.add(pontosCardeais);
        pontosCardeais.setTrilha(this);
        return this;
    }

    public Trilha removePontosCardeais(PontosCardeais pontosCardeais) {
        this.pontosCardeais.remove(pontosCardeais);
        pontosCardeais.setTrilha(null);
        return this;
    }

    public Usuario getUsuario() {
        return this.usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Trilha usuario(Usuario usuario) {
        this.setUsuario(usuario);
        return this;
    }

    public Fotografias getFotografias() {
        return this.fotografias;
    }

    public void setFotografias(Fotografias fotografias) {
        this.fotografias = fotografias;
    }

    public Trilha fotografias(Fotografias fotografias) {
        this.setFotografias(fotografias);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Trilha)) {
            return false;
        }
        return id != null && id.equals(((Trilha) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Trilha{" +
            "id=" + getId() +
            ", nomeTrilha='" + getNomeTrilha() + "'" +
            ", nomeMunicipio='" + getNomeMunicipio() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", comprimento=" + getComprimento() +
            ", dataHora='" + getDataHora() + "'" +
            "}";
    }
}
