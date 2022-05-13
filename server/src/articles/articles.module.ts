import { Module } from "@nestjs/common";
import { ArticlesV1Controller } from "./controllers/articles.v1.controller";
import { ArticlesService } from "./services/articles.service";
import { AcceptLanguageResolver, I18nModule, QueryResolver } from "nestjs-i18n";
import * as path from "path";
import { MongooseModule } from "@nestjs/mongoose";
import {
  ArticleDetail,
  ArticleDetailSchema,
} from "./schemas/article-details.schema";
import { Article, ArticleSchema } from "./schemas/article.schema";
import { languages } from "../common/types/i18n";
import { ArticleDetailService } from "./services/article-detail.service";

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: languages.TurkishDefault,
      loaderOptions: {
        path: path.join(__dirname, "/langs/"),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ["lang"] },
        AcceptLanguageResolver,
      ],
    }),
    MongooseModule.forFeature([
      {
        name: ArticleDetail.name,
        schema: ArticleDetailSchema,
      },
      {
        name: Article.name,
        schema: ArticleSchema,
      },
    ]),
  ],
  controllers: [ArticlesV1Controller],
  providers: [ArticleDetailService, ArticlesService],
})
export class ArticlesModule {}
