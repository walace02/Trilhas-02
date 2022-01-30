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

    @OneToMany(mappedBy = "cadastroTrilha")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "pontosCardeais", "fotografias", "cadastroTrilha" }, allowSetters = true)
    private Set<PontosVenda> pontosVendas = new HashSet<>();

    @OneToMany(mappedBy = "cadastroTrilha")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "pontosCardeais", "fotografias", "cadastroTrilha" }, allowSetters = true)
    private Set<PontosTuristicos> pontosTuristicos = new HashSet<>();

    @OneToMany(mappedBy = "cadastroTrilha")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "cadastroTrilha", "pontosTuristicos", "pontosVenda" }, allowSetters = true)
    private Set<Fotografias> fotografias = new HashSet<>();

    @OneToMany(mappedBy = "cadastroTrilha")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "cadastroTrilha" }, allowSetters = true)
    private Set<SituacoesTrilha> situacoesTrilhas = new HashSet<>();

    @OneToMany(mappedBy = "cadastroTrilha")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "cadastroTrilha" }, allowSetters = true)
    private Set<PontosCardeais> pontosCardeais = new HashSet<>();

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

    public String getNomeTrilha() {
        return this.nomeTrilha;
    }

    public CadastroTrilha nomeTrilha(String nomeTrilha) {
        this.setNomeTrilha(nomeTrilha);
        return this;
    }

    public void setNomeTrilha(String nomeTrilha) {
        this.nomeTrilha = nomeTrilha;
    }

    public String getNomeMunicipio() {
        return this.nomeMunicipio;
    }

    public CadastroTrilha nomeMunicipio(String nomeMunicipio) {
        this.setNomeMunicipio(nomeMunicipio);
        return this;
    }

    public void setNomeMunicipio(String nomeMunicipio) {
        this.nomeMunicipio = nomeMunicipio;
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

    public LocalDate getDataHora() {
        return this.dataHora;
    }

    public CadastroTrilha dataHora(LocalDate dataHora) {
        this.setDataHora(dataHora);
        return this;
    }

    public void setDataHora(LocalDate dataHora) {
        this.dataHora = dataHora;
    }

    public Set<PontosVenda> getPontosVendas() {
        return this.pontosVendas;
    }

    public void setPontosVendas(Set<PontosVenda> pontosVendas) {
        if (this.pontosVendas != null) {
            this.pontosVendas.forEach(i -> i.setCadastroTrilha(null));
        }
        if (pontosVendas != null) {
            pontosVendas.forEach(i -> i.setCadastroTrilha(this));
        }
        this.pontosVendas = pontosVendas;
    }

    public CadastroTrilha pontosVendas(Set<PontosVenda> pontosVendas) {
        this.setPontosVendas(pontosVendas);
        return this;
    }

    public CadastroTrilha addPontosVenda(PontosVenda pontosVenda) {
        this.pontosVendas.add(pontosVenda);
        pontosVenda.setCadastroTrilha(this);
        return this;
    }

    public CadastroTrilha removePontosVenda(PontosVenda pontosVenda) {
        this.pontosVendas.remove(pontosVenda);
        pontosVenda.setCadastroTrilha(null);
        return this;
    }

    public Set<PontosTuristicos> getPontosTuristicos() {
        return this.pontosTuristicos;
    }

    public void setPontosTuristicos(Set<PontosTuristicos> pontosTuristicos) {
        if (this.pontosTuristicos != null) {
            this.pontosTuristicos.forEach(i -> i.setCadastroTrilha(null));
        }
        if (pontosTuristicos != null) {
            pontosTuristicos.forEach(i -> i.setCadastroTrilha(this));
        }
        this.pontosTuristicos = pontosTuristicos;
    }

    public CadastroTrilha pontosTuristicos(Set<PontosTuristicos> pontosTuristicos) {
        this.setPontosTuristicos(pontosTuristicos);
        return this;
    }

    public CadastroTrilha addPontosTuristicos(PontosTuristicos pontosTuristicos) {
        this.pontosTuristicos.add(pontosTuristicos);
        pontosTuristicos.setCadastroTrilha(this);
        return this;
    }

    public CadastroTrilha removePontosTuristicos(PontosTuristicos pontosTuristicos) {
        this.pontosTuristicos.remove(pontosTuristicos);
        pontosTuristicos.setCadastroTrilha(null);
        return this;
    }

    public Set<Fotografias> getFotografias() {
        return this.fotografias;
    }

    public void setFotografias(Set<Fotografias> fotografias) {
        if (this.fotografias != null) {
            this.fotografias.forEach(i -> i.setCadastroTrilha(null));
        }
        if (fotografias != null) {
            fotografias.forEach(i -> i.setCadastroTrilha(this));
        }
        this.fotografias = fotografias;
    }

    public CadastroTrilha fotografias(Set<Fotografias> fotografias) {
        this.setFotografias(fotografias);
        return this;
    }

    public CadastroTrilha addFotografias(Fotografias fotografias) {
        this.fotografias.add(fotografias);
        fotografias.setCadastroTrilha(this);
        return this;
    }

    public CadastroTrilha removeFotografias(Fotografias fotografias) {
        this.fotografias.remove(fotografias);
        fotografias.setCadastroTrilha(null);
        return this;
    }

    public Set<SituacoesTrilha> getSituacoesTrilhas() {
        return this.situacoesTrilhas;
    }

    public void setSituacoesTrilhas(Set<SituacoesTrilha> situacoesTrilhas) {
        if (this.situacoesTrilhas != null) {
            this.situacoesTrilhas.forEach(i -> i.setCadastroTrilha(null));
        }
        if (situacoesTrilhas != null) {
            situacoesTrilhas.forEach(i -> i.setCadastroTrilha(this));
        }
        this.situacoesTrilhas = situacoesTrilhas;
    }

    public CadastroTrilha situacoesTrilhas(Set<SituacoesTrilha> situacoesTrilhas) {
        this.setSituacoesTrilhas(situacoesTrilhas);
        return this;
    }

    public CadastroTrilha addSituacoesTrilha(SituacoesTrilha situacoesTrilha) {
        this.situacoesTrilhas.add(situacoesTrilha);
        situacoesTrilha.setCadastroTrilha(this);
        return this;
    }

    public CadastroTrilha removeSituacoesTrilha(SituacoesTrilha situacoesTrilha) {
        this.situacoesTrilhas.remove(situacoesTrilha);
        situacoesTrilha.setCadastroTrilha(null);
        return this;
    }

    public Set<PontosCardeais> getPontosCardeais() {
        return this.pontosCardeais;
    }

    public void setPontosCardeais(Set<PontosCardeais> pontosCardeais) {
        if (this.pontosCardeais != null) {
            this.pontosCardeais.forEach(i -> i.setCadastroTrilha(null));
        }
        if (pontosCardeais != null) {
            pontosCardeais.forEach(i -> i.setCadastroTrilha(this));
        }
        this.pontosCardeais = pontosCardeais;
    }

    public CadastroTrilha pontosCardeais(Set<PontosCardeais> pontosCardeais) {
        this.setPontosCardeais(pontosCardeais);
        return this;
    }

    public CadastroTrilha addPontosCardeais(PontosCardeais pontosCardeais) {
        this.pontosCardeais.add(pontosCardeais);
        pontosCardeais.setCadastroTrilha(this);
        return this;
    }

    public CadastroTrilha removePontosCardeais(PontosCardeais pontosCardeais) {
        this.pontosCardeais.remove(pontosCardeais);
        pontosCardeais.setCadastroTrilha(null);
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
            ", nomeTrilha='" + getNomeTrilha() + "'" +
            ", nomeMunicipio='" + getNomeMunicipio() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", comprimento=" + getComprimento() +
            ", dataHora='" + getDataHora() + "'" +
            "}";
    }
}
