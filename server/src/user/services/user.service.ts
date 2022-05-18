import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { I18nContext } from "nestjs-i18n";
import { HashService } from "src/common/tools/hashing/HashService";
import { LoginUserDto } from "../dto/login-user.dto";
import { RegisterUserDto } from "../dto/register-user.dto";
import { UserRepository } from "../repository/user.repository";
import { UserDocument } from "../schemas/user.schema";

export type User = any;

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async login(loginUserDto: LoginUserDto, i18n?: I18nContext): Promise<User> {
    const user = await this.userRepository.getUserByEmail(loginUserDto.email);
    if (!user) throw new NotFoundException(i18n.t("user.userNotFound"));
    if (!(await this.comparePasswords(loginUserDto.password, user.password)))
      throw new BadRequestException(i18n.t("auth.wrongPassword"));
    return user;
  }

  async register(
    registerUserDto: RegisterUserDto,
    ipAddress: string,
    i18n?: I18nContext
  ): Promise<UserDocument> {
    if (await this.checkEmailIsExists(registerUserDto.email))
      throw new BadRequestException(i18n.t("user.emailAlreadyExists"));
    registerUserDto.password = await this.hashPassword(
      registerUserDto.password
    );
    const user = await this.userRepository.createUser(
      registerUserDto,
      ipAddress
    );
    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    return HashService.hash(password, 10);
  }

  private async comparePasswords(
    password: string,
    hashPw: string
  ): Promise<boolean> {
    return HashService.compare(password, hashPw);
  }

  private async checkEmailIsExists(email: string): Promise<boolean> {
    const user = await this.userRepository.getUserByEmail(email);
    return user !== null;
  }
}
