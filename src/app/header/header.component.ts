import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderService } from './header.service';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  constructor(private headerService : HeaderService) { }

  themeControl = new FormControl();
  tempControl = new FormControl();


  themes = this.headerService.themes;
  displayTemps = this.headerService.displayTemps;

  onThemeToggle(theme: string){
    if(localStorage.getItem('theme') !== theme) {
       localStorage.setItem('theme',theme);
    }
    this.headerService.theme.next(theme);
  }
  
  onTempToggle(dispTemp: string){
    if(localStorage.getItem('temp') !== dispTemp) {
      localStorage.setItem('temp',dispTemp)
    }
    this.headerService.displayTemp.next(dispTemp);
  }

  getStoredValues(){
    const theme = localStorage.getItem('theme');
    if(theme !== null) {
      this.headerService.theme.next(theme);
      this.themeControl.setValue(theme);
    }
    this.themeControl.setValue(this.headerService.theme.getValue());

    const temp = localStorage.getItem('temp');
    if(temp !== null) {
      this.headerService.displayTemp.next(temp);
      this.tempControl.setValue(temp);
    }     
    this.tempControl.setValue(this.headerService.displayTemp.getValue());
  }

  ngOnInit() {
    this.getStoredValues();
  }
}
