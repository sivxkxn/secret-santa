import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

import {ApiProperty} from '@nestjs/swagger'

export interface IUser {
    id: number;
    name: string;
    surname: string;
    wish: string;
    santa: number;
  };
  
export type IUserCreate = {
    name: string;
    surname: string;
    wish: string;
    santa: number;
}

export class CreateUserDto{
    @ApiProperty()
    @IsString({message:'name should be string'})
    @IsNotEmpty({message:'name should not be empty'})
    name:string

    @ApiProperty()
    @IsString({message:'surname should be string'})
    @IsNotEmpty({message:'should not be empty field of surname'})
    surname: string;

    @ApiProperty()
    @IsArray({message:'should be array of wishes'})
    @IsNotEmpty({message:'should not be empty list of wishes'})
    @ArrayMinSize(1, {message:'should be one or more wishes'})
    @ArrayMaxSize(10, {message:'should be ten or less wishes'})
    wish: Array<string>;
}


