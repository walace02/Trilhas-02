import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
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
    const copy = this.convertDateFromClient(cadastroTrilha);
    return this.http
      .post<ICadastroTrilha>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(cadastroTrilha: ICadastroTrilha): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cadastroTrilha);
    return this.http
      .put<ICadastroTrilha>(`${this.resourceUrl}/${getCadastroTrilhaIdentifier(cadastroTrilha) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(cadastroTrilha: ICadastroTrilha): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(cadastroTrilha);
    return this.http
      .patch<ICadastroTrilha>(`${this.resourceUrl}/${getCadastroTrilhaIdentifier(cadastroTrilha) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICadastroTrilha>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICadastroTrilha[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
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

  protected convertDateFromClient(cadastroTrilha: ICadastroTrilha): ICadastroTrilha {
    return Object.assign({}, cadastroTrilha, {
      dataHora: cadastroTrilha.dataHora?.isValid() ? cadastroTrilha.dataHora.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dataHora = res.body.dataHora ? dayjs(res.body.dataHora) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((cadastroTrilha: ICadastroTrilha) => {
        cadastroTrilha.dataHora = cadastroTrilha.dataHora ? dayjs(cadastroTrilha.dataHora) : undefined;
      });
    }
    return res;
  }
}
