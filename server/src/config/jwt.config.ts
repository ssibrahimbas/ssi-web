import { registerAs } from "@nestjs/config";

export type JwtConfig = {
  secret: string;
  expiresIn: string;
};

export default registerAs(
  "jwt",
  (): JwtConfig => ({
    secret: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRES_IN,
  })
);
