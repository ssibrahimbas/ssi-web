import { Body, Controller, Get, Post } from "@nestjs/common";
import { ArticlesService } from "./articles.service";
import { I18n, I18nContext } from "nestjs-i18n";
import { CreateArticleDto } from "./dto/create-article.dto";
import { ISuccessDataResult } from "../common/types/result/ISuccessDataResult";
import { Article } from "../article";

@Controller({
  path: "articles",
  version: "1",
})
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Post("create")
  async createArticleV1(
    @Body() createArticleDto: CreateArticleDto,
    @I18n() i18n: I18nContext
  ): Promise<ISuccessDataResult<Article>> {
    const response = await this.articlesService.createV1(createArticleDto);
    return new ISuccessDataResult<Article>(
      i18n.t<string>("article.create_success"),
      response
    );
  }

  @Get("")
  async findAllVersion1(
    @I18n() i18n: I18nContext
  ): Promise<ISuccessDataResult<Array<Article>>> {
    const response = await this.articlesService.findAllV1(i18n.lang);
    return new ISuccessDataResult<Array<Article>>(
      i18n.t<string>("article.fetch_success"),
      response
    );
  }
}
