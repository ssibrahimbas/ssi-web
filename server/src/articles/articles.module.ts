import { Module } from "@nestjs/common";
import { ArticlesV1Controller } from "./controllers/articles.v1.controller";
import { ArticlesService } from "./services/articles.service";
import { MongooseModule } from "@nestjs/mongoose";
import {
  ArticleDetail,
  ArticleDetailSchema,
} from "./schemas/article-details.schema";
import { Article, ArticleSchema } from "./schemas/article.schema";
import { ArticleDetailService } from "./services/article-detail.service";

@Module({
  imports: [
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
