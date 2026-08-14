import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DemoModule } from './demo/demo.module';

@Module({
  imports: [UsersModule, DemoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
