import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [CoreModule, DatabaseModule, ConfigModule.forRoot({
    isGlobal: true
  }), AuthModule, FilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
