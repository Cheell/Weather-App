export class CurrentWeatherModel {
    constructor(
        public LocalObservationDateTime : string,
        public WeatherText: string,
        public WeatherIcon: number,
        public Temperature: {
            Metric:{Value : number},
            Imperial:{Value: number}
        },
    ){}
}