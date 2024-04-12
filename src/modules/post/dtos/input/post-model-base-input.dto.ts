export abstract class PostModelBaseInputDto {
  public id: string;
  public title: string;
  public body: string;
  public tags?: string[];
  public createdAt: Date;
}
