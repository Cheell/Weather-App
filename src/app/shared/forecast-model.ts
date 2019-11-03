export class ForecastModel {
    constructor(
        public Date: string,
        public minTemp: number,
        public maxTemp: number,
        public iconDay: string,
        public iconDayText: string,
        public iconNight: string,
        public iconNightText: string,
    ){}
}
