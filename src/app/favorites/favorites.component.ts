import { Component, OnInit } from '@angular/core';
import { MyCityWeatherModel } from '../shared/my-city-weather-model';
import { HeaderService } from '../header/header.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
})
export class FavoritesComponent implements OnInit {
  constructor(private headerService: HeaderService, private router: Router) { }

  displayTemp: string
  favList: MyCityWeatherModel[] = [];
  

  ngOnInit() {
    this.headerService.displayTemp.subscribe(dispTemp => this.displayTemp = dispTemp)
    this.getFavorites();
  }

  openInHome(cityWeather: MyCityWeatherModel){
    const navEx : NavigationExtras = {
      state : {
        'weather': cityWeather
      }
    }
    this.router.navigate(['home'],navEx);
  }

  private getFavorites(){
    for(let i = 0; i < localStorage.length; i++){
      let storedKey = localStorage.key(i);
      if(storedKey !== 'theme' && storedKey !== 'temp'){
        this.favList.push(JSON.parse(localStorage.getItem(storedKey)));
      }
    }
  }
}
