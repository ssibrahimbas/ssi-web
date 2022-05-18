import { Module } from '@nestjs/common';
import { UsersService } from './services/user.service';

@Module({
  providers: [UsersService],
  exports: [UsersService],
})
export class UserModule {}
