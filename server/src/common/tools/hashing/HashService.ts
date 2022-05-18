import * as bcrypt from "bcrypt";
import * as crypto from "crypto";
import { promisify } from "util";

export class HashService {
  static async hash(
    password: string | Buffer,
    rounds: number
  ): Promise<string> {
    return bcrypt.hash(password, rounds);
  }

  static async compare(
    password: string | Buffer,
    hash: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static async encrypt(
    text: string,
    password: string,
    algorithm: crypto.CipherCCMTypes
  ): Promise<Buffer> {
    const iv = crypto.randomBytes(16);
    const key = (await promisify(crypto.scrypt)(
      password,
      "salt",
      32
    )) as Buffer;
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    return Buffer.concat([cipher.update(text), cipher.final()]);
  }
}
