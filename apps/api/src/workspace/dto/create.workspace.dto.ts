// create-workspace.dto.ts
import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  owner: string;

  @IsOptional()
  isPublic: boolean;
}
