import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ObjectId } from "mongoose";
import { I18n, I18nContext } from "nestjs-i18n";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { DefaultPaginationDto } from "src/common/dto/default-pagination.dto";
import { ISuccessDataResult } from "src/common/types/result/ISuccessDataResult";
import { CreateProjectDto } from "../dto/create-project.dto";
import { Project } from "../schemas/project.schema";
import { ProjectsService } from "../services/projects.service";

@Controller({
  path: "projects",
  version: "1",
})
export class ProjectV1Controller {
  constructor(private projectService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Post("create")
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @I18n() i18n: I18nContext
  ): Promise<ISuccessDataResult<Project>> {
    const response = await this.projectService.create(createProjectDto);
    return new ISuccessDataResult<Project>(
      i18n.t<string>("project.create_success"),
      response
    );
  }

  @Get("")
  async findAll(
    @Query() paginationDto: DefaultPaginationDto,
    @I18n() i18n: I18nContext
  ): Promise<ISuccessDataResult<Array<Project>>> {
    const response = await this.projectService.findAll(
      i18n.lang,
      paginationDto.limit,
      paginationDto.page
    );
    return new ISuccessDataResult<Array<Project>>(
      i18n.t("project.fetch_success"),
      response
    );
  }

  @Get(":id")
  async getById(
    @Param() params: { id: ObjectId },
    @I18n() i18n: I18nContext
  ): Promise<ISuccessDataResult<Project | null>> {
    const response = await this.projectService.getById(params.id);
    return new ISuccessDataResult<Project | null>(
      i18n.t("project.fetch_detail_success"),
      response
    );
  }
}
