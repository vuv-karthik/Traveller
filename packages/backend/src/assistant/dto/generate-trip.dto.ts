import { IsString, IsNotEmpty, IsInt, Min, IsOptional, IsNumber } from 'class-validator';

export class GenerateTripDto {
    @IsString()
    @IsNotEmpty()
    city: string;

    @IsInt()
    @Min(1)
    days: number;

    @IsOptional()
    @IsNumber()
    budget?: number;

    @IsOptional()
    @IsString()
    userPrompt?: string;
}
