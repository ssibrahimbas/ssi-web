import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { ProjectDetail } from "./project-details.schema";

export type ProjectDocument = Project & Document;

@Schema({
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      if (Array.isArray(ret.details) && ret.details.length === 1) {
        ret.detail = ret.details[0];
        delete ret.details;
      }
      delete ret.__v;
      delete ret._id;
    },
  },
})
export class Project {
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: ProjectDetail.name }],
    default: [],
  })
  details: Array<ProjectDetail>;

  @Prop({ type: Date, default: Date.now })
  time: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
