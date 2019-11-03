import { Injectable } from '@angular/core';
import { City } from '../home/search/city.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { CurrentWeatherModel } from '../home/weather/current-weather-model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccuService {
  constructor(private httpClient : HttpClient, private snackBar: MatSnackBar) {}
  
  getCitiesByName(name: string): Observable<City[]> {
    return this.httpClient
      .get<City[]>(
        "https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=" + environment.accuWeatherAPI +"&q=" + name
        )
      .pipe(
        catchError(e=> this.handleError(e)),
        tap(cities => {
          if(cities.length === 0) {
            this.snackBar.open('Nothing found!', 'Try another city name!', {
              panelClass: 'snackbar',
              duration: 5000})
          }
        })
      )
  }

  getCurrentWeatherByKey(key: string): Observable<CurrentWeatherModel[]>{
    return this.httpClient
    .get<CurrentWeatherModel[]>(
      "https://dataservice.accuweather.com/currentconditions/v1/" + key + "?apikey=" + environment.accuWeatherAPI
    )
    .pipe(
      catchError(e=> this.handleError(e))
    )
  }

  getForecastByKey(key: string): Observable<any>{
    return this.httpClient
    .get("https://dataservice.accuweather.com/forecasts/v1/daily/5day/" + key+ "?apikey=" + environment.accuWeatherAPI + "&metric=true")
    .pipe(
      catchError(e=>this.handleError(e))
    )
  }

  private handleError(errorRes: HttpErrorResponse) {
    if (errorRes.error && errorRes.error.Message && errorRes.statusText) {
      let message: string = errorRes.error.Message;
      message.startsWith('Invalid location key') ? message = 'Invalid location key' : message;
      this.snackBar.open(errorRes.statusText, message, {
        panelClass: 'snackbar',
        duration: 5000});
      return throwError(errorRes);
    }
    this.snackBar.open('Error occured!', 'Server Exploded!!!', {
      panelClass: 'snackbar',
      duration: 5000});
    return throwError('No error information provided by backend');
  }


}
