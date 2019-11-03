import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from '../home.service';
import { AccuService } from 'src/app/shared/accu.service.service';
import { Subscription } from 'rxjs';
import { MyCityWeatherModel } from 'src/app/shared/my-city-weather-model';
import { HeaderService } from 'src/app/header/header.service';
import { ForecastModel } from 'src/app/shared/forecast-model';
import { ServiceWeatherService } from './service-weather.service';
import { Router } from '@angular/router';
import { City } from '../search/city.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html'
})
export class WeatherComponent implements OnInit,OnDestroy {

  constructor(private homeService: HomeService, 
    private accuService: AccuService, 
    private headerService: HeaderService,
    private weatherService: ServiceWeatherService,
    private router: Router) 
  {
    const state = this.router.getCurrentNavigation().extras.state
    if(state){
      this.cityWeather = state.weather;
      this.router = null;
      this.weatherService.cityWeather = this.cityWeather;
    }
  }

  citySub : Subscription;
  cityWeather: MyCityWeatherModel;
  displayTemp: string;
  forecastSub: Subscription;
  

  favIcon: string = 'favorite_border';
  favText: string = 'Add to favorites';

  ngOnInit() {
    if(this.weatherService.cityWeather){
      this.cityWeather = this.weatherService.cityWeather;
    } else {
      this.getDefaultCity('Tel Aviv');
    }
    this.setCityWeather();
    if(this.cityWeather){
      this.initFavorite(this.cityWeather.isFavorite);
    }
    this.headerService.displayTemp.subscribe(dispTemp => this.displayTemp = dispTemp)
  }

  private getDefaultCity(name: string){
    this.accuService.getCitiesByName(name).subscribe(
      cities => {
        const city = cities[0];
        this.initCityWeather(city);
      } 
    )
  }

  private formatWeatherIcon(icon: number): string{
    if(icon < 10) {
      return '0' + icon;
    }
    return icon + '';
  }

  public refresh(){
    if(!this.cityWeather) { return };
    const city = this.cityWeather;
    this.accuService.getCurrentWeatherByKey(city.Key)
        .subscribe(
          currentWeather => {
            const cw = currentWeather[0];
              this.cityWeather.WeatherText = cw.WeatherText;
              this.cityWeather.WeatherIcon = this.formatWeatherIcon(cw.WeatherIcon);
              this.cityWeather.Tempreture = cw.Temperature.Metric.Value 
          
              const isCityStored : string = localStorage.getItem(city.Key);
              isCityStored ? this.cityWeather.isFavorite = true : false;
              this.initFavorite(this.cityWeather.isFavorite);
              this.weatherService.cityWeather = this.cityWeather;
          } 
        )
      this.accuService.getForecastByKey(city.Key)
        .subscribe(
          data => {
            const forecastArray: any[] = data.DailyForecasts;
            this.cityWeather.forecasts = forecastArray.map(
              fc => {
                let dayFc = new ForecastModel(
                  fc.Date, 
                  fc.Temperature.Minimum.Value,
                  fc.Temperature.Maximum.Value,
                  this.formatWeatherIcon(fc.Day.Icon),
                  fc.Day.IconPhrase,
                  this.formatWeatherIcon(fc.Day.Icon),
                  fc.Night.IconPhrase
                );
                return dayFc
              }
            )
            this.weatherService.forecast = this.cityWeather.forecasts;
          }
        )
      }
  
  private initCityWeather(city: City){
    this.cityWeather = new MyCityWeatherModel(
      city.Key, city.LocalizedName, 
      city.Country.LocalizedName, 
      city.AdministrativeArea.LocalizedName
    )
    this.refresh()
  }    

  private setCityWeather(){
    this.citySub = this.homeService.currentCity.
    subscribe(
      city => this.initCityWeather(city)
    )
  }

  private initFavorite(fav: boolean){
    if(fav) {
      this.favText = 'Remove from favorites';
      this.favIcon = 'favorite';
    } else {
      this.favText = 'Add to favorites';
      this.favIcon = 'favorite_border';
    }
  }

  public toggleFavorites(){
    this.cityWeather.isFavorite = !this.cityWeather.isFavorite;
    this.cityWeather.isFavorite ? 
      localStorage.setItem(this.cityWeather.Key, JSON.stringify(this.cityWeather)) : 
      localStorage.removeItem(this.cityWeather.Key);
    this.initFavorite(this.cityWeather.isFavorite);
  }

  ngOnDestroy(){
    this.citySub.unsubscribe();
  }

}
