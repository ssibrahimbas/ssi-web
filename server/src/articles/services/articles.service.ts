import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Article, ArticleDocument } from "../schemas/article.schema";
import mongoose, { Model } from "mongoose";
import { ArticleDetail } from "../schemas/article-details.schema";
import { CreateArticleDto } from "../dto/create-article.dto";
import { ArticleDetailService } from "./article-detail.service";

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
    private articleDetailService: ArticleDetailService
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
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

  async findAll(lang: string, limit: number, page : number): Promise<Array<Article>> {
    return this.articleModel
      .find({})
      .sort({date: 1})
      .skip(limit * (page - 1))
      .select(limit)
      .populate({
        path: "details",
        select: "lang title summary tags cover subject",
        match: { lang: lang },
      })
      .exec();
  }

  async getDetail(id: mongoose.Schema.Types.ObjectId, lang: string): Promise<Article> {
    return this.articleModel.findById(id).populate({
      path: "details",
      match: { lang: lang}
    }).exec();
  }
}