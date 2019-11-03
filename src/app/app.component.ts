import { Component, OnInit, OnDestroy } from '@angular/core';
import { HeaderService } from './header/header.service';
import { Subscription } from 'rxjs';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy{
  constructor( private headerService : HeaderService, private overlayContainer: OverlayContainer ){
  }
  
  title = 'Weather-App';
  theme : string;
  private themeSubscription: Subscription;

  ngOnInit() {
    this.themeSubscription = this.headerService.theme.subscribe(newTheme =>
      {
        this.theme = newTheme;
        const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
        const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));
        if (themeClassesToRemove.length) {
           overlayContainerClasses.remove(...themeClassesToRemove);
        }
        overlayContainerClasses.add(newTheme);
      }
    )
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }

}
