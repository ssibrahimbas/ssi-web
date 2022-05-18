import {
  Body,
  Controller,
  Get,
  Ip,
  Post,
  Request,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
import { I18n, I18nContext, I18nValidationExceptionFilter } from "nestjs-i18n";
import { ISuccessDataResult } from "src/common/types/result/ISuccessDataResult";
import { LoginUserDto } from "src/user/dto/login-user.dto";
import { RegisterUserDto } from "src/user/dto/register-user.dto";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { LocalAuthGuard } from "../guards/local-auth.guard";
import { AuthService } from "../services/auth.service";
import { LoginResultType } from "../types/auth-result.types";

@Controller({
  path: "auth",
  version: "1",
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(
    @Body() loginUserDto: LoginUserDto,
    @I18n() i18n: I18nContext
  ): Promise<ISuccessDataResult<LoginResultType>> {
    const data = await this.authService.login(loginUserDto, i18n);
    return new ISuccessDataResult<LoginResultType>(
      i18n.t("auth.loginSuccess"),
      data
    );
  }

  @Post("register")
  async register(
    @Body() registerUserDto: RegisterUserDto,
    @Ip() ipAddress: string,
    @I18n() i18n: I18nContext
  ): Promise<ISuccessDataResult<LoginResultType>> {
    const data = await this.authService.register(
      registerUserDto,
      ipAddress,
      i18n
    );
    return new ISuccessDataResult<LoginResultType>(
      i18n.t("auth.registerSuccess"),
      data
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get("checkStatus")
  checkStatus(@Request() req) {
    return req.user;
  }
}
