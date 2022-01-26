import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ITrilhas, getTrilhasIdentifier } from '../trilhas.model';

export type EntityResponseType = HttpResponse<ITrilhas>;
export type EntityArrayResponseType = HttpResponse<ITrilhas[]>;

@Injectable({ providedIn: 'root' })
export class TrilhasService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/trilhas');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(trilhas: ITrilhas): Observable<EntityResponseType> {
    return this.http.post<ITrilhas>(this.resourceUrl, trilhas, { observe: 'response' });
  }

  update(trilhas: ITrilhas): Observable<EntityResponseType> {
    return this.http.put<ITrilhas>(`${this.resourceUrl}/${getTrilhasIdentifier(trilhas) as number}`, trilhas, { observe: 'response' });
  }

  partialUpdate(trilhas: ITrilhas): Observable<EntityResponseType> {
    return this.http.patch<ITrilhas>(`${this.resourceUrl}/${getTrilhasIdentifier(trilhas) as number}`, trilhas, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITrilhas>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITrilhas[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addTrilhasToCollectionIfMissing(trilhasCollection: ITrilhas[], ...trilhasToCheck: (ITrilhas | null | undefined)[]): ITrilhas[] {
    const trilhas: ITrilhas[] = trilhasToCheck.filter(isPresent);
    if (trilhas.length > 0) {
      const trilhasCollectionIdentifiers = trilhasCollection.map(trilhasItem => getTrilhasIdentifier(trilhasItem)!);
      const trilhasToAdd = trilhas.filter(trilhasItem => {
        const trilhasIdentifier = getTrilhasIdentifier(trilhasItem);
        if (trilhasIdentifier == null || trilhasCollectionIdentifiers.includes(trilhasIdentifier)) {
          return false;
        }
        trilhasCollectionIdentifiers.push(trilhasIdentifier);
        return true;
      });
      return [...trilhasToAdd, ...trilhasCollection];
    }
    return trilhasCollection;
  }
}
