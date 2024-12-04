// creating provider repository and assinging model values to it 
import { Injectable } from '@nestjs/common';
import { Users } from './models/user.model';

export const USER_REPOSITORY  = 'USER_REPOSITORY'; 

export const authProviders = [
    {
        provide: USER_REPOSITORY,
        useValue: Users,
    },
]