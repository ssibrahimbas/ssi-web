import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Meta } from "../../common/types/seo/seo";
import { languages } from "../../common/types/i18n";
import { TransformHelper } from "../../common/types/mongo/transform";

export type ArticleDetailDocument = ArticleDetail & Document;

@Schema({ ...TransformHelper.defaultIdTransformer(), id: true })
export class ArticleDetail {
  @Prop({
    type: String,
    default: languages.TurkishDefault,
    enum: [languages.TurkishDefault, languages.EnglishDefault],
    index: true,
  })
  lang: string;

  @Prop()
  title: string;

  @Prop()
  summary: string;

  @Prop([String])
  tags: string[];

  @Prop()
  cover: string;

  @Prop()
  subject: string;

  @Prop([String])
  keywords: string[];

  @Prop(Meta.getOptions())
  meta: Array<Meta>;
}

export const ArticleDetailSchema = SchemaFactory.createForClass(ArticleDetail);
