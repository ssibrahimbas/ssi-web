import { SetMetadata } from "@nestjs/common";

export const JwtConstants = {
    secret: "secretKey",
    expiresIn: "60s"
}

export const IS_PUBLIC_KEY = "IsPublic";
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);