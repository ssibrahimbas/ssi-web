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

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: i18nValidationErrorFactory,
    })
  );
  app.useGlobalFilters(new I18nValidationExceptionFilter());
  await app.listen(3000, "0.0.0.0");
}
bootstrap();
