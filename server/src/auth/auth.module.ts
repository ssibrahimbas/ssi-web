import { LocalStrategy } from './strategies/local.strategy';
import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/user/user.module";
import { AuthService } from "./services/auth.service";
import { JwtModule } from '@nestjs/jwt';
import { JwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [UserModule, PassportModule, JwtModule.register({
        secret: JwtConstants.secret,
        signOptions: {expiresIn: JwtConstants.expiresIn}
    })],
    providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}