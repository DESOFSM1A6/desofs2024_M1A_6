export class NewsDTO {
  constructor(
    public id: number,
    public title: string,
    public content: string,
    public creationDate: Date,
    public writer: string,
    public status: string,
    public imageUrl?: string[]
  ) {}
}
