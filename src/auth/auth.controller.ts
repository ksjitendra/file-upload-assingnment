import { Controller, Get, Post, Body, Patch, Param, Delete, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto, singupDto } from './dto/auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async create(@Body() userData: singupDto, @Response() res) {
    const resp =  await this.authService.create(userData);
    return res.status(resp.statusCode).json(resp);
  }

  @Post('login')
  async login(@Body() userData: loginDto, @Response() res){
    const resp =  await this.authService.login(userData);
    return res.status(resp.statusCode).json(resp);
  }

 
}
