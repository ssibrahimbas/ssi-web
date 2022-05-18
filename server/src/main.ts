import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import {
  i18nValidationErrorFactory,
  I18nValidationExceptionFilter,
} from "nestjs-i18n";
import FastifyMultipart from "@fastify/multipart";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.register(FastifyMultipart);
  app.setGlobalPrefix("api");
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: i18nValidationErrorFactory,
    })
  );
  app.useGlobalFilters(new I18nValidationExceptionFilter());
  const config = new DocumentBuilder()
    .setTitle("SSI-WEB Documentation")
    .setDescription("The SSI Web Site Documentation")
    .setVersion("1.0")
    .addTag("ssi-web")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);
  await app.listen(3000, "0.0.0.0");
}
bootstrap();
