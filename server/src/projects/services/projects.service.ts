import { Injectable } from "@nestjs/common";
import { ObjectId } from "mongoose";
import { CreateProjectDto } from "../dto/create-project.dto";
import { ProjectRepository } from "../repositories/project.repository";
import { Project } from "../schemas/project.schema";
import { ProjectDetailsService } from "./project-details.service";

@Injectable()
export class ProjectsService {
  constructor(
    private projectRepository: ProjectRepository,
    private projectDetailsService: ProjectDetailsService
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectRepository.create(createProjectDto);
    const details = [];
    for (const detailDto of createProjectDto.details) {
      const detail = await this.projectDetailsService.create(detailDto);
      details.push(detail.id);
    }
    return this.projectRepository.updateDetails(project, details);
  }

  async findAll(
    lang: string,
    limit: number,
    page: number
  ): Promise<Array<Project>> {
    return this.projectRepository.findAll(lang, limit, page);
  }

  async getById(id: ObjectId): Promise<Project | null> {
    return this.projectRepository.getDetail(id);
  }
}
