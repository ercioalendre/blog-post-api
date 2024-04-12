export abstract class TagBaseOutputDto {
  public id: string;
  public name: string;
  public createdAt: Date;
  public createdBy: string;
  public updatedAt?: Date | null;
  public updatedBy?: string | null;
  public softDeletedAt?: Date | null;
  public softDeletedBy?: string | null;
}
