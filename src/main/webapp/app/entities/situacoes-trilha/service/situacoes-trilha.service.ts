import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ISituacoesTrilha, getSituacoesTrilhaIdentifier } from '../situacoes-trilha.model';

export type EntityResponseType = HttpResponse<ISituacoesTrilha>;
export type EntityArrayResponseType = HttpResponse<ISituacoesTrilha[]>;

@Injectable({ providedIn: 'root' })
export class SituacoesTrilhaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/situacoes-trilhas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(situacoesTrilha: ISituacoesTrilha): Observable<EntityResponseType> {
    return this.http.post<ISituacoesTrilha>(this.resourceUrl, situacoesTrilha, { observe: 'response' });
  }

  update(situacoesTrilha: ISituacoesTrilha): Observable<EntityResponseType> {
    return this.http.put<ISituacoesTrilha>(
      `${this.resourceUrl}/${getSituacoesTrilhaIdentifier(situacoesTrilha) as number}`,
      situacoesTrilha,
      { observe: 'response' }
    );
  }

  partialUpdate(situacoesTrilha: ISituacoesTrilha): Observable<EntityResponseType> {
    return this.http.patch<ISituacoesTrilha>(
      `${this.resourceUrl}/${getSituacoesTrilhaIdentifier(situacoesTrilha) as number}`,
      situacoesTrilha,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISituacoesTrilha>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISituacoesTrilha[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addSituacoesTrilhaToCollectionIfMissing(
    situacoesTrilhaCollection: ISituacoesTrilha[],
    ...situacoesTrilhasToCheck: (ISituacoesTrilha | null | undefined)[]
  ): ISituacoesTrilha[] {
    const situacoesTrilhas: ISituacoesTrilha[] = situacoesTrilhasToCheck.filter(isPresent);
    if (situacoesTrilhas.length > 0) {
      const situacoesTrilhaCollectionIdentifiers = situacoesTrilhaCollection.map(
        situacoesTrilhaItem => getSituacoesTrilhaIdentifier(situacoesTrilhaItem)!
      );
      const situacoesTrilhasToAdd = situacoesTrilhas.filter(situacoesTrilhaItem => {
        const situacoesTrilhaIdentifier = getSituacoesTrilhaIdentifier(situacoesTrilhaItem);
        if (situacoesTrilhaIdentifier == null || situacoesTrilhaCollectionIdentifiers.includes(situacoesTrilhaIdentifier)) {
          return false;
        }
        situacoesTrilhaCollectionIdentifiers.push(situacoesTrilhaIdentifier);
        return true;
      });
      return [...situacoesTrilhasToAdd, ...situacoesTrilhaCollection];
    }
    return situacoesTrilhaCollection;
  }
}
