
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty,  Min } from "class-validator";

export class GetFileListDto {

    @ApiProperty()
    @Type(() => Number)
    // @IsInt()
    @IsNotEmpty()
    @Min(1)
    page: number

    @ApiProperty()
    @Type(() => Number)
    // @IsInt()
    @IsNotEmpty()
    @Min(1)
    limit: number
    
}