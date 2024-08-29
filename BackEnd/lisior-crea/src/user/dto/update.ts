import {IsStrongPassword, MaxLength } from "class-validator";

export class updateUsersDto{

    @IsStrongPassword()
    @MaxLength(255)
    password: string
}