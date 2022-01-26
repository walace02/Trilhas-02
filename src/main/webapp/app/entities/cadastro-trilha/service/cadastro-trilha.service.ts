import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICadastroTrilha, getCadastroTrilhaIdentifier } from '../cadastro-trilha.model';

export type EntityResponseType = HttpResponse<ICadastroTrilha>;
export type EntityArrayResponseType = HttpResponse<ICadastroTrilha[]>;

@Injectable({ providedIn: 'root' })
export class CadastroTrilhaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/cadastro-trilhas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(cadastroTrilha: ICadastroTrilha): Observable<EntityResponseType> {
    return this.http.post<ICadastroTrilha>(this.resourceUrl, cadastroTrilha, { observe: 'response' });
  }

  update(cadastroTrilha: ICadastroTrilha): Observable<EntityResponseType> {
    return this.http.put<ICadastroTrilha>(`${this.resourceUrl}/${getCadastroTrilhaIdentifier(cadastroTrilha) as number}`, cadastroTrilha, {
      observe: 'response',
    });
  }

  partialUpdate(cadastroTrilha: ICadastroTrilha): Observable<EntityResponseType> {
    return this.http.patch<ICadastroTrilha>(
      `${this.resourceUrl}/${getCadastroTrilhaIdentifier(cadastroTrilha) as number}`,
      cadastroTrilha,
      { observe: 'response' }
    );
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICadastroTrilha>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICadastroTrilha[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addCadastroTrilhaToCollectionIfMissing(
    cadastroTrilhaCollection: ICadastroTrilha[],
    ...cadastroTrilhasToCheck: (ICadastroTrilha | null | undefined)[]
  ): ICadastroTrilha[] {
    const cadastroTrilhas: ICadastroTrilha[] = cadastroTrilhasToCheck.filter(isPresent);
    if (cadastroTrilhas.length > 0) {
      const cadastroTrilhaCollectionIdentifiers = cadastroTrilhaCollection.map(
        cadastroTrilhaItem => getCadastroTrilhaIdentifier(cadastroTrilhaItem)!
      );
      const cadastroTrilhasToAdd = cadastroTrilhas.filter(cadastroTrilhaItem => {
        const cadastroTrilhaIdentifier = getCadastroTrilhaIdentifier(cadastroTrilhaItem);
        if (cadastroTrilhaIdentifier == null || cadastroTrilhaCollectionIdentifiers.includes(cadastroTrilhaIdentifier)) {
          return false;
        }
        cadastroTrilhaCollectionIdentifiers.push(cadastroTrilhaIdentifier);
        return true;
      });
      return [...cadastroTrilhasToAdd, ...cadastroTrilhaCollection];
    }
    return cadastroTrilhaCollection;
  }
}
