import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPontosCardeais, getPontosCardeaisIdentifier } from '../pontos-cardeais.model';

export type EntityResponseType = HttpResponse<IPontosCardeais>;
export type EntityArrayResponseType = HttpResponse<IPontosCardeais[]>;

@Injectable({ providedIn: 'root' })
export class PontosCardeaisService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/pontos-cardeais');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(pontosCardeais: IPontosCardeais): Observable<EntityResponseType> {
    return this.http.post<IPontosCardeais>(this.resourceUrl, pontosCardeais, { observe: 'response' });
  }

  update(pontosCardeais: IPontosCardeais): Observable<EntityResponseType> {
    return this.http.put<IPontosCardeais>(`${this.resourceUrl}/${getPontosCardeaisIdentifier(pontosCardeais) as number}`, pontosCardeais, {
      observe: 'response',
    });
  }

  partialUpdate(pontosCardeais: IPontosCardeais): Observable<EntityResponseType> {
    return this.http.patch<IPontosCardeais>(
      `${this.resourceUrl}/${getPontosCardeaisIdentifier(pontosCardeais) as number}`,
      pontosCardeais,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPontosCardeais>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPontosCardeais[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPontosCardeaisToCollectionIfMissing(
    pontosCardeaisCollection: IPontosCardeais[],
    ...pontosCardeaisToCheck: (IPontosCardeais | null | undefined)[]
  ): IPontosCardeais[] {
    const pontosCardeais: IPontosCardeais[] = pontosCardeaisToCheck.filter(isPresent);
    if (pontosCardeais.length > 0) {
      const pontosCardeaisCollectionIdentifiers = pontosCardeaisCollection.map(
        pontosCardeaisItem => getPontosCardeaisIdentifier(pontosCardeaisItem)!
      );
      const pontosCardeaisToAdd = pontosCardeais.filter(pontosCardeaisItem => {
        const pontosCardeaisIdentifier = getPontosCardeaisIdentifier(pontosCardeaisItem);
        if (pontosCardeaisIdentifier == null || pontosCardeaisCollectionIdentifiers.includes(pontosCardeaisIdentifier)) {
          return false;
        }
        pontosCardeaisCollectionIdentifiers.push(pontosCardeaisIdentifier);
        return true;
      });
      return [...pontosCardeaisToAdd, ...pontosCardeaisCollection];
    }
    return pontosCardeaisCollection;
  }
}
