import { Module, Provider } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { authProviders } from './auth.repositries';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.AUTH_SECRET_KEY,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, ...(authProviders as Provider[])],
  
})
export class AuthModule {}
