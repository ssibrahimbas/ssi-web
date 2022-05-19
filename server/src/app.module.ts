import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ArticlesModule } from "./articles/articles.module";
import { AcceptLanguageResolver, I18nModule, QueryResolver } from "nestjs-i18n";
import * as path from "path";
import { languages } from "./common/types/i18n";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ProjectsModule } from './projects/projects.module';
import jwtConfig from "./config/jwt.config";
import databaseConfig from "./config/database.config";
import hashConfig from "./config/hash.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig, databaseConfig, hashConfig],
    }),
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("database.mongoDB.uri"),
      }),
      inject: [ConfigService],
    }),
    I18nModule.forRoot({
      fallbackLanguage: languages.TurkishDefault,
      loaderOptions: {
        path: path.join(__dirname, "/i18n/"),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ["lang"] },
        AcceptLanguageResolver,
      ],
    }),
    ArticlesModule,
    UserModule,
    AuthModule,
    ProjectsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
