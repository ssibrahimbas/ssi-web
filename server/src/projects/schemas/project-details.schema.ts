import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { languages } from "src/common/types/i18n";
import { Meta } from "src/common/types/seo/seo";

export type ProjectDetailDocument = ProjectDetail & Document;

@Schema({
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
    },
  },
})
export class ProjectDetail {
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

  @Prop()
  link?: string;

  @Prop([String])
  tags: string[];

  @Prop([String])
  keywords: string[];

  @Prop(Meta.getOptions())
  meta: Array<Meta>;
}

export const ProjectDetailSchema = SchemaFactory.createForClass(ProjectDetail);
