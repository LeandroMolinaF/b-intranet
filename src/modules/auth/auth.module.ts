import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/database/prisma.module';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config/configuration';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: envs.jwt_secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
