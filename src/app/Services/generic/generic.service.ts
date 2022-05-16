import { Injectable, isDevMode } from '@angular/core';

import { environment as DevAPI } from '../../../environments/environment';
import { environment as ProdAPI } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  private endPoint: string = '';

  constructor() { 
    this.endPoint += (isDevMode()) ? DevAPI.api_url : ProdAPI.api_url;
  }
}
