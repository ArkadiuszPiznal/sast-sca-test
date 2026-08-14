import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DATABASE_PASSWORD = 'Y4EZ6!4z&VSyi5X9C';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
