package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Usuario.
 */
@Entity
@Table(name = "usuario")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Usuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    @NotNull
    @Column(name = "senha", nullable = false)
    private String senha;

    @OneToMany(mappedBy = "usuario")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "situacoesTrilhas", "pontosCardeais", "usuario", "fotografias" }, allowSetters = true)
    private Set<Trilha> cadastroTrilhas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Usuario id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return this.email;
    }

    public Usuario email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNome() {
        return this.nome;
    }

    public Usuario nome(String nome) {
        this.setNome(nome);
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSenha() {
        return this.senha;
    }

    public Usuario senha(String senha) {
        this.setSenha(senha);
        return this;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public Set<Trilha> getCadastroTrilhas() {
        return this.cadastroTrilhas;
    }

    public void setCadastroTrilhas(Set<Trilha> trilhas) {
        if (this.cadastroTrilhas != null) {
            this.cadastroTrilhas.forEach(i -> i.setUsuario(null));
        }
        if (trilhas != null) {
            trilhas.forEach(i -> i.setUsuario(this));
        }
        this.cadastroTrilhas = trilhas;
    }

    public Usuario cadastroTrilhas(Set<Trilha> trilhas) {
        this.setCadastroTrilhas(trilhas);
        return this;
    }

    public Usuario addCadastroTrilha(Trilha trilha) {
        this.cadastroTrilhas.add(trilha);
        trilha.setUsuario(this);
        return this;
    }

    public Usuario removeCadastroTrilha(Trilha trilha) {
        this.cadastroTrilhas.remove(trilha);
        trilha.setUsuario(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Usuario)) {
            return false;
        }
        return id != null && id.equals(((Usuario) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Usuario{" +
            "id=" + getId() +
            ", email='" + getEmail() + "'" +
            ", nome='" + getNome() + "'" +
            ", senha='" + getSenha() + "'" +
            "}";
    }
}
