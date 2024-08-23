import { IsBoolean } from "class-validator";

export class disableDto{

    
    @IsBoolean()
    isActive: boolean

}