import { IsNumber, IsString } from "class-validator";

export class productsDto{

    @IsString()
    name: string

    @IsNumber()
    price: number
    
    @IsString()
    image: string

    @IsString()
    description: string
}