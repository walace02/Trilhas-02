package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A PontosCardeais.
 */
@Entity
@Table(name = "pontos_cardeais")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class PontosCardeais implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "latitude")
    private String latitude;

    @Column(name = "longitude")
    private String longitude;

    @OneToOne
    @JoinColumn(unique = true)
    private Municipios municipios;

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

    public PontosCardeais id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLatitude() {
        return this.latitude;
    }

    public PontosCardeais latitude(String latitude) {
        this.setLatitude(latitude);
        return this;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return this.longitude;
    }

    public PontosCardeais longitude(String longitude) {
        this.setLongitude(longitude);
        return this;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public Municipios getMunicipios() {
        return this.municipios;
    }

    public void setMunicipios(Municipios municipios) {
        this.municipios = municipios;
    }

    public PontosCardeais municipios(Municipios municipios) {
        this.setMunicipios(municipios);
        return this;
    }

    public CadastroTrilha getCadastroTrilha() {
        return this.cadastroTrilha;
    }

    public void setCadastroTrilha(CadastroTrilha cadastroTrilha) {
        this.cadastroTrilha = cadastroTrilha;
    }

    public PontosCardeais cadastroTrilha(CadastroTrilha cadastroTrilha) {
        this.setCadastroTrilha(cadastroTrilha);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PontosCardeais)) {
            return false;
        }
        return id != null && id.equals(((PontosCardeais) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PontosCardeais{" +
            "id=" + getId() +
            ", latitude='" + getLatitude() + "'" +
            ", longitude='" + getLongitude() + "'" +
            "}";
    }
}
