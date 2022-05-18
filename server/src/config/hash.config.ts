import crypto from "crypto";
import { registerAs } from "@nestjs/config";

export type HashConfigType = {
  password: string;
  algorithm: crypto.CipherCCMTypes;
};

export default registerAs("hash", (): HashConfigType => {
  return {
    password: process.env.HASH_PASSWORD,
    algorithm: process.env.HASH_ALGORITHM as crypto.CipherCCMTypes,
  };
});
