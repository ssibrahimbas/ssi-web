import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { RegisterUserDto } from "../dto/register-user.dto";
import { User, UserDocument } from "../schemas/user.schema";

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUserByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async createUser(
    user: RegisterUserDto,
    ipAddress: string
  ): Promise<UserDocument> {
    return this.userModel.create({ ...user, ipAddress });
  }
}
