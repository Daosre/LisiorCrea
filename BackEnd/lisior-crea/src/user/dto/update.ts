import { IsString } from "class-validator";

export class updateUsersDto{

    @IsString()
    firstName: string

    @IsString()
    lastName: string
}