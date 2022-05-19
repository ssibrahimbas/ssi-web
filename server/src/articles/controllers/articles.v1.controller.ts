import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ArticlesService } from "../services/articles.service";
import { I18n, I18nContext } from "nestjs-i18n";
import { CreateArticleDto } from "../dto/create-article.dto";
import { ISuccessDataResult } from "../../common/types/result/ISuccessDataResult";
import { Article } from "../../article";
import { DefaultPaginationDto } from "src/common/dto/default-pagination.dto";
import { GetArticleByIdDto } from "../dto/get-article-by-id.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller({
  path: "articles",
  version: "1",
})
export class ArticlesV1Controller {
  constructor(private articlesService: ArticlesService) {}

  @UseGuards(JwtAuthGuard)
  @Post("create")
  async createArticle(
    @Body() createArticleDto: CreateArticleDto,
    @I18n() i18n: I18nContext
  ): Promise<ISuccessDataResult<Article>> {
    const response = await this.articlesService.create(createArticleDto);
    return new ISuccessDataResult<Article>(
      i18n.t<string>("article.create_success"),
      response
    );
  }

  @Get("")
  async findAll(
    @Param() paginationDto: DefaultPaginationDto,
    @I18n() i18n: I18nContext
  ): Promise<ISuccessDataResult<Array<Article>>> {
    const response = await this.articlesService.findAll(
      i18n.lang,
      paginationDto.limit,
      paginationDto.page
    );
    return new ISuccessDataResult<Array<Article>>(
      i18n.t<string>("article.fetch_success"),
      response
    );
  }

  @Get(":id")
  async getDetail(
    @Param() getArticleByIdDto: GetArticleByIdDto,
    @I18n() i18n: I18nContext
  ): Promise<ISuccessDataResult<Article>> {
    const response = await this.articlesService.getDetail(
      getArticleByIdDto.id,
      i18n.lang
    );
    return new ISuccessDataResult<Article>(
      i18n.t<string>("article.fetch_detail_success"),
      response
    );
  }
}
