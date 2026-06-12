import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RentalsModule } from './rentals/rentals.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { StorageServiceModule } from './storage-service/storage-service.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    RentalsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'public/uploads'),
      serveRoot: '/uploads',
    }),
    StorageServiceModule,
    MessagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
