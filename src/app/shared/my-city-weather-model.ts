import { ForecastModel } from './forecast-model';

export class MyCityWeatherModel {
    constructor(
        public Key : string,

        public LocalizedName ?: string,
        public Country?: string,
        public AdministrativeArea?: string,

        public WeatherText?: string,
        public WeatherIcon?: string,
        public Tempreture?: number,

        public isFavorite?: boolean,

        public forecasts?: ForecastModel[]
    ){}
}

