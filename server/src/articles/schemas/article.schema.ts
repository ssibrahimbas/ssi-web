import mongoose, { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ArticleDetail } from "./article-details.schema";

export type ArticleDocument = Article & Document;

@Schema({
  id: true,
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      if (Array.isArray(doc.details) && doc.details.length > 0) {
        ret.detail = ret.details[0];
        delete ret.details;
      }
    },
  },
})
export class Article {
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: ArticleDetail.name }],
  })
  details: Array<ArticleDetail>;

  @Prop({ type: Date, default: Date.now })
  time: Date;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
