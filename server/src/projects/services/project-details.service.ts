import { ProjectDetailDocument } from "./../schemas/project-details.schema";
import { Injectable } from "@nestjs/common";
import { CreateProjectDetailDto } from "../dto/create-project.dto";
import { ProjectDetailsRepository } from "../repositories/project-details.repository";

@Injectable()
export class ProjectDetailsService {
  constructor(private projectDetailRepository: ProjectDetailsRepository) {}

  async create(
    createProjectDetailDto: CreateProjectDetailDto
  ): Promise<ProjectDetailDocument> {
    return this.projectDetailRepository.create(createProjectDetailDto);
  }
}
