import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";
import { Charset } from "../charset";
import { ArticlesLang } from "../../../articles/types/articles.lang";

export class MetaCreateDto {
  @IsNotEmpty({ message: i18nValidationMessage("validation.not_empty") })
  @IsString({ message: i18nValidationMessage("validation.invalid_string") })
  @MinLength(1, {
    message: i18nValidationMessage("validation.min_length"),
  })
  @MaxLength(100, {
    message: i18nValidationMessage("validation.max_length"),
  })
  name: string;

  @IsNotEmpty({ message: i18nValidationMessage("validation.not_empty") })
  @IsString({ message: i18nValidationMessage("validation.invalid_string") })
  @MinLength(1, {
    message: i18nValidationMessage("validation.min_length"),
  })
  @MaxLength(300, {
    message: i18nValidationMessage("validation.max_length"),
  })
  content: string;

  @IsDefined()
  @IsEnum(Charset, {
    message: i18nValidationMessage("validation.invalid_charset"),
  })
  charset?: Charset;
}
