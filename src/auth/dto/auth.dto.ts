
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class singupDto{

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}

// creating login DTO
export class loginDto{
    
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;  

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string;
}