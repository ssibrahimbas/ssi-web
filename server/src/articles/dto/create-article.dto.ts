import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { ArticlesLang } from "../types/articles.lang";
import { i18nValidationMessage } from "nestjs-i18n";
import { MetaCreateDto } from "../../common/types/seo/meta-create.dto";

export class CreateArticleDto {
  @ValidateNested()
  @Type(() => CreateArticleDetailDto)
  details: Array<CreateArticleDetailDto>;
}

export class CreateArticleDetailDto {
  @IsNotEmpty({ message: i18nValidationMessage("validation.not_empty") })
  @IsEnum(ArticlesLang, {
    message: i18nValidationMessage("validation.invalid_language"),
  })
  lang: ArticlesLang;

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
  cover: string;

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
