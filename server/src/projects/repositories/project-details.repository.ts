import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateProjectDetailDto } from "../dto/create-project.dto";
import {
  ProjectDetail,
  ProjectDetailDocument,
} from "../schemas/project-details.schema";

@Injectable()
export class ProjectDetailsRepository {
  constructor(
    @InjectModel(ProjectDetail.name)
    private projectDetailModel: Model<ProjectDetailDocument>
  ) {}

  async create(
    createProjectDetailDto: CreateProjectDetailDto
  ): Promise<ProjectDetailDocument> {
    const details = new this.projectDetailModel(createProjectDetailDto);
    return details.save();
  }
}
