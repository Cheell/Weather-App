import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import {
  MatCardModule,
  MatButtonToggleModule, 
  MatButtonModule,
  MatToolbarModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatOptionModule,
  MatInputModule,
  MatIconModule,
  MatSnackBarModule,
} from '@angular/material';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SearchComponent } from './home/search/search.component';
import { WeatherComponent } from './home/weather/weather.component';
import { HttpClientModule } from '@angular/common/http';
import { TemperaturePipe } from './pipes/temperature.pipe';
import { ThemePipe } from './pipes/theme.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FavoritesComponent,
    SearchComponent,
    WeatherComponent,
    TemperaturePipe,
    ThemePipe
  ],
  imports: [
    MatCardModule,
    MatSnackBarModule,
    MatIconModule,
    MatOptionModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatInputModule,

    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
