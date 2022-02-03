import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import dayjs from 'dayjs/esm';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITrilha, getTrilhaIdentifier } from '../trilha.model';

export type EntityResponseType = HttpResponse<ITrilha>;
export type EntityArrayResponseType = HttpResponse<ITrilha[]>;

@Injectable({ providedIn: 'root' })
export class TrilhaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/trilhas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(trilha: ITrilha): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(trilha);
    return this.http
      .post<ITrilha>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(trilha: ITrilha): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(trilha);
    return this.http
      .put<ITrilha>(`${this.resourceUrl}/${getTrilhaIdentifier(trilha) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(trilha: ITrilha): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(trilha);
    return this.http
      .patch<ITrilha>(`${this.resourceUrl}/${getTrilhaIdentifier(trilha) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITrilha>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITrilha[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTrilhaToCollectionIfMissing(trilhaCollection: ITrilha[], ...trilhasToCheck: (ITrilha | null | undefined)[]): ITrilha[] {
    const trilhas: ITrilha[] = trilhasToCheck.filter(isPresent);
    if (trilhas.length > 0) {
      const trilhaCollectionIdentifiers = trilhaCollection.map(trilhaItem => getTrilhaIdentifier(trilhaItem)!);
      const trilhasToAdd = trilhas.filter(trilhaItem => {
        const trilhaIdentifier = getTrilhaIdentifier(trilhaItem);
        if (trilhaIdentifier == null || trilhaCollectionIdentifiers.includes(trilhaIdentifier)) {
          return false;
        }
        trilhaCollectionIdentifiers.push(trilhaIdentifier);
        return true;
      });
      return [...trilhasToAdd, ...trilhaCollection];
    }
    return trilhaCollection;
  }

  protected convertDateFromClient(trilha: ITrilha): ITrilha {
    return Object.assign({}, trilha, {
      dataHora: trilha.dataHora?.isValid() ? trilha.dataHora.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((trilha: ITrilha) => {
        trilha.dataHora = trilha.dataHora ? dayjs(trilha.dataHora) : undefined;
      });
    }
    return res;
  }
}
