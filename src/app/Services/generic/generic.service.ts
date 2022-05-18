import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment as DevAPI } from '../../../environments/environment';
import { environment as ProdAPI } from '../../../environments/environment.prod';
import { IPaginationFilters } from 'src/app/Interfaces/ipagination-filters';
import { AsyncSubject, Observable } from 'rxjs';
import { IPagedData } from 'src/app/Interfaces/ipaged-data';
import { IServerResponse } from 'src/app/Interfaces/iserver-response';
import { threadId } from 'worker_threads';

@Injectable({
  providedIn: 'root'
})
export abstract class GenericService<T> {

  private endPoint: string = '';

  // Generic List
  private listOfTypeSource: AsyncSubject<IPagedData<T>> = new AsyncSubject<IPagedData<T>>(); 
  public $listOfType: Observable<IPagedData<T>> = this.listOfTypeSource.asObservable();

  constructor(protected $http: HttpClient) { 
    this.endPoint += (isDevMode()) ? DevAPI.api_url : ProdAPI.api_url;
  }

  abstract GetResourceUrl(): string;

  // Route: api/controller

  GetAll(filters: IPaginationFilters): void {
    
    const params = new HttpParams()

    .set('page', filters.page)
    .set('quantity', filters.quantity)
    .set('searchTerm', filters.searchTerm)
    .set('status', filters.status);

    this.$http.get<IPagedData<T>>(this.endPoint, { params: params })
    .subscribe((resp: IPagedData<T>) => {
      this.listOfTypeSource.next(resp);
    });
  }

  GetById(id: number): void {
    this.$http.get<T>(`${this.endPoint}/${id}`)
    .subscribe((resp: T) => {
      
    })
  }

  // Route: api/controller
  Post(model: T): void {
    this.$http.post<IServerResponse>(this.endPoint, model)
    .subscribe((resp: IServerResponse) => {
      
    })
  }
  
  Put(model: T): void {
    this.$http.put<IServerResponse>(this.endPoint, model)
    .subscribe((resp: IServerResponse) => {
      
    })
  }
  
  Delete(id: number): void {
    const params = new HttpParams();
    params.set('id', id);

    this.$http.delete<IServerResponse>(this.endPoint, { params: params })
    .subscribe((resp: IServerResponse) => {
      
    })
  }

}
