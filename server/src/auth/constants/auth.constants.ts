import { SetMetadata } from "@nestjs/common";

export const JwtConstants = {
  secret: process.env.JWT_SECRET_KEY,
  expiresIn: process.env.JWT_EXPIRES_IN,
};

export const UseJwtConstants = () => {
  return {
    secret: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRES_IN,
  };
};

export const IS_PUBLIC_KEY = "IsPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
