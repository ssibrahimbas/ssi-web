import { INestApplication, UnauthorizedException } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AuthModule } from "../../src/auth/auth.module";
import { UserModule } from "../../src/user/user.module";
import * as request from "supertest";

describe("Auth", () => {
  const authService = {};

  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UserModule, AuthModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it("/GET v1/checkStatus", () => {
    return request(app.getHttpServer())
      .get("/api/v1/auth/checkStatus")
      .expect(401)
      .expect(new UnauthorizedException());
  });

  afterAll(async () => {
    await app.close();
  });
});
