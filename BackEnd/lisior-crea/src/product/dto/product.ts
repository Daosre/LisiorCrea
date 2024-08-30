import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class productsDto{

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsNumber()
    price: number
    
    @IsNotEmpty()
    @IsString()
    image: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    categoryId: string
}