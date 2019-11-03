import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'theme'
})
export class ThemePipe implements PipeTransform {

  transform(theme : string): string {
    theme = theme.replace("my-",'').replace('-theme','');  
    theme = theme[0].toUpperCase() + theme.slice(1); 

    return theme;
  }

}
