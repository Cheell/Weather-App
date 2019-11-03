import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { City } from './search/city.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {  
  currentCity = new Subject<City>(); 
  constructor() {}
}
