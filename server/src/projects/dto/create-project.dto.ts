import { Type } from "class-transformer";
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";
import { LanguageKeys } from "src/common/types/i18n";
import { MetaCreateDto } from "src/common/types/seo/meta-create.dto";

export class CreateProjectDto {
  @IsNotEmpty({ message: i18nValidationMessage("validation.not_empty") })
  @ValidateNested({ each: true })
  @Type(() => CreateProjectDetailDto)
  details: Array<CreateProjectDetailDto>;
}

export class CreateProjectDetailDto {
  @IsNotEmpty({ message: i18nValidationMessage("validation.not_empty") })
  @IsEnum(LanguageKeys, {
    message: i18nValidationMessage("validation.invalid_language"),
  })
  lang: LanguageKeys;

  @IsNotEmpty({ message: i18nValidationMessage("validation.not_empty") })
  @IsString({ message: i18nValidationMessage("validation.invalid_string") })
  @MinLength(10, {
    message: i18nValidationMessage("validation.min_length"),
  })
  @MaxLength(70, {
    message: i18nValidationMessage("validation.max_length"),
  })
  title: string;

  @IsNotEmpty({ message: i18nValidationMessage("validation.not_empty") })
  @IsString({ message: i18nValidationMessage("validation.invalid_string") })
  subject: string;

  @IsNotEmpty({ message: i18nValidationMessage("validation.not_empty") })
  @IsString({
    each: true,
    message: i18nValidationMessage("validation.invalid_string"),
  })
  tags: string;

  @IsNotEmpty({ message: i18nValidationMessage("validation.not_empty") })
  @IsString({
    each: true,
    message: i18nValidationMessage("validation.invalid_string"),
  })
  keywords: string;

  @ValidateNested()
  @Type(() => MetaCreateDto)
  details: Array<MetaCreateDto>;
}
