import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ProjectV1Controller } from "./controller/project.v1.controller";
import { ProjectDetailsRepository } from "./repositories/project-details.repository";
import { ProjectRepository } from "./repositories/project.repository";
import {
  ProjectDetail,
  ProjectDetailSchema,
} from "./schemas/project-details.schema";
import { Project, ProjectSchema } from "./schemas/project.schema";
import { ProjectDetailsService } from "./services/project-details.service";
import { ProjectsService } from "./services/projects.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProjectDetail.name,
        schema: ProjectDetailSchema,
      },
      {
        name: Project.name,
        schema: ProjectSchema,
      },
    ]),
  ],
  controllers: [ProjectV1Controller],
  providers: [
    ProjectDetailsRepository,
    ProjectRepository,
    ProjectDetailsService,
    ProjectsService,
  ],
})
export class ProjectsModule {}
