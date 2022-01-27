import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPontosVenda, getPontosVendaIdentifier } from '../pontos-venda.model';

export type EntityResponseType = HttpResponse<IPontosVenda>;
export type EntityArrayResponseType = HttpResponse<IPontosVenda[]>;

@Injectable({ providedIn: 'root' })
export class PontosVendaService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/pontos-vendas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(pontosVenda: IPontosVenda): Observable<EntityResponseType> {
    return this.http.post<IPontosVenda>(this.resourceUrl, pontosVenda, { observe: 'response' });
  }

  update(pontosVenda: IPontosVenda): Observable<EntityResponseType> {
    return this.http.put<IPontosVenda>(`${this.resourceUrl}/${getPontosVendaIdentifier(pontosVenda) as number}`, pontosVenda, {
      observe: 'response',
    });
  }

  partialUpdate(pontosVenda: IPontosVenda): Observable<EntityResponseType> {
    return this.http.patch<IPontosVenda>(`${this.resourceUrl}/${getPontosVendaIdentifier(pontosVenda) as number}`, pontosVenda, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPontosVenda>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPontosVenda[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPontosVendaToCollectionIfMissing(
    pontosVendaCollection: IPontosVenda[],
    ...pontosVendasToCheck: (IPontosVenda | null | undefined)[]
  ): IPontosVenda[] {
    const pontosVendas: IPontosVenda[] = pontosVendasToCheck.filter(isPresent);
    if (pontosVendas.length > 0) {
      const pontosVendaCollectionIdentifiers = pontosVendaCollection.map(pontosVendaItem => getPontosVendaIdentifier(pontosVendaItem)!);
      const pontosVendasToAdd = pontosVendas.filter(pontosVendaItem => {
        const pontosVendaIdentifier = getPontosVendaIdentifier(pontosVendaItem);
        if (pontosVendaIdentifier == null || pontosVendaCollectionIdentifiers.includes(pontosVendaIdentifier)) {
          return false;
        }
        pontosVendaCollectionIdentifiers.push(pontosVendaIdentifier);
        return true;
      });
      return [...pontosVendasToAdd, ...pontosVendaCollection];
    }
    return pontosVendaCollection;
  }
}
