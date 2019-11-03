import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import { City } from './city.model';
import { AccuService } from 'src/app/shared/accu.service.service';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  searchControl = new FormControl();
  citiesObs: Observable<City[]>;

  constructor(private accuService: AccuService, private homeService: HomeService){}

  ngOnInit() {
    (this.searchControl);
    this.searchControl.valueChanges.subscribe(
      input => {
        if(typeof input === 'string') { 
          this.citiesObs = this.accuService.getCitiesByName(input);
        }
      }
    );
  }

  displayFn(city?: City): string | undefined {
    return city ? city.LocalizedName : undefined;
  }

  onSelected(){
    this.homeService.currentCity.next(this.searchControl.value);
  }

}