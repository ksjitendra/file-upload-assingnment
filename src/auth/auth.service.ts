import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {  IresponseObject } from 'src/common/app.interfaces';
import { singupDto } from './dto/auth.dto';
import { USER_REPOSITORY } from './auth.repositries';
import { Users } from './models/user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @Inject(USER_REPOSITORY)
    private readonly usersRepository: typeof Users,
    private jwtService: JwtService
  ){}
  async create(userData: singupDto): Promise<IresponseObject> {

    try {

      const saltOrRounds = 10;
      const userPassword = userData.password;
      userData.password = await bcrypt.hash(userPassword, saltOrRounds);

      await this.usersRepository.create(userData);

      return { statusCode: HttpStatus.CREATED, message: 'User created successfully', data: null };
    } catch (error) {
      console.log(error);
      return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal server error', error: error.message, data: null };
      
    }
  }


  async login(userData: singupDto): Promise<IresponseObject >{
    try {

      const user = await this.usersRepository.findOne({ where: { email: userData.email } });
      if (!user) {
        return { statusCode: HttpStatus.UNAUTHORIZED, message: 'Invalid credentials', data: null };
      }
      const isPasswordMatch = await bcrypt.compare(userData.password, user.password);


      if (!isPasswordMatch) {
        return { statusCode: HttpStatus.UNAUTHORIZED, message: 'Invalid credentials', data: null };
      }
      

      const tokenPayload =  {
        id: user.id,
      }

      // create JWT Token
      const token = await this.jwtService.signAsync(tokenPayload, {
        secret: process.env.AUTH_SECRET_KEY
      });

      return { statusCode: HttpStatus.OK, message: 'Login successful', data: {token} };
      
    } catch (error) {
      console.log(error); 
      return { statusCode: HttpStatus.INTERNAL_SERVER_ERROR, message: 'Internal server error', error: error.message, data: null };
      
      
    }
    
  }

}
