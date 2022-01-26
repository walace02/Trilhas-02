package com.mycompany.myapp.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A SituacoesTrilha.
 */
@Entity
@Table(name = "situacoes_trilha")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SituacoesTrilha implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "situacao")
    private Boolean situacao;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public SituacoesTrilha id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getSituacao() {
        return this.situacao;
    }

    public SituacoesTrilha situacao(Boolean situacao) {
        this.setSituacao(situacao);
        return this;
    }

    public void setSituacao(Boolean situacao) {
        this.situacao = situacao;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SituacoesTrilha)) {
            return false;
        }
        return id != null && id.equals(((SituacoesTrilha) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SituacoesTrilha{" +
            "id=" + getId() +
            ", situacao='" + getSituacao() + "'" +
            "}";
    }
}
