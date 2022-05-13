import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Article, ArticleDocument } from "./schemas/article.schema";
import mongoose, { Model } from "mongoose";
import {
  ArticleDetail,
  ArticleDetailDocument,
} from "./schemas/article-details.schema";
import {
  CreateArticleDetailDto,
  CreateArticleDto,
} from "./dto/create-article.dto";
import { ArticleDetailService } from "./article-detail.service";

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    private articleDetailService: ArticleDetailService
  ) {}

  async createV1(createArticleDto: CreateArticleDto): Promise<Article> {
    const article = new this.articleModel(createArticleDto);
    const details: Array<mongoose.Schema.Types.ObjectId & ArticleDetail> = [];
    for (const detailDto of createArticleDto.details) {
      const objectId = await this.articleDetailService.createArticleDetailV1(
        detailDto
      );
      details.push(objectId._id);
    }
    article.details = details;
    return article.save();
  }

  async findAllV1(lang: string): Promise<Array<Article>> {
    return this.articleModel
      .find({})
      .populate({
        path: "details",
        match: { lang: lang },
      })
      .exec();
  }
}
