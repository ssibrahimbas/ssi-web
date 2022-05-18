import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { i18nValidationMessage } from "nestjs-i18n";

export class LoginUserDto {
  @IsNotEmpty({ message: i18nValidationMessage("validation.not_empty") })
  @IsEmail({ message: i18nValidationMessage("validation.invalid_email") })
  @IsString({ message: i18nValidationMessage("validation.invalid_string") })
  @MaxLength(100, {
    message: i18nValidationMessage("validation.max_length"),
  })
  email: string;

  @IsNotEmpty({ message: i18nValidationMessage("validation.not_empty") })
  @MinLength(8, {
    message: i18nValidationMessage("validation.min_length"),
  })
  @IsString({ message: i18nValidationMessage("validation.invalid_string") })
  @MaxLength(36, {
    message: i18nValidationMessage("validation.max_length"),
  })
  password: string;
}
