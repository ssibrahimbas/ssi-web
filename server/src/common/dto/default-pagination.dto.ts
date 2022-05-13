import { i18nValidationMessage } from 'nestjs-i18n';
import { IsDefined, IsNumber } from "class-validator";

export class DefaultPaginationDto {
    
    @IsDefined()
    @IsNumber({allowNaN: false},{message: i18nValidationMessage("validation.invalid_number")})
    limit: number = 20;
    
    @IsDefined()
    @IsNumber({allowNaN: false},{ message: i18nValidationMessage("validation.invalid_number") })
    page: number = 1;
}