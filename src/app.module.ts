import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CourseModule } from './modules/course/course.module';
import { ClassModule } from './modules/class/class.module';
import { AttendanceModule } from './modules/attendance/attendance.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    CourseModule,
    ClassModule,
    AttendanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
