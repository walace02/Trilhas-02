import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPontosTuristicos, getPontosTuristicosIdentifier } from '../pontos-turisticos.model';

export type EntityResponseType = HttpResponse<IPontosTuristicos>;
export type EntityArrayResponseType = HttpResponse<IPontosTuristicos[]>;

@Injectable({ providedIn: 'root' })
export class PontosTuristicosService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/pontos-turisticos');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(pontosTuristicos: IPontosTuristicos): Observable<EntityResponseType> {
    return this.http.post<IPontosTuristicos>(this.resourceUrl, pontosTuristicos, { observe: 'response' });
  }

  update(pontosTuristicos: IPontosTuristicos): Observable<EntityResponseType> {
    return this.http.put<IPontosTuristicos>(
      `${this.resourceUrl}/${getPontosTuristicosIdentifier(pontosTuristicos) as number}`,
      pontosTuristicos,
      { observe: 'response' }
    );
  }

  partialUpdate(pontosTuristicos: IPontosTuristicos): Observable<EntityResponseType> {
    return this.http.patch<IPontosTuristicos>(
      `${this.resourceUrl}/${getPontosTuristicosIdentifier(pontosTuristicos) as number}`,
      pontosTuristicos,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPontosTuristicos>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPontosTuristicos[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPontosTuristicosToCollectionIfMissing(
    pontosTuristicosCollection: IPontosTuristicos[],
    ...pontosTuristicosToCheck: (IPontosTuristicos | null | undefined)[]
  ): IPontosTuristicos[] {
    const pontosTuristicos: IPontosTuristicos[] = pontosTuristicosToCheck.filter(isPresent);
    if (pontosTuristicos.length > 0) {
      const pontosTuristicosCollectionIdentifiers = pontosTuristicosCollection.map(
        pontosTuristicosItem => getPontosTuristicosIdentifier(pontosTuristicosItem)!
      );
      const pontosTuristicosToAdd = pontosTuristicos.filter(pontosTuristicosItem => {
        const pontosTuristicosIdentifier = getPontosTuristicosIdentifier(pontosTuristicosItem);
        if (pontosTuristicosIdentifier == null || pontosTuristicosCollectionIdentifiers.includes(pontosTuristicosIdentifier)) {
          return false;
        }
        pontosTuristicosCollectionIdentifiers.push(pontosTuristicosIdentifier);
        return true;
      });
      return [...pontosTuristicosToAdd, ...pontosTuristicosCollection];
    }
    return pontosTuristicosCollection;
  }
}
