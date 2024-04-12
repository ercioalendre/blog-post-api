export abstract class PostBaseOutputDto {
  public id: string;
  public title: string;
  public body: string;
  public createdAt: Date;
  public createdBy?: string | null;
  public updatedAt?: Date | null;
  public updatedBy?: string | null;
  public softDeletedAt?: Date | null;
  public softDeletedBy?: string | null;
}
