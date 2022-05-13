import { IsMongoId } from "class-validator";
import mongoose from "mongoose";
import { i18nValidationMessage } from "nestjs-i18n";


export class GetArticleByIdDto {
    
    @IsMongoId({message: i18nValidationMessage("validation.invalid_mongo_id")})
    id: mongoose.Schema.Types.ObjectId;
}