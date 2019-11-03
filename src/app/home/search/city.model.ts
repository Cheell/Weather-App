export class City {
    constructor(
           public Key : string,
           public LocalizedName : string,
           public Country : {
              LocalizedName : string
            },
            public AdministrativeArea : {
              LocalizedName : string
            },
    ){}
}

