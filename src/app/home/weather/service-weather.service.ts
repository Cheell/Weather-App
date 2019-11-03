import { Injectable } from '@angular/core';
import { MyCityWeatherModel } from 'src/app/shared/my-city-weather-model';
import { ForecastModel } from 'src/app/shared/forecast-model';

@Injectable({
  providedIn: 'root'
})
export class ServiceWeatherService {

  private currentCityWeather : MyCityWeatherModel;
  get cityWeather(){
    return this.currentCityWeather;
  }
  set cityWeather(cityWeather: MyCityWeatherModel){
    this.currentCityWeather = cityWeather;
  }
  
  private currentForecast : ForecastModel[];
  get forecast(){
    return this.currentForecast;
  }
  set forecast(forecasst : ForecastModel[]){
    this.currentForecast = forecasst;
  }


  constructor() { }
}
