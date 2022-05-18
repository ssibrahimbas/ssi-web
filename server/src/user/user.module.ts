import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserRepository } from "./repository/user.repository";
import { User, UserSchema } from "./schemas/user.schema";
import { UsersService } from "./services/user.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  providers: [UserRepository, UsersService],
  exports: [UsersService],
})
export class UserModule {}
