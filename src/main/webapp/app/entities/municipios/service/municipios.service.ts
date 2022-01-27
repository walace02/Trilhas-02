import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IMunicipios, getMunicipiosIdentifier } from '../municipios.model';

export type EntityResponseType = HttpResponse<IMunicipios>;
export type EntityArrayResponseType = HttpResponse<IMunicipios[]>;

@Injectable({ providedIn: 'root' })
export class MunicipiosService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/municipios');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(municipios: IMunicipios): Observable<EntityResponseType> {
    return this.http.post<IMunicipios>(this.resourceUrl, municipios, { observe: 'response' });
  }

  update(municipios: IMunicipios): Observable<EntityResponseType> {
    return this.http.put<IMunicipios>(`${this.resourceUrl}/${getMunicipiosIdentifier(municipios) as number}`, municipios, {
      observe: 'response',
    });
  }

  partialUpdate(municipios: IMunicipios): Observable<EntityResponseType> {
    return this.http.patch<IMunicipios>(`${this.resourceUrl}/${getMunicipiosIdentifier(municipios) as number}`, municipios, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMunicipios>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMunicipios[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addMunicipiosToCollectionIfMissing(
    municipiosCollection: IMunicipios[],
    ...municipiosToCheck: (IMunicipios | null | undefined)[]
  ): IMunicipios[] {
    const municipios: IMunicipios[] = municipiosToCheck.filter(isPresent);
    if (municipios.length > 0) {
      const municipiosCollectionIdentifiers = municipiosCollection.map(municipiosItem => getMunicipiosIdentifier(municipiosItem)!);
      const municipiosToAdd = municipios.filter(municipiosItem => {
        const municipiosIdentifier = getMunicipiosIdentifier(municipiosItem);
        if (municipiosIdentifier == null || municipiosCollectionIdentifiers.includes(municipiosIdentifier)) {
          return false;
        }
        municipiosCollectionIdentifiers.push(municipiosIdentifier);
        return true;
      });
      return [...municipiosToAdd, ...municipiosCollection];
    }
    return municipiosCollection;
  }
}
