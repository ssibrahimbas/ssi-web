import mongoose, { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ArticleDetail } from "./article-details.schema";
import { TransformHelper } from "../../common/types/mongo/transform";

export type ArticleDocument = Article & Document;

@Schema(TransformHelper.defaultIdTransformer())
export class Article {
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: ArticleDetail.name }],
  })
  details: Array<ArticleDetail>;

  @Prop({ type: Date, default: Date.now })
  time: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
