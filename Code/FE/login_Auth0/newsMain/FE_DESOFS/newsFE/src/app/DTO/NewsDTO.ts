export class NewsDTO {

    constructor(
      public title: string,
      public content: string,
      public creationDate: Date,
      public writer: string
    ) { }
  }
