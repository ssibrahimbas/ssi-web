import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { getI18nContextFromRequest, I18nContext } from "nestjs-i18n";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: "email", passReqToCallback: true });
  }

  async validate(request: any, email: string, password: string): Promise<any> {
    const i18n = getI18nContextFromRequest(request);
    const user = await this.authService.validateUser({ email, password }, i18n);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
