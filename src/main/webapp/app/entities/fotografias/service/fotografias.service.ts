import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IFotografias, getFotografiasIdentifier } from '../fotografias.model';

export type EntityResponseType = HttpResponse<IFotografias>;
export type EntityArrayResponseType = HttpResponse<IFotografias[]>;

@Injectable({ providedIn: 'root' })
export class FotografiasService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/fotografias');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(fotografias: IFotografias): Observable<EntityResponseType> {
    return this.http.post<IFotografias>(this.resourceUrl, fotografias, { observe: 'response' });
  }

  update(fotografias: IFotografias): Observable<EntityResponseType> {
    return this.http.put<IFotografias>(`${this.resourceUrl}/${getFotografiasIdentifier(fotografias) as number}`, fotografias, {
      observe: 'response',
    });
  }

  partialUpdate(fotografias: IFotografias): Observable<EntityResponseType> {
    return this.http.patch<IFotografias>(`${this.resourceUrl}/${getFotografiasIdentifier(fotografias) as number}`, fotografias, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFotografias>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFotografias[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addFotografiasToCollectionIfMissing(
    fotografiasCollection: IFotografias[],
    ...fotografiasToCheck: (IFotografias | null | undefined)[]
  ): IFotografias[] {
    const fotografias: IFotografias[] = fotografiasToCheck.filter(isPresent);
    if (fotografias.length > 0) {
      const fotografiasCollectionIdentifiers = fotografiasCollection.map(fotografiasItem => getFotografiasIdentifier(fotografiasItem)!);
      const fotografiasToAdd = fotografias.filter(fotografiasItem => {
        const fotografiasIdentifier = getFotografiasIdentifier(fotografiasItem);
        if (fotografiasIdentifier == null || fotografiasCollectionIdentifiers.includes(fotografiasIdentifier)) {
          return false;
        }
        fotografiasCollectionIdentifiers.push(fotografiasIdentifier);
        return true;
      });
      return [...fotografiasToAdd, ...fotografiasCollection];
    }
    return fotografiasCollection;
  }
}
