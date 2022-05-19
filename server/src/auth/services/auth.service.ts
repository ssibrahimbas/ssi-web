import { I18nContext } from "nestjs-i18n";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginUserDto } from "src/user/dto/login-user.dto";
import { User } from "src/user/schemas/user.schema";
import { UsersService } from "src/user/services/user.service";
import { LoginResultType } from "../types/auth-result.types";
import { RegisterUserDto } from "src/user/dto/register-user.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    user: LoginUserDto,
    i18n?: I18nContext
  ): Promise<User | null> {
    return this.usersService.login(user, i18n);
  }

  async login(
    loginUserDto: LoginUserDto,
    i18n?: I18nContext
  ): Promise<LoginResultType> {
    const user: User = await this.usersService.login(loginUserDto, i18n);
    return this.generateTokenFromUser(user);
  }

  async register(
    registerUserDto: RegisterUserDto,
    ipAddress: string,
    i18n: I18nContext
  ): Promise<LoginResultType> {
    const user: User = await this.usersService.register(
      registerUserDto,
      ipAddress,
      i18n
    );
    return this.generateTokenFromUser(user);
  }

  private generateTokenFromUser(user: User): LoginResultType {
    const payload = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      dateOfBirth: user.dateOfBirth,
      ipAddress: user.ipAddress,
      lastLoginTime: user.lastLoginTime,
    };
    const token = this.jwtService.sign(payload);
    return {
      accessToken: token,
    };
  }
}
