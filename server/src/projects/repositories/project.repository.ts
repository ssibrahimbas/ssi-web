import { ProjectDocument } from "./../schemas/project.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Project } from "../schemas/project.schema";
import mongoose, { Model, ObjectId } from "mongoose";
import { ProjectDetail } from "../schemas/project-details.schema";
import { CreateProjectDto } from "../dto/create-project.dto";

@Injectable()
export class ProjectRepository {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>
  ) {}

  create(projectCreateDto: CreateProjectDto): ProjectDocument & {
    _id: any;
  } {
    const project = new this.projectModel(projectCreateDto);
    return project;
  }

  async updateDetails(
    project: ProjectDocument & {
      _id: any;
    },
    details: Array<mongoose.Schema.Types.ObjectId & ProjectDetail>
  ): Promise<Project> {
    project.details = details;
    return project.save();
  }

  async findAll(
    lang: string,
    limit: number,
    page: number
  ): Promise<Array<Project>> {
    return this.projectModel
      .find({})
      .sort({ time: 1 })
      .skip(limit * (page - 1))
      .limit(limit)
      .populate({
        path: "details",
        select: "lang title summary tags subject",
        match: { lang: lang },
      })
      .exec();
  }

  async getDetail(id: ObjectId): Promise<Project | null> {
    return this.projectModel.findById(id).populate("details").exec();
  }
}
