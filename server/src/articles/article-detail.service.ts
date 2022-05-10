import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  ArticleDetail,
  ArticleDetailDocument,
} from "./schemas/article-details.schema";
import { CreateArticleDetailDto } from "./dto/create-article.dto";

@Injectable()
export class ArticleDetailService {
  constructor(
    @InjectModel(ArticleDetail.name)
    private articleDetailModel: Model<ArticleDetailDocument>
  ) {}

  async createArticleDetailV1(
    createArticleDetailDto: CreateArticleDetailDto
  ): Promise<ArticleDetailDocument> {
    const details = new this.articleDetailModel(createArticleDetailDto);
    return details.save();
  }
}
