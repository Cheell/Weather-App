import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class HeaderService {

  constructor() { }

  themes: string[] = ['my-light-theme','my-dark-theme'];
  displayTemps: string[] = ['°C','°F'];

  theme = new BehaviorSubject<string>(this.themes[0]);
  displayTemp = new BehaviorSubject<string>(this.displayTemps[0]);
}
